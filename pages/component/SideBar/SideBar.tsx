import { useCurrentUser } from "@/hooks/User";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { FaRegBookmark, FaXTwitter } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { TiMessage } from "react-icons/ti";
import React from "react"

const  SideBar : React.FC = () => {
   
const user =  useCurrentUser() ;
const {firstName, lastName,profilePhotoUrl,id}  = user.user || {};
let Name  = firstName || "Guest" + " " + ((lastName) || "");

interface TwiiterSidebarButton {
  title: string;
  icon: React.ReactNode;
  Link : string;
}
const SideBarIcons: TwiiterSidebarButton[] = [
  {title: "",
    icon : <FaXTwitter />,
    Link : "/"
  },
  {
    title: "Home",
    icon: <IoHomeOutline />,
    Link : "/"
  },
  {
    title: "Explore",
    icon: <IoSearch />,
    Link : "/explore"
  },
  {
    title: "Notification",
    icon: <IoMdNotificationsOutline />,
        Link : "/explore"
  },
  {
    title: "Message",
    icon: <TiMessage />,
        Link : "/explore"
  },
  {
    title: "Grok",
    icon: <IoHomeOutline />,
        Link : "/explore"
  },
  {
    title: "Bookmark",
    icon: <FaRegBookmark />,
        Link : "/explore"
  },
  {
    title: "Communities",
    icon: <IoHomeOutline />,
        Link : "/explore"
  },
  {
    title: "Premium",
    icon: <FaXTwitter />,
    Link : "/explore"
  },
  {
    title: "Profile",
    icon: <CgProfile />,
     Link : `/${id}`
  },
  {
    title: "more",
    icon: <CiCircleMore />,
    Link : "/explore"
  },
  {
    title: "future",
    icon: <IoHomeOutline />,
        Link : "/explore"
  },  
];
const ProfileIcon = {
  title: (Name)  || "Guest",
  icon: <Image src={profilePhotoUrl || "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"} height={50} width={50} alt="na" />
}
  return (
      <div className="flex flex-col justify-start items-end lg:items-start">
        <div className="flex flex-col h-5/6 ">
          {SideBarIcons.map((list) => (
            <Link key={list.title} href={list.Link}>
            <li key={list.title} className="flex flex-row mx-3 p-2 my-[2px]  lg:hover:bg-gray-900 hover:rounded-full cursor-pointer">
              <span className="text-3xl rounded-full   hover:bg-gray-900 hover:rounded-full   ">{list.icon}</span>{" "}
              <span className=" hidden lg:block px-3 font-semibold text-lg">
                {list.title}
              </span>
            </li>
              </Link>
          ))}
          <li className="flex flex-auto mx-3 p-1
          my-2  hover:bg-gray-900 hover:rounded-full cursor-pointer">
              <span className="rounded-full object-cover overflow-hidden  ">{ProfileIcon.icon}</span>
              <span className="hidden lg:block px-3 font-semibold text-base">
                {ProfileIcon.title}
              </span>
            </li>
        
        </div>
      </div>
    
  );
}

export default SideBar;