import { graphql } from "@/gql";

const CreateTweet = graphql(`
    mutation CreateTweet($payload: TweetPayload!) {
  createTweet(payload: $payload) {
    id
  }
}
`);

const updateUser = graphql(`
  mutation updateUser($payload: payload) {
  updateUser(payload: $payload) {
    firstName
  }
}
  `)

export {CreateTweet,updateUser}