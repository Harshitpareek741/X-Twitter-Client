import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/hook";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";

export default function InputArea() {
  const { user } = useCurrentUser();
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
      icon: <FaMapMarkerAlt />,
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

  return (
    <div className="grid grid-cols-9 h-auto">
      <div className="col-span-1 object-cover mx-2">
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
          className="text-white w-full text-xl focus:outline-none font-normal bg-transparent"
          name="postarea"
          id="auto-resize-textarea"
        ></textarea>
        <div className="flex flex-row ">
          <div className="flex flex-row  w-2/6 gap-3 justify-evenly my-4">
          {
            SideBarIcons.map((map)=>(
                <div className="text-xl hover:bg-opacity-40 hover:bg-blue-900 hover:rounded-full cursor-pointer p-2">{map.icon}</div>
            ))
          }
          </div>
          <div className="flex flex-row-reverse w-4/6 ">
          <button className="mx-2 bg-blue-600 hover:bg-blue-700 rounded-full px-5 my-3 ">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
