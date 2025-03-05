import { useCurrentUser } from "@/hooks/User";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { FaRegBookmark, FaXTwitter } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { TiMessage } from "react-icons/ti";
import React, { useState } from "react";

const SideBar: React.FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const user = useCurrentUser();
  const { firstName, lastName, profilePhotoUrl, id } = user.user || {};
  let Name = (firstName || "Guest") + " " + (lastName || "");

  interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
    Link: string;
  }

  const SideBarIcons: TwitterSidebarButton[] = [
    {
      title: "",
      icon: <FaXTwitter />,
      Link: "/",
    },
    {
      title: "Home",
      icon: <IoHomeOutline />,
      Link: "/",
    },
    {
      title: "Message",
      icon: <TiMessage />,
      Link: "/message",
    },
    {
      title: "Explore",
      icon: <IoSearch />,
      Link: "/explore",
    },
    {
      title: "Login",
      icon: <MdOutlineLogin />,
      Link: "/login",
    },
    {
      title: "Premium",
      icon: <FaXTwitter />,
      Link: "/premium",
    },
    {
      title: "Profile",
      icon: <CgProfile />,
      Link: `/${id}`,
    },
    {
      title: "more",
      icon: <CiCircleMore />,
      Link: "/explore", // This link will not be used since we'll override the behavior
    },
  ];

  const ProfileIcon = {
    title: Name,
    icon: (
      <Image
        src={
          profilePhotoUrl ||
          "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"
        }
        height={50}
        width={50}
        alt="User profile"
      />
    ),
  };

  const handleLogout = () => {
    localStorage.removeItem("twitter_tokken");
    setShowMoreOptions(false);
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col justify-start items-end lg:items-start">
      <div className="flex flex-col h-5/6">
        {SideBarIcons.map((list) => {
          if (list.title === "more") {
            return (
              <div key={list.title} className="relative">
                <div
                  onClick={() => setShowMoreOptions((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <li className="flex flex-row mx-3 p-2 my-[2px] lg:hover:bg-gray-900 hover:rounded-full">
                    <span className="text-3xl rounded-full hover:bg-gray-900 hover:rounded-full">
                      {list.icon}
                    </span>{" "}
                    <span className="hidden lg:block px-3 font-semibold text-lg">
                      {list.title}
                    </span>
                  </li>
                </div>
                {showMoreOptions && (
                  <ul className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-md z-10">
                    <li
                      onClick={handleLogout}
                      className="cursor-pointer text-white p-2 hover:bg-gray-700 rounded-md"
                    >
                      Logout
                    </li>
                    {/* You can add more options here */}
                  </ul>
                )}
              </div>
            );
          } else {
            return (
              <Link key={list.title} href={list.Link}>
                <li className="flex flex-row mx-3 p-2 my-[2px] lg:hover:bg-gray-900 hover:rounded-full cursor-pointer">
                  <span className="text-3xl rounded-full hover:bg-gray-900 hover:rounded-full">
                    {list.icon}
                  </span>{" "}
                  <span className="hidden lg:block px-3 font-semibold text-lg">
                    {list.title}
                  </span>
                </li>
              </Link>
            );
          }
        })}
        <div className="flex flex-row mx-3">
          <span className="rounded-full object-cover p-2 overflow-hidden">
            {ProfileIcon.icon}
          </span>
          <span className="hidden lg:block px-3 font-semibold text-base">
            {ProfileIcon.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
