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
    "\n    #graphql\n   mutation FollowUser($from: String, $to: String) {\n     followUser(From: $from, To: $to)\n   }\n ": types.FollowUserDocument,
    "\n     #graphql\n   mutation UnfollowUser($from: String, $to: String) {\n     unfollowUser(From: $from, To: $to)\n   }\n ": types.UnfollowUserDocument,
    "\n     #graphql\n   mutation updateUser($payload: payload) {\n     updateUser(payload: $payload) {\n       firstName\n     }\n   }\n ": types.UpdateUserDocument,
    "\n  #graphql\n  mutation createTweet($payload: TweetPayload) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation createRetweet($tweetId: String) {\n  createRetweet(tweetId: $tweetId) {\n    id\n  }\n}": types.CreateRetweetDocument,
    "\n  #graphql\n  mutation createLikes($tweetId: String) {\n  createlike(tweetId: $tweetId)\n}": types.CreateLikesDocument,
    "\n  #graphql\n  mutation createViews($tweetId: String) {\n  createViews(tweetId: $tweetId)\n}": types.CreateViewsDocument,
    "\n    #graphql\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n": types.GoogleAuthDocument,
    "\n    #graphql\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  ": types.GetUserFromContextDocument,
    "\n    #graphql\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n    followers {\n        firstName,\n        profilePhotoUrl\n      },\n      following {\n        firstName,\n        profilePhotoUrl,\n      }\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  ": types.GetUserFromIdDocument,
    "\n  #graphql\n  query getLikes($tweetId: String!) {\n  getLikes(tweetId: $tweetId)\n}\n  ": types.GetLikesDocument,
    "\n  #graphql \n  query getRetweet($tweetId: String!) {\n  getRetweet(tweetId: $tweetId)\n}\n  ": types.GetRetweetDocument,
    "\n  #graphql\n  query getViews($tweetId: String!) {\n  getViews(tweetId: $tweetId)\n}": types.GetViewsDocument,
    "\n   #graphql\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    ": types.GetAllTweetsDocument,
    "\n    #graphql\n  query Query($imagetype: String!, $imageName: String!) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}": types.QueryDocument,
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
export function graphql(source: "\n    #graphql\n   mutation FollowUser($from: String, $to: String) {\n     followUser(From: $from, To: $to)\n   }\n "): (typeof documents)["\n    #graphql\n   mutation FollowUser($from: String, $to: String) {\n     followUser(From: $from, To: $to)\n   }\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n     #graphql\n   mutation UnfollowUser($from: String, $to: String) {\n     unfollowUser(From: $from, To: $to)\n   }\n "): (typeof documents)["\n     #graphql\n   mutation UnfollowUser($from: String, $to: String) {\n     unfollowUser(From: $from, To: $to)\n   }\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n     #graphql\n   mutation updateUser($payload: payload) {\n     updateUser(payload: $payload) {\n       firstName\n     }\n   }\n "): (typeof documents)["\n     #graphql\n   mutation updateUser($payload: payload) {\n     updateUser(payload: $payload) {\n       firstName\n     }\n   }\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createTweet($payload: TweetPayload) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation createTweet($payload: TweetPayload) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createRetweet($tweetId: String) {\n  createRetweet(tweetId: $tweetId) {\n    id\n  }\n}"): (typeof documents)["\n  #graphql\n  mutation createRetweet($tweetId: String) {\n  createRetweet(tweetId: $tweetId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createLikes($tweetId: String) {\n  createlike(tweetId: $tweetId)\n}"): (typeof documents)["\n  #graphql\n  mutation createLikes($tweetId: String) {\n  createlike(tweetId: $tweetId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation createViews($tweetId: String) {\n  createViews(tweetId: $tweetId)\n}"): (typeof documents)["\n  #graphql\n  mutation createViews($tweetId: String) {\n  createViews(tweetId: $tweetId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n"): (typeof documents)["\n    #graphql\n  query GoogleAuth($token: String) {\n    GoogleAuthentication(token: $token),\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  "): (typeof documents)["\n    #graphql\n query GetUserFromContext {\n  GetUserFromContext {\n     id,\n     firstName,\n     lastName,\n     email,\n     profilePhotoUrl,\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n    followers {\n        firstName,\n        profilePhotoUrl\n      },\n      following {\n        firstName,\n        profilePhotoUrl,\n      }\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  "): (typeof documents)["\n    #graphql\n  query GetUserFromId($id: String!) {\n  GetUserFromId(id: $id) {\n    firstName,\n    lastName,\n    profilePhotoUrl,\n    createdAt,\n    id,\n    followers {\n        firstName,\n        profilePhotoUrl\n      },\n      following {\n        firstName,\n        profilePhotoUrl,\n      }\n     tweets {\n       content,\n       imageUrl,\n       author {\n         id,\n         firstName,\n         lastName,\n         profilePhotoUrl\n       }\n     }\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getLikes($tweetId: String!) {\n  getLikes(tweetId: $tweetId)\n}\n  "): (typeof documents)["\n  #graphql\n  query getLikes($tweetId: String!) {\n  getLikes(tweetId: $tweetId)\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql \n  query getRetweet($tweetId: String!) {\n  getRetweet(tweetId: $tweetId)\n}\n  "): (typeof documents)["\n  #graphql \n  query getRetweet($tweetId: String!) {\n  getRetweet(tweetId: $tweetId)\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getViews($tweetId: String!) {\n  getViews(tweetId: $tweetId)\n}"): (typeof documents)["\n  #graphql\n  query getViews($tweetId: String!) {\n  getViews(tweetId: $tweetId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   #graphql\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    "): (typeof documents)["\n   #graphql\nquery GetAllTweets {\n  getAllTweets {\n    content ,\n    id,\n    imageUrl\n    author {\n      id,\n      firstName\n      lastName ,\n      profilePhotoUrl   }\n  }\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n  query Query($imagetype: String!, $imageName: String!) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}"): (typeof documents)["\n    #graphql\n  query Query($imagetype: String!, $imageName: String!) {\n  getPresignurl(imagetype: $imagetype, imageName: $imageName)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;