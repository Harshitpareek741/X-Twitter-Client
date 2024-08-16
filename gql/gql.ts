/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateTweet($payload: TweetPayload!) {\n  createTweet(payload: $payload) {\n    id\n  }\n}\n": types.CreateTweetDocument,
    "\n  mutation updateUser($payload: payload) {\n  updateUser(payload: $payload) {\n    firstName\n  }\n}\n  ": types.UpdateUserDocument,
    "\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    ": types.GetAllTweetsDocument,
    "\n  query Query($imagetype: String, $imageName: String) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}": types.QueryDocument,
    "\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n": types.GoogleAuthDocument,
    "\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  ": types.GetUserFromContextDocument,
    "\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  ": types.GetUserFromIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTweet($payload: TweetPayload!) {\n  createTweet(payload: $payload) {\n    id\n  }\n}\n"): (typeof documents)["\n    mutation CreateTweet($payload: TweetPayload!) {\n  createTweet(payload: $payload) {\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($payload: payload) {\n  updateUser(payload: $payload) {\n    firstName\n  }\n}\n  "): (typeof documents)["\n  mutation updateUser($payload: payload) {\n  updateUser(payload: $payload) {\n    firstName\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    "): (typeof documents)["\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query($imagetype: String, $imageName: String) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}"): (typeof documents)["\n  query Query($imagetype: String, $imageName: String) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n"): (typeof documents)["\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  "): (typeof documents)["\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  "): (typeof documents)["\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;