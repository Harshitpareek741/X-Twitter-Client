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

// Initialize socket using the environment variable
const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URI!);

type Message = {
  name: string;
  text: string;
};

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
};

// Helper to highlight matching query text
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
  return arr.join("-"); // e.g. "Kavya-na"
};

const ChatPage: NextPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedChat, setSelectedChat] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);

  const currentUser = useCurrentUser().data?.GetUserFromContext;

  // Ref for auto-scrolling the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!currentUser || !selectedChat) return;

    socket.emit("enterRoom", { name: currentUser.firstName, room: roomId });

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [currentUser, selectedChat, roomId]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && currentUser) {
      socket.emit("message", { name: currentUser.firstName, text: message });
      setMessage("");
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
            {/* Search Bar */}
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

            {/* Chat List */}
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
                      <p className="text-sm text-gray-400">
                        Last message: Hello!
                      </p>
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
            {/* Header */}
            <header className="p-4 flex items-center bg-gray-900">
              <button className="mr-2" onClick={() => setShowChat(false)}>
                <FiArrowLeft className="text-xl" />
              </button>
              <h2 className="font-semibold">
                {selectedChat ? selectedChat.firstName : ""}
              </h2>
              <FiMoreVertical className="text-xl ml-auto cursor-pointer" />
            </header>

            {/* Messages Area */}
            <div className="flex-1 p-4 min-h-0 overflow-y-auto">
              {messages.length === 0 ? (
                <>
                  <p className="bg-gray-700 p-3 rounded-lg w-max max-w-xs">
                    Hello 👋
                  </p>
                  <p className="bg-green-900 p-3 rounded-lg w-max max-w-xs ml-auto mt-2">
                    Hi! How are you?
                  </p>
                </>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.name === currentUser?.firstName ? "text-right" : "text-left"
                    }`}
                  >
                    <p
                      className={`p-3 rounded-lg inline-block ${
                        msg.name === currentUser?.firstName
                          ? "bg-green-900"
                          : "bg-zinc-900"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))
              )}
              {/* Dummy element for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Chat Input */}
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
