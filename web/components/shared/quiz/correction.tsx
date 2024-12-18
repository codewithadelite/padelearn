"use client";

import * as React from "react";
import { Minus, Plus, Eye, X } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function QuizCorrection() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" size={"sm"}>
          <Eye className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[75vh] lg:h-[90vh] w-full p-4 bg-white shadow-md rounded-lg overflow-y-auto">
        <div className="w-full">
          <DrawerHeader className="sticky top-0 z-10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>Correction</DrawerTitle>
                <DrawerDescription>Your quiz correction.</DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button className="p-1 text-gray-500 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
