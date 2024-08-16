import { Inter } from "next/font/google";
import FeedCard from "./component/FeedCard/FeedCard";
import InputArea from "./component/inputArea/InputArea";
import TwitterLayout from "./component/TwitterLayout";
import { UseAllTweets } from "@/hooks/Tweet";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/client/graphqlclient";
import { GetAllTweets } from "@/graphql/query/Tweet";
import React from "react";
import { Tweet } from "@/gql/graphql";

const inter = Inter({ subsets: ["latin"] });

interface Tweetsinterface{
 AllTweets : Tweet[]
}
const Home : React.FC<Tweetsinterface> = ({AllTweets}) => {
  return (
    <TwitterLayout>
      <InputArea />
      {AllTweets?.map((list) =>
        list?.author ? (
          <FeedCard key={list.id} content={list.content || ""} author={list?.author} img = {list.imageUrl} />
        ) : null
      )}
    </TwitterLayout>
  );
}

export const getServerSideProps : GetServerSideProps = async () => {
  const response =  await graphqlClient.request(GetAllTweets);
  const AllTweets = response.getAllTweets;
  return {props : 
    {AllTweets : AllTweets as Tweet[]}
  }
}

export default Home;