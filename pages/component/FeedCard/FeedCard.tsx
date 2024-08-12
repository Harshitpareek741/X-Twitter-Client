import Image from "next/image";
import React from "react";
import img1 from "./pexels-pixabay-60597.jpg";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";

const FeedCard: React.FC = () => {
  interface PostButton {
    cnt: string;
    icon: React.ReactNode;
  }

  const PostIcon: PostButton[] = [
    {
      cnt: "23",
      icon: <FaRegComment />,
    },
    {
      cnt: "447",
      icon: <FaRetweet />,
    },
    {
      cnt: "1.8k",
      icon: <FaRegHeart />,
    },
    {
      cnt: "19k",
      icon: <IoStatsChartOutline />,
    },
  ];

  return (
    <div className="my-3  hover:bg-zinc-950 mx-2 border-b-[1px] border-white/20 cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <Image src={img1} height={50} width={50} alt="na" />
        </div>
        <div className="col-span-11 mx-2 ">
          Username
          <p>
            If Neeraj chopra win a gold medal tomorrow. I will pay 100089 Rupees
            to lucky winner who likes the tweet and comment most . And for the
            rest top 10 people trying to get the atttention will get flight
            tickets . Lets get support from india and outside the world for my
            brother
          </p>
          <div className="flex flex-row justify-evenly">
            {PostIcon.map((list) => (
              <li key={list.cnt} className="flex flex-row opacity-35 hover:opacity-70 group cursor-pointer transition duration-100 ease-in">
                <span className="text-xl p-2 rounded-full bg-red-500 bg-opacity-0 group-hover:bg-opacity-25 ">
                  {list.icon}
                </span>
                <span className="p-1 -mx-2 text-lg group-hover:text-red-800 ">
                  {list.cnt}
                </span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
