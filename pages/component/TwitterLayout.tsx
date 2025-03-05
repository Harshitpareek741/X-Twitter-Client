import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "./SideBar/SideBar";
import RightColumn from "./explore/explore";
import { graphqlClient } from "@/client/graphqlclient";
import { GoogleAuths } from "@/graphql/query/User";
import { useCurrentUser } from "@/hooks/User";
import { useQueryClient } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa6";

interface TwitterInterface {
  children: ReactNode;
}

const TwitterLayout: React.FC<TwitterInterface> = ({ children }) => {
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
        const { GoogleAuthentication } = await graphqlClient.request(GoogleAuths, {
          token: googleToken,
        });
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

  // SignInForm component for the right column when not signed in
  const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignIn = (e: React.FormEvent) => {
      e.preventDefault();
      toast.info("Email sign in is not implemented yet");
    };

    return (
      <div className="flex flex-col justify-center items-center   h-full w-1/2  p-4 bg-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign In / Sign Up</h2>
        <form onSubmit={handleEmailSignIn} className="w-full mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center w-full mb-2">
          <span className="text-gray-400">or</span>
        </div>
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={GoogleAuth}
            onError={() => toast.error("Google sign in error")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 h-screen w-screen transition-all">
      {/* Left Column (Sidebar) */}
      <div className="col-span-2 md:col-span-2 lg:col-span-3 border-white/20 border-l-2 lg:mx-32">
        <SideBar />
      </div>

      {/* Middle Column (Main Content) */}
      <div className="col-span-10 md:col-span-7 lg:col-span-5 border-opacity-10 border-l-[1px] border-r-[1px] border-white overflow-y-auto">
        <main>{children}</main>
        <ToastContainer />
      </div>

      {/* Right Column */}
      <div className="hidden md:block md:col-span-3 lg:col-span-4">
        {user?.user ? <RightColumn /> : <SignInForm />}
      </div>
    </div>
  );
};

export default TwitterLayout;
