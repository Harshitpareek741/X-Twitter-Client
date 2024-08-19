import { graphql } from '../../gql';

const GoogleAuths = graphql(`
    #graphql
  query GoogleAuth($token: String) {
    GoogleAuthentication(token: $token),
  }
`);
const GetUserFromContext = graphql(`
    #graphql
 query GetUserFromContext {
  GetUserFromContext {
     id,
     firstName,
     lastName,
     email,
     profilePhotoUrl,
  }
}
  `);

const GetUserFromId = graphql(`
    #graphql
  query GetUserFromId($id: String!) {
  GetUserFromId(id: $id) {
    firstName,
    lastName,
    profilePhotoUrl,
    createdAt,
    id,
    followers {
        firstName,
        profilePhotoUrl
      },
      following {
        firstName,
        profilePhotoUrl,
      }
     tweets {
       content,
       imageUrl,
       author {
         id,
         firstName,
         lastName,
         profilePhotoUrl
       }
     }
  }
}
  `);


export  {GoogleAuths,GetUserFromContext,GetUserFromId};
