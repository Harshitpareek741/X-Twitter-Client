import { ReactNode, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import SideBar from "./SideBar/SideBar";
import RightColumn from "./explore/explore";
import { useCurrentUser } from "@/hooks/User";
import { useQueryClient } from "@tanstack/react-query";
import LoginComponent from "./login/login";
 // Import the new login component

interface TwitterInterface {
  children: ReactNode;
}

const TwitterLayout: React.FC<TwitterInterface> = ({ children }) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

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
        {user?.user ? <RightColumn /> : <LoginComponent />}
      </div>
    </div>
  );
};

export default TwitterLayout;
