import { graphql } from "@/gql";

const createTweet = graphql(`
  #graphql
  mutation createTweet($payload: TweetPayload!) {
    createTweet(payload: $payload) {
      id
      content
      author {
        id
        firstName
        lastName
      }
      imageUrl
      likes {
        id
      }
      comments {
        id
        description
      }
      views
      retweets {
        id
      }
    }
  }
`);

const createRetweet = graphql(`
  #graphql
  mutation createRetweet($tweetId: String!) {
    createRetweet(tweetId: $tweetId)
  }
`);

const createLikes = graphql(`
  #graphql
  mutation createLikes($tweetId: String!) {
    createLike(tweetId: $tweetId)
  }
`);

const createViews = graphql(`
  #graphql
  mutation createViews($tweetId: String!) {
    createViews(tweetId: $tweetId)
  }
`);

const createComment = graphql(`
  #graphql
mutation createComment($tweetId: String!, $description: String!) {
  createComment(tweetId: $tweetId, description: $description) {
    id
  }
}
`);

export { createTweet, createLikes, createRetweet, createViews, createComment };
