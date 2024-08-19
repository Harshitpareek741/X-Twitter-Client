import { graphql } from "@/gql";


const createTweet = graphql(`
  #graphql
  mutation createTweet($payload: TweetPayload) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

const createRetweet = graphql(`
  #graphql
  mutation createRetweet($tweetId: String) {
  createRetweet(tweetId: $tweetId) {
    id
  }
}`);
const createLikes = graphql(`
  #graphql
  mutation createLikes($tweetId: String) {
  createlike(tweetId: $tweetId)
}`);
const createViews = graphql(`
  #graphql
  mutation createViews($tweetId: String) {
  createViews(tweetId: $tweetId)
}`)

;
export { createTweet ,createLikes,createRetweet,createViews };
