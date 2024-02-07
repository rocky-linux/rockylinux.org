import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { ReactNode } from "react";

export interface NavListProps {
  name: string;
  children?: ReactNode;
}

const NavList = ({ name, children }: NavListProps) => {
  return (
    <AccordionItem value={name}>
      <AccordionTrigger>{name}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default NavList;
