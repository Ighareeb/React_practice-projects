import Bottombar from "@/components/shared/Bottombar.tsx";
import LeftSidebar from "@/components/shared/LeftSidebar.tsx";
import Topbar from "@/components/shared/Topbar.tsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
}
