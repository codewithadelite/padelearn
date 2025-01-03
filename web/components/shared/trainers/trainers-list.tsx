"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blocks } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/table-tremor";

import useSWR, { mutate } from "swr";
import programService from "@/services/program.service";
import { IProgram } from "@/models/programs";
import { PROGRAMS_LIST } from "@/constants/fetch-keys";
import { PROGRAM_BG_IMAGES } from "@/constants/programs";

const data: Array<{
  id: number;
  name: string;
  sales: string;
  region: string;
  status: string;
  deltaType: string;
  hours: number;
}> = [
  {
    id: 1,
    name: "Peter McCrown",
    sales: "1,000,000",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 100,
  },
  {
    id: 2,
    name: "Jon Mueller",
    sales: "2,202,000",
    region: "Region B",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 110,
  },
  {
    id: 3,
    name: "Peter Federer",
    sales: "1,505,000",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 90,
  },
  {
    id: 4,
    name: "Maxime Bujet",
    sales: "500,000",
    region: "Region D",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 92,
  },
  {
    id: 5,
    name: "Emma Nelly",
    sales: "600,000",
    region: "Region E",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 95,
  },
];

const TrainersList = () => {
  const {
    data: programs,
    isLoading: isProgramsLoading,
    error: programsError,
  } = useSWR<IProgram[]>(PROGRAMS_LIST, () => programService.getPrograms());

  const getBackground = (): string => {
    let randomIndex = Math.floor(
      Math.random() * (PROGRAM_BG_IMAGES.length - 1 - 0 + 1) + 0
    );

    return PROGRAM_BG_IMAGES[randomIndex];
  };

  return (
    <TableRoot>
      <Table>
        <TableCaption>Recent invoices.</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Sales ($)</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Working Hours (h)
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.sales}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">{item.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableHeaderCell colSpan={2} scope="row" className="text-right">
              4,642
            </TableHeaderCell>
            <TableHeaderCell colSpan={3} scope="row" className="text-right">
              497
            </TableHeaderCell>
          </TableRow>
        </TableFoot>
      </Table>
    </TableRoot>
  );
};

export default TrainersList;
