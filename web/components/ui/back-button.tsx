import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";

interface BackButtonProps {
  href: string;
}

const BackButton = (props: BackButtonProps) => {
  const { href } = props;

  return (
    <Link href={href}>
      <Button className="flex items-center gap-2">
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default BackButton;
