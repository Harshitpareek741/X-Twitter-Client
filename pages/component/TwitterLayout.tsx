import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleAuth } from "google-auth-library";
import { ReactNode, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "./SideBar/SideBar";
import { graphqlClient } from "@/client/graphqlclient";
import { GoogleAuths } from "@/graphql/query/User";
import { useCurrentUser } from "@/hooks/User";
import { useQueryClient } from "@tanstack/react-query";

interface Twitterinterface {
  children: ReactNode;
}
const TwitterLayout: React.FC<Twitterinterface> = ({ children }) => {
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
    <div className="grid grid-cols-12 md:grid-cols-12 h-screen w-screen transition-all">
      <div className="col-span-2 mdsm:col-span-2 md:col-span-2 lg:col-span-3 border-white/20 border-l-2 lg:mx-32">
        <SideBar />
      </div>
      <div className="col-span-10 mdsm:col-span-10
      md:col-span-7 mdsm:mr-10 md:mx-0 lg: mx-0 lg:col-span-5 border-opacity-10 border-l-[1px] border-r-[1px] border-white overflow-y-auto">
        <main> {children}</main>
        <div className=" md:col-span-3 lg:col-span-5">
          <h1>helo</h1>
          {!user?.user ? <GoogleLogin onSuccess={GoogleAuth} /> : null}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TwitterLayout;
