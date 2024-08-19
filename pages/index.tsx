import { Inter } from "next/font/google";
import FeedCard from "./component/FeedCard/FeedCard";
import InputArea from "./component/inputArea/InputArea";
import TwitterLayout from "./component/TwitterLayout";
import { UseAllTweets } from "@/hooks/Tweet";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/client/graphqlclient";
import { GetAllTweets } from "@/graphql/query/qTweet";
import React from "react";
import { Tweet, User } from "@/gql/graphql";

const inter = Inter({ subsets: ["latin"] });

interface Tweetsinterface{
 AllTweets : Tweet[]
}
const Home : React.FC<Tweetsinterface> = () => {
  const allTweets = UseAllTweets().data;
  return (
    <TwitterLayout>
      <InputArea />
      {allTweets?.map((list) =>
        list?.author ? (
          <FeedCard key={list.id} content={list.content || ""} author={list?.author as User} img = {list.imageUrl || ""} tweetId={list.id} />
        ) : "null"
      )}
    </TwitterLayout>
  );
}

export default Home;