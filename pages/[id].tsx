import React, { useEffect, useState } from "react";
import TwitterLayout from "./component/TwitterLayout";
import { FaRegCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { graphqlClient } from "@/client/graphqlclient";
import { GetUserFromId } from "@/graphql/query/User";
import { GetServerSideProps, NextPage } from "next";
import { User } from "@/gql/graphql";
import FeedCard from "./component/FeedCard/FeedCard";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/User";
import Header from "./component/Header/Header";
import { FollowUser, UnfollowUser } from "@/graphql/mutation/MuteUser";

interface FollowsInterface {
  cnt: number;
  title: string;
}

interface ProfilePageInterface {
  userInfo?: User;
}

const ProfilePage: React.FC<ProfilePageInterface> = (props) => {
  const [followersCount, setFollowersCount] = useState(props.userInfo?.followers?.length || 0);
  const [followingCount, setFollowingCount] = useState(props.userInfo?.following?.length || 0);
  const [followed, setFollowed] = useState(false);

  const user = useCurrentUser();
  const isCurrentUser = user.data?.GetUserFromContext?.id === props.userInfo?.id;
  const from = user.data?.GetUserFromContext?.id;
  const to = props.userInfo?.id;

  // Check if the current user is already following the profile user
  useEffect(() => {
    if (props.userInfo?.followers.some(follower => follower?.id === from)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [props.userInfo, from]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" } as const;
    return `Joined ${date.toLocaleDateString("en-US", options)}`;
  };

  const name = `${props.userInfo?.firstName} ${props.userInfo?.lastName || ""}`;
  const Tags: FollowsInterface[] = [
    {
      cnt: followingCount,
      title: "Following",
    },
    {
      cnt: followersCount,
      title: "Followers",
    },
  ];

  const handleFollowUser = async () => {
    await graphqlClient.request(FollowUser, { from, to });
    setFollowersCount((prev) => prev + 1); 
    setFollowed(true);
  };

  const handleUnfollowUser = async () => {
    await graphqlClient.request(UnfollowUser, { from, to });
    setFollowersCount((prev) => Math.max(0, prev - 1)); 
    setFollowed(false);
  };

  return (
    <TwitterLayout>
      <div className="border-b-2 border-white/30 overflow-hidden">
        <Header title={name} subtitle={`${props.userInfo?.tweets.length} posts`} button={"Follow"} href={"/"} />
        <div className="grid grid-cols-12 h-30">
          <div className="col-span-4 my-4">
            <Image
              className="rounded-full"
              src={props.userInfo?.profilePhotoUrl || ""}
              height={100}
              width={100}
              alt="Profile Photo"
            />
          </div>
          <div className="col-span-8 flex flex-row justify-end gap-3 mt-16 mb-9 mx-4">
            {!followed && (
              <button hidden={isCurrentUser} onClick={handleFollowUser} className="-mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold">
                Follow
              </button>
            )}
            {followed && (
              <button hidden={isCurrentUser} onClick={handleUnfollowUser} className="-mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold">
                Unfollow
              </button>
            )}
            <Link href={`/edit/${props.userInfo?.id}`} hidden={!isCurrentUser} className="-mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold">
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl">{name}</div>
          <div className="opacity-40 text-base">@{name.replace(/\s+/g, '').toLowerCase()}</div>
          <li className="text-blue-700 flex">View more</li>
          <div className="text-base flex flex-row opacity-40">
            <div className="my-1 mx-2">
              <FaRegCalendarAlt />
            </div>
            <div>{formatDate(props.userInfo?.createdAt || "")}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row space-x-4">
            {Tags.map((tg, index) => (
              <div key={index} className="justify-start items-start">
                <span className="text-sm mx-1 font-bold">{tg.cnt}</span>
                <span className="text-sm opacity-40">{tg.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="opacity-40 text-xs mx-1 my-1">Not followed by anyone you are following</div>
      </div>
      <div className="flex flex-col">
        {props.userInfo?.tweets.map((tweet, index) => (
          <FeedCard key={index} content={tweet.content} author={tweet.author as User} img={tweet.imageUrl || ""} tweetId={tweet.id} />
        ))}
      </div>
    </TwitterLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageInterface> = async (context) => {
  const id = context.query.id as string | undefined;
  try {
    if (!id) {
      return { notFound: true };
    }

    const data = await graphqlClient.request(GetUserFromId, { id });

    if (data && data.GetUserFromId) {
      return {
        props: {
          userInfo: data.GetUserFromId as User,
        },
      };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { notFound: true };
  }
};

export default ProfilePage;
