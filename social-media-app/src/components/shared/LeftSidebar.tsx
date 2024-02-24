import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types/index.ts";
import { sidebarLinks } from "@/constants/index.ts";
import { Loader } from "@/components/index.tsx";
import { Button } from "../ui/button.tsx";
import { useSignOutAccount } from "@/lib/react-query/queries.ts";

export default function LeftSidebar() {
  return <div>LeftSidebar</div>;
}
