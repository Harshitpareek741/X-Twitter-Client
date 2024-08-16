import { graphql } from "@/gql";

const GetAllTweets = graphql(`
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
  query Query($imagetype: String, $imageName: String) {
  getPresignurl(imagetype: $imagetype, imageName: $imageName)
}`)


export {GetAllTweets,GetPresignedUrl};