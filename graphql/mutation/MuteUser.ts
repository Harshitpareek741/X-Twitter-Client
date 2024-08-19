import { graphql } from "@/gql";

const FollowUser = graphql(`
    #graphql
   mutation FollowUser($from: String, $to: String) {
     followUser(From: $from, To: $to)
   }
 `);
 
 const UnfollowUser = graphql(`
     #graphql
   mutation UnfollowUser($from: String, $to: String) {
     unfollowUser(From: $from, To: $to)
   }
 `);
 
 const updateUser = graphql(`
     #graphql
   mutation updateUser($payload: payload) {
     updateUser(payload: $payload) {
       firstName
     }
   }
 `);
 

 export {FollowUser , UnfollowUser , updateUser}