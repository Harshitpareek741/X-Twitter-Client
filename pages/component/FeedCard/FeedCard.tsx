import Image from "next/image";
import React from "react";
import img1 from "./pexels-pixabay-60597.jpg";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import styles from "./style.module.css";
import { User } from "@/gql/graphql";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal"; // Adjust the path as necessary

interface FeedCardProps {
  content: string;
  author: User;
  img: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ content, author, img }) => {
  interface PostButton {
    cnt: string;
    icon: React.ReactNode;
    color: string;
  }

  const PostIcon: PostButton[] = [
    {
      cnt: "23",
      icon: <FaRegComment />,
      color: "#009bff",
    },
    {
      cnt: "447",
      icon: <FaRetweet />,
      color: "#00a48b",
    },
    {
      cnt: "1.8k",
      icon: <FaRegHeart />,
      color: "#b8123b",
    },
    {
      cnt: "19k",
      icon: <IoStatsChartOutline />,
      color: "#009bff",
    },
  ];
  interface CustomCSSProperties extends React.CSSProperties {
    "--dynamiccolor"?: string;
    "--iconcolor"?: string;
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const imgs = img;

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="my-3 flex hover:bg-zinc-950 mx-2 border-b-[1px] border-white/20 cursor-pointer h-auto overflow-hidden">
      <div className="grid grid-cols-12">
        <Link href={author.id}>
          <div className="col-span-1 object-cover">
            <Image
              src={author.profilePhotoUrl || ""}
              height={38}
              width={38}
              alt="na"
              className="rounded-full"
            />
          </div>
        </Link>
        <div className="col-span-11 mx-2 ">
          <Link href={author.id}>
            <div className="hover:underline">
              {author.firstName + " " + author.lastName}
            </div>
          </Link>
          <p className="h-auto">{content}</p>
          <div>
            {img && (
              <div onClick={() => openModal(imgs)}>
                <Image src={imgs} height={130} width={160} alt="Thumbnail" />
                <Modal
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  imageUrl={selectedImage || ""}
                />
              </div>
            )}
          </div>

          <div className="flex flex-row">
            <div
              className={`flex flex-row w-5/6 justify-between my-2 items-start ${styles.hovergroup}`}
            >
              {PostIcon.map((list) => (
                <li
                  key={list.cnt}
                  className="flex flex-row group cursor-pointer transition duration-100 ease-in"
                >
                  <span
                    className={`text-lg p-1 rounded-full ${styles.iconcolor}`}
                    style={{ "--iconcolor": list.color } as CustomCSSProperties}
                  >
                    {list.icon}
                  </span>
                  <span
                    className={`text-sm my-1 ${styles.dynamiccolor}`}
                    style={
                      { "--dynamiccolor": list.color } as CustomCSSProperties
                    }
                  >
                    {list.cnt}
                  </span>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
