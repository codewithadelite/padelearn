"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AudioWaveform, BookOpen, PieChart, BookText } from "lucide-react";

import { NavMain } from "@/components/shared/navigation/nav-main";
import { NavProjects } from "@/components/shared/navigation/nav-projects";
import { NavUser } from "@/components/shared/navigation/nav-user";
import { TeamSwitcher } from "@/components/shared/navigation/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ROLES } from "@/constants/authentication";
import withAuth from "@/hoc/with-auth";
import { IUser } from "@/models/authentication";
import Cookies from "js-cookie";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  const data = {
    user: {
      name: user?.last_name + " " + user?.first_name,
      email: user?.email ? user.email : "",
      avatar:
        "https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D",
    },
    teams: [
      {
        name: "Padelearn",
        logo: AudioWaveform,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Programs",
        url: "/programs",
        icon: BookText,
        isActive: true,
      },
      {
        title: "Quizes",
        url: "/quiz",
        icon: BookOpen,
        isActive: true,
      },
    ],
    projects: [
      {
        name: "Analytics",
        url: "/analytics",
        icon: PieChart,
      },
    ],
  };

  useEffect(() => {
    const userCookie = Cookies.get("userInfo");

    if (userCookie) {
      try {
        const parsedUser: IUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error: any) {}
    } else {
      router.push("/"); // Redirect if no cookie
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {withAuth(NavProjects, ROLES.STUDENT)({ projects: data.projects })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
