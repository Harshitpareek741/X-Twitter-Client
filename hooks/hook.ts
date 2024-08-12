import { graphqlClient } from "@/client/graphqlclient"
import { graphql } from "@/gql"
import { useQueries, useQuery } from "@tanstack/react-query"
import {GetUserFromContext} from '../graphql/query/User'


export const useCurrentUser =  () => {
    const query =  useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            return await graphqlClient.request(GetUserFromContext);
        }
    });
    return {...query , user : query.data?.GetUserFromContext}
}


