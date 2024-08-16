import React from "react";
import TwitterLayout from "./component/TwitterLayout";
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { graphqlClient } from "@/client/graphqlclient";
import { GetUserFromId } from "@/graphql/query/User";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { User } from "@/gql/graphql";
import FeedCard from "./component/FeedCard/FeedCard";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/User";
import Header from "./component/Header/Header";



interface Folowsinterface {
  cnt: string;
  title: string;
}
interface ProfilePageinterface{
  userInfo? : User;
}
const ProfilePage : NextPage<ProfilePageinterface> = (props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" } as const; // Ensures proper type inference
    return `Joined ${date.toLocaleDateString("en-US", options)}`;
  };

  const name = props.userInfo?.firstName +" " + (props.userInfo?.lastName || "");
  const Tags: Folowsinterface[] = [
    {
      cnt: "695",
      title: "Following",
    },
    {
      cnt: "695",
      title: "Following",
    },
    {
      cnt: "695",
      title: "Following",
    },
  ];
  const user = useCurrentUser();
  const IsUser = (user.data?.GetUserFromContext?.id==props.userInfo?.id);
  return (
    <TwitterLayout>
<div className="border-b-2 border-white/30 overflow-hidden">     
        <Header title={name} subtitle={`${props.userInfo?.tweets.length} posts`} button={"Follow"} href={undefined} />
      <div className="grid grid-cols-12 h-30 ">
        <div className="col-span-4 my-4  ">
          <Image className="rounded-full"
            src={ 
              props.userInfo?.profilePhotoUrl || ""
            }
            height={100}
            width={100}
            alt="na"
          />
        </div>
        <div className="col-span-8  flex flex-row justify-end gap-3  mt-16 mb-9">
          <div className="rounded-full p-2  border">hhh</div>
          <div className="rounded-full p-2 border">hhh</div>
          <button hidden={IsUser} className="-mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold ">
            Follow
          </button>
          <Link href={`/edit/${props.userInfo?.id}`} hidden={!IsUser}  className="-mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold ">
            Edit Profile
          </Link>
        </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl ">{name}</div>
          <div className="opacity-40  text-base">@{name.replace(/\s+/g, '').toLowerCase()}</div>
          <li  className="text-blue-700 flex">View more</li>
          <div className="text-base flex flex-row opacity-40"><div className="my-1 mx-2"><FaRegCalendarAlt /></div><div>{formatDate(props.userInfo?.createdAt || "")}</div></div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row space-x-4">
            {Tags.map((tg) => (
              <div className="justify-start items-start ">
                <span key={tg.cnt} className="text-sm mx-1 font-bold">
                  {tg.cnt}
                </span>
                <span className="text-sm opacity-40">{tg.title}</span>
              </div>
            ))}
          </div>
        </div> 
        <div className="opacity-40 text-xs mx-1 my-1 ">Not followed by anyone you folowing</div>
        {/* post future */}
        </div>
        <div className="flex flex-col">
          {props.userInfo?.tweets.map((tweet)=>(
            <FeedCard content={tweet.content} author={tweet.author} img={tweet.imageUrl}/>
          ))}
        </div>

    
    </TwitterLayout>
  );
};


export const getServerSideProps: GetServerSideProps<ProfilePageinterface> = async (context) => {
  const id = context.query.id as string | undefined;

  console.log(id);

  // If ID is not provided, return a 404 page
  if (!id) {
    return { notFound: true };
  }

  // Fetch data from the GraphQL API
  const data = await graphqlClient.request(GetUserFromId, { id });

  console.log(data);

  // If user is not found, return a 404 page
  if (!data) {
    return { notFound: true };
  }

  // Return the user data as props
  return {
    props: {
      userInfo: data.GetUserFromId as User,
    },
  };
};


export default ProfilePage;