import { useCurrentUser } from "@/hooks/hook";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { FaRegBookmark, FaXTwitter } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { TiMessage } from "react-icons/ti";


export default function SideBar() {
   
const user =  useCurrentUser() ;
const {firstName, lastName,profilePhotoUrl}  = user.user || {};
 const Name  = firstName + " " + lastName;
interface TwiiterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
const SideBarIcons: TwiiterSidebarButton[] = [
  {title: "",
    icon : <FaXTwitter />
  },
  {
    title: "Home",
    icon: <IoHomeOutline />,
  },
  {
    title: "Explore",
    icon: <IoSearch />,
  },
  {
    title: "Notification",
    icon: <IoMdNotificationsOutline />,
  },
  {
    title: "Message",
    icon: <TiMessage />,
  },
  {
    title: "Grok",
    icon: <IoHomeOutline />,
  },
  {
    title: "Bookmark",
    icon: <FaRegBookmark />,
  },
  {
    title: "Communities",
    icon: <IoHomeOutline />,
  },
  {
    title: "Premium",
    icon: <FaXTwitter />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
  {
    title: "more",
    icon: <CiCircleMore />,
  },
  {
    title: "future",
    icon: <IoHomeOutline />,
  },  
];
const ProfileIcon = {
  title: (Name)  || "NA",
  icon: <Image src={profilePhotoUrl || "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"} height={50} width={50} alt="na" />
}
  return (
      <div className="flex flex-col justify-start items-end lg:items-start">
        <div className="flex flex-col h-5/6 ">
          {SideBarIcons.map((list) => (
            <li className="flex flex-row mx-3 p-2 my-[2px]  lg:hover:bg-gray-900 hover:rounded-full cursor-pointer">
              <span className="text-3xl rounded-full   hover:bg-gray-900 hover:rounded-full   ">{list.icon}</span>{" "}
              <span className=" hidden lg:block px-3 font-semibold text-lg">
                {list.title}
              </span>
            </li>
          ))}
          <li className="flex flex-auto mx-3 p-1
          my-2  hover:bg-gray-900 hover:rounded-full cursor-pointer">
              <span className="rounded-full object-cover overflow-hidden  ">{ProfileIcon.icon}</span>
              <span className="hidden lg:block px-3 font-semibold text-lg">
                {ProfileIcon.title}
              </span>
            </li>
        
        </div>
      </div>
    
  );
}
