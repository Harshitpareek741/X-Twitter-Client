import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/hooks/User";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";
import { UseAllTweets, useCreateTweet } from "@/hooks/Tweet";
import { toast } from "react-toastify";
import { graphqlClient } from "@/client/graphqlclient";
import { GetAllTweets, GetPresignedUrl } from "@/graphql/query/qTweet";
import axios from "axios";

export default function InputArea() {
  const { user } = useCurrentUser();
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

  interface PostButton {
    icon: React.ReactNode;
  }
  const SideBarIcons: PostButton[] = [
    { icon: <CiImageOn /> },
    {
      icon: <MdOutlineGifBox />,
    },
    {
      icon: <MdOutlineEmojiEmotions />,
    },
    {
      icon: <FaMapMarkerAlt />
    },
  ];
  useEffect(() => {
    const textarea = document.getElementById(
      "auto-resize-textarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };
      textarea.addEventListener("input", resizeTextarea);

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, []);

  const [content, setContent] = useState("");

  const { mutate, isPending, isSuccess } = useCreateTweet();
  
  

  function handleCreateTweet() {
    const payload = { content, imageUrl };
    if (payload) {
      mutate(payload);
      setContent("");
      setImageUrl("");
    }
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
     
      const url = await graphqlClient.request(GetPresignedUrl, {
        imageName: file.name,
        imagetype: file.type,
      });
      const presignedurl = url.getPresignurl;
      if (!presignedurl) {
        return toast("stop");
      }
      console.log(presignedurl);
      await axios.put(presignedurl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      const link = new URL(presignedurl);
      setImageUrl(`${link.origin}${link.pathname}`);
    }
  };

  return (
    <div className="grid grid-cols-9 h-auto border-b-2 border-white/20">
     
      <div className="col-span-1 object-cover mx-2 my-2">
        <Image
          src={user?.profilePhotoUrl || "/na"}
          width={38}
          height={38}
          alt="profile"
          className="rounded-full"
        />
      </div>
      <div className="col-span-8 ">
        <textarea
          className="text-white my-2 w-full text-xl focus:outline-none font-normal bg-transparent"
          placeholder="What is happening?!"
          name="postarea"
          id="auto-resize-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {imageUrl.length > 0 && (
          <Image src={imageUrl} height={120} width={190} alt="na"></Image>
        )}

        <div className="flex flex-row border-t-[1px] border-white/20">
          <div className="flex flex-row  w-2/6 gap-3 justify-evenly my-2 ">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleButtonClick}
                  className="text-xl hover:bg-opacity-40 hover:bg-blue-900 hover:rounded-full cursor-pointer p-2"
                >
                  <CiImageOn />
                </button>
              </div>
          
            
          </div>
          <div className="flex flex-row-reverse w-4/6 ">
            <button
              className="mx-2 bg-blue-600 hover:bg-blue-700 rounded-full px-5 my-2 "
              onClick={handleCreateTweet}
              disabled={isPending}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
