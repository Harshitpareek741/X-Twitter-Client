import React from "react";
import Home from "..";
import LoginComponent from "../component/login/login";
import TwitterLayout from "../component/TwitterLayout";


const Login : React.FC = () => {
  return (
    <TwitterLayout>
        <div className="h-full w-full flex items-center justify-center">
           <LoginComponent/>
        </div>
    </TwitterLayout>
  );
}

export default Login;