import { graphql } from '../../gql';

const GoogleAuths = graphql(`
  query GoogleAuth($token: String) {
    GoogleAuthentication(token: $token),
  }
`);
const GetUserFromContext = graphql(`
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
  query GetUserFromId($id: String!) {
  GetUserFromId(id: $id) {
    firstName,
    lastName,
    profilePhotoUrl,
    createdAt,
    id,
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
