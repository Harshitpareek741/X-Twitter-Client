import Image from "next/image";
import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import styles from "./style.module.css";
import { User } from "@/gql/graphql";
import Link from "next/link";
import Modal from "./Modal";
import { graphqlClient } from "@/client/graphqlclient";
import { GetComments, GetLikes, GetRetweet, GetViews } from "@/graphql/query/qTweet";
import { createLikes, createRetweet, createViews, createComment } from "@/graphql/mutation/Mutequer";
import { useQueryClient } from "@tanstack/react-query";

// Define your Comment interface
interface Comment {
  id: string;
  description: string;
  tweetId: string;
  createdAt?: string;
}

// Define the props for your FeedCard
interface FeedCardProps {
  content: string;
  author?: User;
  img?: string;
  tweetId: string;
  userId: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ content, author, img, tweetId, userId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [retweets, setRetweets] = useState<number>(0);
  const [isRetweeted, setIsRetweeted] = useState<boolean>(false);
  const [views, setViews] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // -------------------------
  // Helper: Update tweet cache with stats (including comments count)
  // -------------------------
  const updateTweetsCache = () => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("tweets-cache");
      let tweets = cached ? JSON.parse(cached) : [];
      const tweetData = { tweetId, content, author, img, userId, likes, retweets, views, commentsCount: comments.length };
      const existingTweet = tweets.find((t: any) => t.tweetId === tweetId);
      if (!existingTweet) {
        tweets.push(tweetData);
      } else {
        Object.assign(existingTweet, tweetData);
      }
      // Keep only the most recent 4 tweets
      if (tweets.length > 4) {
        tweets = tweets.slice(tweets.length - 4);
      }
      localStorage.setItem("tweets-cache", JSON.stringify(tweets));
    }
  };

  // -------------------------
  // Helper: Cache liked tweets (with stats)
  // -------------------------
  const updateLikedTweetsCache = () => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("liked-tweets");
      let likedTweets = cached ? JSON.parse(cached) : [];
      if (!likedTweets.find((t: any) => t.tweetId === tweetId)) {
        likedTweets.push({ tweetId, content, author, img, userId, likes, retweets, views, commentsCount: comments.length });
        localStorage.setItem("liked-tweets", JSON.stringify(likedTweets));
      }
    }
  };

  // -------------------------
  // On mount, fetch stats from localStorage (if available)
  // -------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("tweets-cache");
      if (cached) {
        const tweets = JSON.parse(cached);
        const cachedTweet = tweets.find((t: any) => t.tweetId === tweetId);
        if (cachedTweet) {
          setLikes(cachedTweet.likes);
          setRetweets(cachedTweet.retweets);
          setViews(cachedTweet.views);
          // comments are fetched separately below
        }
      }
    }
  }, [tweetId]);

  // -------------------------
  // Whenever likes, retweets, views or comments change, update the cache
  // -------------------------
  useEffect(() => {
    updateTweetsCache();
  }, [likes, retweets, views, comments]);

  // -------------------------
  // Fetch data from the API and update localStorage
  // -------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load comments from localStorage first (if available)
        if (typeof window !== "undefined") {
          const storedComments = localStorage.getItem(`comments-${tweetId}`);
          if (storedComments) {
            setComments(JSON.parse(storedComments));
          }
        }

        const likesData = await graphqlClient.request(GetLikes, { tweetId });
        const retweetsData = await graphqlClient.request(GetRetweet, { tweetId });
        const viewsData = await graphqlClient.request(GetViews, { tweetId });
        const commentsData = await graphqlClient.request(GetComments, { tweetId });

        setLikes(likesData.getLikes ? likesData.getLikes.length : 0);
        if (likesData.getLikes && likesData.getLikes.some((like: any) => like.user.id === userId)) {
          setIsLiked(true);
        }
        setRetweets(retweetsData.getRetweet ? retweetsData.getRetweet.length : 0);
        setViews(viewsData.getViews || 0);
        setComments(commentsData.getComments || []);

        if (typeof window !== "undefined") {
          localStorage.setItem(`comments-${tweetId}`, JSON.stringify(commentsData.getComments || []));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // Cache the current tweet immediately
    updateTweetsCache();
  }, [tweetId, userId]);

  // -------------------------
  // Toggle comment section visibility
  // -------------------------
  const handleCommentClick = (): void => {
    setShowComments((prev) => !prev);
  };

  // -------------------------
  // Handle retweet action (optimistic update)
  // -------------------------
  const handleRetweetClick = async () => {
    if (!isRetweeted) {
      setRetweets(retweets + 1);
      setIsRetweeted(true);
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      try {
        await graphqlClient.request(createRetweet, { tweetId });
      } catch (error) {
        setRetweets(retweets);
        setIsRetweeted(false);
        console.error("Error creating retweet:", error);
      }
    } else {
      setRetweets(retweets - 1);
      setIsRetweeted(false);
    }
  };

  // -------------------------
  // Handle like action (optimistic update)
  // -------------------------
  const handleLikeClick = async () => {
    if (isLiked) return;
    setLikes(likes + 1);
    setIsLiked(true);
    try {
      await graphqlClient.request(createLikes, { tweetId });
      updateLikedTweetsCache();
    } catch (error) {
      setLikes(likes);
      setIsLiked(false);
      console.error("Error creating like:", error);
    }
  };

  // -------------------------
  // Handle view action (optimistic update)
  // -------------------------
  const handleViewClick = async () => {
    setViews((prevViews) => (prevViews || 0) + 1);
    try {
      await graphqlClient.request(createViews, { tweetId });
    } catch (error) {
      console.error("Error creating view:", error);
    }
  };

  // -------------------------
  // Modal open/close functions
  // -------------------------
  const openModal = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  // -------------------------
  // Handle comment textarea change
  // -------------------------
  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  // -------------------------
  // Handle comment submission – update UI only after the API call succeeds
  // -------------------------
  const handleNewCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    try {
      const response = await graphqlClient.request(createComment, {
        tweetId,
        description: newComment,
      });
      const createdComment = response.createComments;
      const updatedComments = [...comments, createdComment];
      setComments(updatedComments);
      setNewComment("");
      if (typeof window !== "undefined") {
        localStorage.setItem(`comments-${tweetId}`, JSON.stringify(updatedComments));
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // -------------------------
  // Memoize the rendered comments list
  // -------------------------
  const renderedComments = useMemo(() => {
    return comments.map((comment) => (
      <li key={comment.id} className="p-3 border border-gray-600 rounded-lg bg-gray-800">
        <div className="font-medium mb-1">
          {/* Optional: add comment author info */}
        </div>
        <p className="mb-2">{comment.description}</p>
        <span className="text-xs text-gray-400">{comment.createdAt}</span>
      </li>
    ));
  }, [comments]);

  // -------------------------
  // Memoize container classes: if there are more than 3 comments, apply scrollable styles.
  // -------------------------
  const commentContainerClass = useMemo(() => {
    return comments.length > 3 ? "max-h-40 overflow-y-auto space-y-4" : "space-y-4";
  }, [comments]);

  return (
    <div className="my-3 flex hover:bg-zinc-950 mx-2 border-b-[1px] border-white/20 cursor-pointer h-auto overflow-hidden">
      <div className="grid grid-cols-12">
        <Link href={author?.id ? `/${author.id}` : "#"}>
          <div className="col-span-1 object-cover">
            <Image
              src={author?.profilePhotoUrl || "/default-profile.png"}
              height={38}
              width={38}
              alt="Profile Photo"
              className="rounded-full"
            />
          </div>
        </Link>
        <div className="col-span-11 mx-2">
          <Link href={author?.id ? `/${author.id}` : "#"}>
            <div className="hover:underline">
              {author?.firstName || "Anonymous"} {author?.lastName || ""}
            </div>
          </Link>
          <p className="h-auto">{content || "No content available"}</p>
          {img ? (
            <div onClick={() => openModal(img)}>
              <Image src={img} height={130} width={160} alt="Thumbnail" />
              <Modal isOpen={modalIsOpen} onClose={closeModal} imageUrl={selectedImage || ""} />
            </div>
          ) : (
            <div>No image available</div>
          )}

          <div className="flex flex-row">
            <div className={`flex flex-row w-5/6 justify-between my-2 items-start ${styles.hovergroup}`}>
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
                  {comments.length}
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
                onClick={!isLiked ? handleLikeClick : undefined}
                style={isLiked ? { pointerEvents: "none" } : {}}
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

          {/* Conditionally Render Comment Section */}
          {showComments && (
            <div className="mt-4 border-t border-gray-700 pt-4 w-full">
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              <form onSubmit={handleNewCommentSubmit} className="mb-6 flex flex-col">
                <textarea
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={handleNewCommentChange}
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-3 self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Comment
                </button>
              </form>
              {comments.length > 0 ? (
                <ul className={commentContainerClass}>{renderedComments}</ul>
              ) : (
                <p className="text-gray-400">No comments yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
