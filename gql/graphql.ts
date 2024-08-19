/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Tweet;
  createRetweet: Tweet;
  createTweet: Tweet;
  createViews: Scalars['Boolean']['output'];
  createlike: Scalars['Boolean']['output'];
  followUser: Scalars['Boolean']['output'];
  unfollowUser: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  payload: TweetPayload;
};


export type MutationCreateRetweetArgs = {
  tweetId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTweetArgs = {
  payload?: InputMaybe<TweetPayload>;
};


export type MutationCreateViewsArgs = {
  tweetId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatelikeArgs = {
  tweetId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFollowUserArgs = {
  From?: InputMaybe<Scalars['String']['input']>;
  To?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUnfollowUserArgs = {
  From?: InputMaybe<Scalars['String']['input']>;
  To?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<Payload>;
};

export type Query = {
  __typename?: 'Query';
  GetUserFromContext?: Maybe<User>;
  GetUserFromId?: Maybe<User>;
  GoogleAuthentication?: Maybe<Scalars['String']['output']>;
  getAllTweets: Array<Maybe<Tweet>>;
  getCommnets: Array<Maybe<Tweet>>;
  getLikes?: Maybe<Scalars['Int']['output']>;
  getPresignurl?: Maybe<Scalars['String']['output']>;
  getRetweet?: Maybe<Scalars['Int']['output']>;
  getViews?: Maybe<Scalars['Int']['output']>;
};


export type QueryGetUserFromIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGoogleAuthenticationArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCommnetsArgs = {
  TweetId: Scalars['String']['input'];
};


export type QueryGetLikesArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetPresignurlArgs = {
  imageName: Scalars['String']['input'];
  imagetype: Scalars['String']['input'];
};


export type QueryGetRetweetArgs = {
  tweetId: Scalars['String']['input'];
};


export type QueryGetViewsArgs = {
  tweetId: Scalars['String']['input'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author: User;
  authorId: Scalars['String']['output'];
  comments?: Maybe<Tweet>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  likes: Scalars['Int']['output'];
  retweet: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};

export type TweetPayload = {
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  followers: Array<Maybe<User>>;
  following: Array<Maybe<User>>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profilePhotoUrl?: Maybe<Scalars['String']['output']>;
  tweets: Array<Tweet>;
  updatedAt: Scalars['String']['output'];
};

export type Payload = {
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  website: Scalars['String']['input'];
};

export type FollowUserMutationVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type UpdateUserMutationVariables = Exact<{
  payload?: InputMaybe<Payload>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', firstName: string } };

export type CreateTweetMutationVariables = Exact<{
  payload?: InputMaybe<TweetPayload>;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet: { __typename?: 'Tweet', id: string } };

export type CreateRetweetMutationVariables = Exact<{
  tweetId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateRetweetMutation = { __typename?: 'Mutation', createRetweet: { __typename?: 'Tweet', id: string } };

export type CreateLikesMutationVariables = Exact<{
  tweetId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateLikesMutation = { __typename?: 'Mutation', createlike: boolean };

export type CreateViewsMutationVariables = Exact<{
  tweetId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateViewsMutation = { __typename?: 'Mutation', createViews: boolean };

export type GoogleAuthQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type GoogleAuthQuery = { __typename?: 'Query', GoogleAuthentication?: string | null };

export type GetUserFromContextQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromContextQuery = { __typename?: 'Query', GetUserFromContext?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, profilePhotoUrl?: string | null } | null };

export type GetUserFromIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserFromIdQuery = { __typename?: 'Query', GetUserFromId?: { __typename?: 'User', firstName: string, lastName?: string | null, profilePhotoUrl?: string | null, createdAt: string, id: string, followers: Array<{ __typename?: 'User', firstName: string, profilePhotoUrl?: string | null } | null>, following: Array<{ __typename?: 'User', firstName: string, profilePhotoUrl?: string | null } | null>, tweets: Array<{ __typename?: 'Tweet', content: string, imageUrl?: string | null, author: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profilePhotoUrl?: string | null } }> } | null };

export type GetLikesQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetLikesQuery = { __typename?: 'Query', getLikes?: number | null };

export type GetRetweetQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetRetweetQuery = { __typename?: 'Query', getRetweet?: number | null };

export type GetViewsQueryVariables = Exact<{
  tweetId: Scalars['String']['input'];
}>;


export type GetViewsQuery = { __typename?: 'Query', getViews?: number | null };

export type GetAllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQuery = { __typename?: 'Query', getAllTweets: Array<{ __typename?: 'Tweet', content: string, id: string, imageUrl?: string | null, author: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profilePhotoUrl?: string | null } } | null> };

export type QueryQueryVariables = Exact<{
  imagetype: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', getPresignurl?: string | null };


export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"From"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"To"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"From"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"To"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TweetPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTweetMutation, CreateTweetMutationVariables>;
export const CreateRetweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRetweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRetweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRetweetMutation, CreateRetweetMutationVariables>;
export const CreateLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createlike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<CreateLikesMutation, CreateLikesMutationVariables>;
export const CreateViewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createViews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createViews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<CreateViewsMutation, CreateViewsMutationVariables>;
export const GoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GoogleAuthentication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<GoogleAuthQuery, GoogleAuthQueryVariables>;
export const GetUserFromContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUserFromContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserFromContextQuery, GetUserFromContextQueryVariables>;
export const GetUserFromIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUserFromId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserFromIdQuery, GetUserFromIdQueryVariables>;
export const GetLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<GetLikesQuery, GetLikesQueryVariables>;
export const GetRetweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRetweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRetweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<GetRetweetQuery, GetRetweetQueryVariables>;
export const GetViewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getViews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getViews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<GetViewsQuery, GetViewsQueryVariables>;
export const GetAllTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsQuery, GetAllTweetsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imagetype"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPresignurl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imagetype"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imagetype"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;