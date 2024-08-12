import { graphql } from '../../gql';

// GoogleAuths query is now fully typed!
const GoogleAuths = graphql(/* GraphQL */ `
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

export  {GoogleAuths,GetUserFromContext};
