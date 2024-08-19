import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import styles from "./style.module.css";
import { User } from "@/gql/graphql";
import Link from "next/link";
import Modal from "./Modal";
import { graphqlClient } from "@/client/graphqlclient";
import { GetLikes, GetRetweet, GetViews } from "@/graphql/query/qTweet";
import { createLikes, createRetweet, createViews } from "@/graphql/mutation/Mutequer";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface FeedCardProps {
  content: string;
  author: User;
  img: string;
  tweetId: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ content, author, img, tweetId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [retweets, setRetweets] = useState<number>(0);
  const [isRetweeted, setIsRetweeted] = useState<boolean>(false);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const likesData = await graphqlClient.request(GetLikes, { tweetId });
        const retweetsData = await graphqlClient.request(GetRetweet, { tweetId });
        const viewsData = await graphqlClient.request(GetViews, { tweetId });

        setLikes(likesData.getLikes || 0);
        setRetweets(retweetsData.getRetweet || 0);
        setViews(viewsData.getViews || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tweetId]);

  const handleCommentClick = (): void => {
    console.log("Comment icon clicked");
  };

  const queryClient = useQueryClient();

  const handleRetweetClick = async () => {
    try {
      if (!isRetweeted) {
        await graphqlClient.request(createRetweet, { tweetId });
        setRetweets(retweets + 1);
        setIsRetweeted(true);
        queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      } else {
        // await graphqlClient.request(createDisRetweet, { tweetId });
        setRetweets(retweets - 1);
        setIsRetweeted(false);
      }
    } catch (error) {
      console.error("Error creating retweet:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await graphqlClient.request(createLikes, { tweetId });
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        // await graphqlClient.request(createdisLike, { tweetId });
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error creating like:", error);
    }
  };

  const handleViewClick = async () => {
    try {
      await graphqlClient.request(createViews, { tweetId });
      setViews((prevViews) => (prevViews || 0) + 1);
    } catch (error) {
      console.error("Error creating view:", error);
    }
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="my-3 flex hover:bg-zinc-950 mx-2 border-b-[1px] border-white/20 cursor-pointer h-auto overflow-hidden">
      <div className="grid grid-cols-12">
        <Link href={author?.id ? `/profile/${author.id}` : "#"}>
          <div className="col-span-1 object-cover">
            <Image
              src={author.profilePhotoUrl || "/default-profile.png"}
              height={38}
              width={38}
              alt="Profile Photo"
              className="rounded-full"
            />
          </div>
        </Link>
        <div className="col-span-11 mx-2">
          <Link href={author?.id ? `/profile/${author.id}` : "#"}>
            <div className="hover:underline">
              {author.firstName || "Anonymous"} {author.lastName || ""}
            </div>
          </Link>
          <p className="h-auto">{content}</p>
          <div>
            {img && (
              <div onClick={() => openModal(img)}>
                <Image src={img} height={130} width={160} alt="Thumbnail" />
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
              {/* Comment Icon */}
              <li
                className="flex flex-row group cursor-pointer transition duration-100 ease-in"
                onClick={handleCommentClick}
              >
                <span
                  className={`text-lg p-1 rounded-full ${styles.iconcolor}`}
                  style={{ "--iconcolor": "#009bff" } as React.CSSProperties}
                >
                  <FaRegComment />
                </span>
                <span
                  className={`text-sm my-1 ${styles.dynamiccolor}`}
                  style={{ "--dynamiccolor": "#009bff" } as React.CSSProperties}
                >
                  {/* Comment Count (if any) */}
                </span>
              </li>

              {/* Retweet Icon */}
              <li
                className="flex flex-row group cursor-pointer transition duration-100 ease-in"
                onClick={handleRetweetClick}
              >
                <span
                  className={`text-lg p-1 rounded-full ${styles.iconcolor} ${isRetweeted && styles.colo}`}
                  style={{ "--iconcolor": "#00a48b" } as React.CSSProperties}
                >
                  <FaRetweet />
                </span>
                <span
                  className={`text-sm my-1 ${styles.dynamiccolor}`}
                  style={{ "--dynamiccolor": "#00a48b" } as React.CSSProperties}
                >
                  {retweets}
                </span>
              </li>

              {/* Like Icon */}
              <li
                className="flex flex-row group cursor-pointer transition duration-100 ease-in"
                onClick={handleLikeClick}
              >
                <span
                  className={`text-lg p-1 rounded-full ${isLiked && styles.colo} ${styles.iconcolor}`}
                  style={{ "--iconcolor": "#b8123b" } as React.CSSProperties}
                >
                  <FaRegHeart />
                </span>
                <span
                  className={`text-sm my-1 ${styles.dynamiccolor}`}
                  style={{ "--dynamiccolor": "#b8123b" } as React.CSSProperties}
                >
                  {likes}
                </span>
              </li>

              {/* Views Icon */}
              <li
                className="flex flex-row group cursor-pointer transition duration-100 ease-in"
                onClick={handleViewClick}
              >
                <span
                  className={`text-lg p-1 rounded-full ${styles.iconcolor}`}
                  style={{ "--iconcolor": "#009bff" } as React.CSSProperties}
                >
                  <IoStatsChartOutline />
                </span>
                <span
                  className={`text-sm my-1 ${styles.dynamiccolor}`}
                  style={{ "--dynamiccolor": "#009bff" } as React.CSSProperties}
                >
                  {views}
                </span>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
