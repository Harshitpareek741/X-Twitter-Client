import { graphqlClient } from "@/client/graphqlclient"
import { TweetPayload } from "@/gql/graphql";
import { createTweet } from "@/graphql/mutation/Mutequer";
import { GetAllTweets } from "@/graphql/query/qTweet";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

const dismiss = () => toast.dismiss('1');

export const UseAllTweets = () => {
    const query = useQuery({
        queryKey: ["all-tweets"],
        queryFn: async() => {
            const response =  await graphqlClient.request(GetAllTweets);
            return response.getAllTweets
        }
    });
    return {...query}
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : async (payload : TweetPayload) => {
            return await graphqlClient.request(createTweet,{payload : payload});
        },
        onSuccess : () => {
          queryClient.invalidateQueries({queryKey : ["all-tweets"]});
        }
    });

   
     
    return mutation;
}