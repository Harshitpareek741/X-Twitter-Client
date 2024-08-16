import { graphqlClient } from "@/client/graphqlclient"
import { graphql } from "@/gql"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import {GetUserFromContext} from '../graphql/query/User'
import { updateUser } from "@/graphql/mutation/Tweet"
import { Payload } from "@/gql/graphql"


export const useCurrentUser =  () => {
    const query =  useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            return await graphqlClient.request(GetUserFromContext);
        }
    });
    return {...query , user : query.data?.GetUserFromContext}
}

export const useUpdateUser = () => {
    const mutation = useMutation({
        mutationFn : async (payload : Payload) => {
            return  await graphqlClient.request(updateUser,{payload : payload});
        }
    });
    return mutation;
}

