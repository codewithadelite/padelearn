"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  PieChart,
  BookText,
  GraduationCap,
  UserRound,
} from "lucide-react";

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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
      url: "/quizes",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
