import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMoreVertical, FiArrowLeft } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import type { NextPage } from "next";
import { io, Socket } from "socket.io-client";
import TwitterLayout from "../component/TwitterLayout";
import { useCurrentUser } from "@/hooks/User";
import { graphqlClient } from "@/client/graphqlclient";
import { GetAllUsers } from "@/graphql/query/User";

// Use an environment variable for the API base URL (assuming it's the same as the socket URL)
const API_URL = process.env.NEXT_PUBLIC_SOCKET_URI!;

// Initialize socket using the environment variable
const socket: Socket = io(API_URL);

type Message = {
  _id?: string;
  clientId?: string; // Unique id for optimistic update
  senderId?: string;
  receiverId?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  // For WebSocket messages, using a simpler structure:
  name?: string;
  text?: string;
};

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 text-black">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const generateRoomId = (a: string, b: string) => {
  let arr = [a, b];
  arr.sort();
  return arr.join("-"); // e.g. "user123-user456"
};

const ChatPage: NextPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedChat, setSelectedChat] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  // Separate arrays for historical and live messages.
  const [mongoMessages, setMongoMessages] = useState<Message[]>([]);
  const [wsMessages, setWsMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);

  const currentUser = useCurrentUser().data?.GetUserFromContext;

  // Ref for auto-scrolling the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await graphqlClient.request(GetAllUsers);
        const fetchedUsers: UserType[] =
          response.GetAllUsers || response.data?.GetAllUsers;
        setUsers(fetchedUsers);
        if (fetchedUsers.length > 0) {
          setSelectedChat(fetchedUsers[0]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`.trim();
      const fullNameB = `${b.firstName} ${b.lastName}`.trim();
      return fullNameB.length - fullNameA.length;
    });

  const roomId =
    currentUser && selectedChat
      ? generateRoomId(selectedChat.id, currentUser.id || "na")
      : "";

  // Function to fetch conversation messages from MongoDB (REST API)
  const fetchMessages = async () => {
    if (!currentUser || !selectedChat) return;
    try {
      // Fetch messages where currentUser sent to selectedChat
      const resSender = await fetch(
        `${API_URL}/api/message/custom?senderId=${currentUser.id}&receiverId=${selectedChat.id}`
      );
      const senderData = await resSender.json();
      const senderMessages: Message[] = Array.isArray(senderData) ? senderData : [];
  
      // Fetch messages where selectedChat sent to currentUser
      const resReceiver = await fetch(
        `${API_URL}/api/message/custom?senderId=${selectedChat.id}&receiverId=${currentUser.id}`
      );
      const receiverData = await resReceiver.json();
      const receiverMessages: Message[] = Array.isArray(receiverData) ? receiverData : [];
  
      // Combine both arrays and sort messages by creation time
      const conversationMessages = [...senderMessages, ...receiverMessages];
      conversationMessages.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
      );
      setMongoMessages(conversationMessages);
    } catch (error) {
      setMongoMessages([]);
      console.error("Error fetching messages:", error);
    }
  };
  

  // Initial fetch from MongoDB when chat window opens (only once per conversation)
  useEffect(() => {
    if (showChat && currentUser && selectedChat) {
      fetchMessages();
    }
  }, [showChat, currentUser, selectedChat]);

  // WebSocket effect: join room and listen for new messages
  useEffect(() => {
    if (!currentUser || !selectedChat) return;

    socket.emit("enterRoom", { name: currentUser.firstName, room: roomId });

    socket.on("message", (msg: Message) => {
      // Determine message text from either property
      const msgText = msg.text || msg.content || "";
      // Directly add incoming messages to the wsMessages state
      setWsMessages((prev) => {
        if (msg.clientId && prev.some((m) => m.clientId === msg.clientId)) {
          return prev;
        }
        return [...prev, msg];
      });
    });

    return () => {
      socket.off("message");
    };
  }, [currentUser, selectedChat, roomId]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mongoMessages, wsMessages]);

  // Optimistic update: update UI immediately, then call the API
  const sendMessage = async () => {
    if (message.trim() && currentUser && selectedChat) {
      const tempId = "temp-" + Date.now();
      const newMessage: Message = {
        _id: tempId,
        clientId: tempId,
        senderId: currentUser.id,
        receiverId: selectedChat.id,
        content: message,
        createdAt: new Date().toISOString(),
      };

      // Immediately update state with the new message
      setWsMessages((prev) => [...prev, newMessage]);

      // Emit the message via WebSocket (include clientId so others know it's ours)
      socket.emit("message", { name: currentUser.firstName, text: message, clientId: tempId });

      // Capture the message before clearing the input
      const messageToSend = message;
      setMessage("");

      // Now post the message using the REST API
      try {
        const response = await fetch(
          `${API_URL}/api/message/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              senderId: currentUser.id,
              receiverId: selectedChat.id,
              content: messageToSend,
            }),
          }
        );
        const data = await response.json();
        // Replace the optimistic message with the confirmed one.
        setWsMessages((prev) =>
          prev.map((msg) => (msg._id === tempId ? data : msg))
        );
      } catch (error) {
        console.error("Error posting message:", error);
      }
    }
  };

  return (
    <TwitterLayout>
      <div className="h-screen bg-gray-900 bg-opacity-55 text-white overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar / Chat List */}
          <aside
            className={`w-full bg-black p-4 flex flex-col ${
              showChat ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center bg-opacity-55 bg-gray-900 p-2 rounded-md mb-4">
              <FiSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search or start a new chat"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-white px-2 w-full"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((chat) => {
                const fullName = `${chat.firstName} ${chat.lastName}`.trim();
                return (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer flex items-center hover:bg-gray-900 ${
                      selectedChat && selectedChat.id === chat.id
                        ? "bg-opacity-55 bg-gray-900"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedChat(chat);
                      setShowChat(true);
                    }}
                  >
                    <img
                      src={chat.profilePhotoUrl}
                      alt={fullName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {highlightText(fullName, searchTerm)}
                      </h3>
                      <p className="text-sm text-gray-400">Last message: Hello!</p>
                    </div>
                    <div className="text-xs text-gray-500">5 mins ago</div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Chat Window */}
          <main
            className={`w-full flex flex-col h-full min-h-0 bg-black ${
              !showChat ? "hidden" : "block"
            }`}
          >
            <header className="p-4 flex flex-col bg-gray-900">
              <div className="flex items-center">
                <button className="mr-2" onClick={() => setShowChat(false)}>
                  <FiArrowLeft className="text-xl" />
                </button>
                <h2 className="font-semibold">
                  {selectedChat ? selectedChat.firstName : ""}
                </h2>
                <FiMoreVertical className="text-xl ml-auto cursor-pointer" />
              </div>
            </header>

            <div className="flex-1 p-4 min-h-0 overflow-y-auto">
              {mongoMessages.length > 0 &&
                mongoMessages.map((msg, index) => (
                  <div
                    key={`mongo-${index}`}
                    className={`mb-2 ${
                      msg.senderId === currentUser?.id ? "text-right" : "text-left"
                    }`}
                  >
                    <p
                      className={`p-3 rounded-lg inline-block ${
                        msg.senderId === currentUser?.id
                          ? "bg-green-900"
                          : "bg-zinc-900"
                      }`}
                    >
                      {msg.text || msg.content}
                    </p>
                  </div>
                ))}
              {wsMessages.length > 0 &&
                wsMessages.map((msg, index) => (
                  <div
                    key={`ws-${index}`}
                    className={`mb-2 ${
                      msg.senderId === currentUser?.id ? "text-right" : "text-left"
                    }`}
                  >
                    <p
                      className={`p-3 rounded-lg inline-block ${
                        msg.senderId === currentUser?.id
                          ? "bg-green-900"
                          : "bg-zinc-900"
                      }`}
                    >
                      {msg.text || msg.content}
                    </p>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 flex bg-opacity-55 items-center border border-1 border-white border-opacity-20">
              <BsEmojiSmile className="text-xl cursor-pointer bg-opacity-55 text-gray-400" />
              <input
                type="text"
                className="flex-1 p-2 mx-2 rounded-md bg-opacity-55 border border-1 border-white border-opacity-35 bg-gray-900 outline-none text-white"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                className="bg-blue-600 p-2 rounded-lg"
                onClick={sendMessage}
              >
                <IoSend className="text-white text-xl" />
              </button>
            </footer>
          </main>
        </div>
      </div>
    </TwitterLayout>
  );
};

export default ChatPage;
