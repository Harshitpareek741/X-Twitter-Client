import { GraphQLClient, request } from "graphql-request";
const isclient = typeof window !== 'undefined';


export const graphqlClient = new GraphQLClient('http://localhost:8000/graphql',{
    headers: () => ({
        Authorization: isclient ? `Bearer ${window.localStorage.getItem("twitter_tokken")}` : "", // Replace with your actual Bearer token
    })
});