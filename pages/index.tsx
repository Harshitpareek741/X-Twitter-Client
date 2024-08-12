import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import FeedCard from "./component/FeedCard/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import { GoogleAuths } from "@/graphql/query/User";
import { useCallback } from "react";
import { graphqlClient } from "@/client/graphqlclient";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/hook";
import SideBar from "./component/SideBar/SideBar";
import InputArea from "./component/inputArea/InputArea";

export default function Home() {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const GoogleAuth = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        toast.error("Failed to retrieve Google token.");
        return;
      }

      try {
        const { GoogleAuthentication } = await graphqlClient.request(
          GoogleAuths,
          { token: googleToken }
        );

        if (!GoogleAuthentication) {
          toast.error("Google authentication failed.");
          return;
        }

        toast.success("Successfully authenticated.");
        window.localStorage.setItem("twitter_tokken", GoogleAuthentication);

        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      } catch (error) {
        console.error("Authentication Error:", error);
        toast.error("Authentication failed due to a server error.");
      }
    },
    [queryClient]
  );

  return (
    <div className="grid grid-cols-8 md:grid-cols-12 h-screen w-screen transition-all">
      <div className="col-span-1 md:col-span-2 lg:col-span-3 border-white/20 border-l-2 lg:mx-20">
        <SideBar />
      </div>
      <div className="col-span-7 md:col-span-8 lg:col-span-6 border-opacity-10 border-l-[1px] border-r-[1px] border-white overflow-y-auto">
        <InputArea/>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <h1>helo</h1>
        {!user?.user ? <GoogleLogin onSuccess={GoogleAuth} /> : null}
      </div>
      <ToastContainer />
    </div>
  );
}
