import { graphql } from "@/gql";

const GetLikes = graphql(`
  #graphql
  query getLikes($tweetId: String!) {
    getLikes(tweetId: $tweetId){
      id,
      user{
      id
      }
    }
  }
`);

const GetRetweet = graphql(`
  #graphql
  query getRetweet($tweetId: String!) {
    getRetweet(tweetId: $tweetId){
    id
    }
  }
`);

const GetViews = graphql(`
  #graphql
  query getViews($tweetId: String!) {
    getViews(tweetId: $tweetId)
  }
`);

const GetAllTweets = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageUrl
      author {
        id
        firstName
        lastName
        profilePhotoUrl
      }
    }
  }
`);

const GetPresignedUrl = graphql(`
  #graphql
  query getPresignurl($imagetype: String!, $imageName: String!) {
    getPresignurl(imagetype: $imagetype, imageName: $imageName)
  }
`);

const GetComments = graphql(`
  #graphql
  query getComments($tweetId: String!) {
    getComments(tweetId: $tweetId) {
      id
      tweetId
      userId
      description
      createdAt
    }
  }
`);

export { GetAllTweets, GetPresignedUrl, GetLikes, GetRetweet, GetViews, GetComments};
