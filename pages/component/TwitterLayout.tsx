import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleAuth } from "google-auth-library";
import { ReactNode, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "./SideBar/SideBar";
import { graphqlClient } from "@/client/graphqlclient";
import { GoogleAuths } from "@/graphql/query/User";
import { useCurrentUser } from "@/hooks/User";
import { useQueryClient } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa6";

interface Twitterinterface {
  children: ReactNode;
}
const TwitterLayout: React.FC<Twitterinterface> = ({ children }) => {
  const user = useCurrentUser();
  const [showLogin, setShowLogin] = useState(false);

  const handleIconClick = () => {
    setShowLogin(!showLogin); // Show GoogleLogin component when the icon is clicked
  };

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
         <main>
      {user?.user === undefined || user?.user === null ? (
        <div className="flex flex-col text-2xl justify-center items-center p-4">
          <div onClick={handleIconClick}  className="flex flex-row hover:cursor-pointer text-2xl justify-around items-center">
            <div className="hover:bg-blue-500/65 p-3 hover:rounded-full hover:cursor-pointer">
              <FaGoogle style={{ cursor: 'pointer' }} />
            </div>
            <p className="hover:bg-blue-600/25 hover:rounded-full p-1">Click Here to Sign In with Google</p>
          </div>
          {showLogin && <GoogleLogin onSuccess={GoogleAuth} />}
        </div>
      ) : (
       <h1></h1>
      )}
      {children}
    </main>
        <div className="hidden md:col-span-3 lg:col-span-5">
          {!user?.user ? <GoogleLogin onSuccess={GoogleAuth} /> : null}
          {/* explore page future */}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TwitterLayout;
