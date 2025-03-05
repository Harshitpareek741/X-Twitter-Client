import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { graphqlClient } from "@/client/graphqlclient";
import { GoogleAuths } from "@/graphql/query/User";
import { useQueryClient } from "@tanstack/react-query";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Email sign in is not implemented yet");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-1/2 p-4 bg-black rounded-lg shadow-lg">
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
        <GoogleLogin onSuccess={GoogleAuth} onError={() => toast.error("Google sign in error")} />
      </div>
    </div>
  );
};

export default LoginComponent;
