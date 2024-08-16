import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {GoogleOAuthProvider} from "@react-oauth/google"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

      return (
      <QueryClientProvider client={queryClient}>
       <GoogleOAuthProvider clientId="782971334858-uiq0ugjq99aku7lg8v1m1cnjt53vn0ph.apps.googleusercontent.com">
        <Component {...pageProps} />
        <ToastContainer /> 
        <ReactQueryDevtools initialIsOpen={false} />
      </GoogleOAuthProvider>
      </QueryClientProvider>
    );
}

