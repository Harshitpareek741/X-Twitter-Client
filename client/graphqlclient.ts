import { GraphQLClient, request } from "graphql-request";
const isclient = typeof window !== 'undefined';


export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string,{
    headers: () => ({
        Authorization: isclient ? `Bearer ${window.localStorage.getItem("twitter_tokken")}` : "", 
    })
});