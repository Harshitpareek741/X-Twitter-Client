import { graphql } from "@/gql";

const GetLikes = graphql(`
  #graphql
  query getLikes($tweetId: String!) {
  getLikes(tweetId: $tweetId)
}
  `)
  
const GetRetweet = graphql(`
  #graphql 
  query getRetweet($tweetId: String!) {
  getRetweet(tweetId: $tweetId)
}
  `)
const GetViews = graphql(`
  #graphql
  query getViews($tweetId: String!) {
  getViews(tweetId: $tweetId)
}`)

const GetAllTweets = graphql(`
   #graphql
query GetAllTweets {
  getAllTweets {
    content ,
    id,
    imageUrl
    author {
      id,
      firstName
      lastName ,
      profilePhotoUrl   }
  }
}
    `);

const GetPresignedUrl = graphql(`
    #graphql
  query Query($imagetype: String!, $imageName: String!) {
  getPresignurl(imagetype: $imagetype, imageName: $imageName)
}`)




export {GetAllTweets,GetPresignedUrl,GetLikes,GetRetweet,GetViews};