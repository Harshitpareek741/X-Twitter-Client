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
  createTweet: Tweet;
  updateUser: User;
};


export type MutationCreateTweetArgs = {
  payload: TweetPayload;
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<Payload>;
};

export type Query = {
  __typename?: 'Query';
  GetUserFromContext?: Maybe<User>;
  GetUserFromId?: Maybe<User>;
  GoogleAuthentication?: Maybe<Scalars['String']['output']>;
  getAllTweets?: Maybe<Array<Maybe<Tweet>>>;
  getPresignurl?: Maybe<Scalars['String']['output']>;
};


export type QueryGetUserFromIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGoogleAuthenticationArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPresignurlArgs = {
  imageName?: InputMaybe<Scalars['String']['input']>;
  imagetype?: InputMaybe<Scalars['String']['input']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  author: User;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
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

export type CreateTweetMutationVariables = Exact<{
  payload: TweetPayload;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet: { __typename?: 'Tweet', id: string } };

export type UpdateUserMutationVariables = Exact<{
  payload?: InputMaybe<Payload>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', firstName: string } };

export type GetAllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQuery = { __typename?: 'Query', getAllTweets?: Array<{ __typename?: 'Tweet', content: string, id: string, imageUrl: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, profilePhotoUrl?: string | null } } | null> | null };

export type QueryQueryVariables = Exact<{
  imagetype?: InputMaybe<Scalars['String']['input']>;
  imageName?: InputMaybe<Scalars['String']['input']>;
}>;


export type QueryQuery = { __typename?: 'Query', getPresignurl?: string | null };

export type GoogleAuthQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type GoogleAuthQuery = { __typename?: 'Query', GoogleAuthentication?: string | null };

export type GetUserFromContextQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromContextQuery = { __typename?: 'Query', GetUserFromContext?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, profilePhotoUrl?: string | null } | null };

export type GetUserFromIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserFromIdQuery = { __typename?: 'Query', GetUserFromId?: { __typename?: 'User', firstName: string, lastName: string, profilePhotoUrl?: string | null, createdAt: string, id: string, tweets: Array<{ __typename?: 'Tweet', content: string, imageUrl: string, author: { __typename?: 'User', id: string, firstName: string, lastName: string, profilePhotoUrl?: string | null } }> } | null };


export const CreateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TweetPayload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTweetMutation, CreateTweetMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAllTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsQuery, GetAllTweetsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imagetype"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPresignurl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imagetype"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imagetype"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GoogleAuthentication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<GoogleAuthQuery, GoogleAuthQueryVariables>;
export const GetUserFromContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUserFromContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserFromContextQuery, GetUserFromContextQueryVariables>;
export const GetUserFromIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFromId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUserFromId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserFromIdQuery, GetUserFromIdQueryVariables>;