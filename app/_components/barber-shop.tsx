import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Barbershop } from "@prisma/client";
import { cn } from "../_lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface BarbershopItemProps {
  barbershop: Barbershop;
  className?: string;
}

const BarbershopItem = ({ barbershop, className }: BarbershopItemProps) => {
  return (
    <Link
      className={(cn("min-w-[266px] w-full "), className)}
      href={`/barbershops/${barbershop.id}`}
    >
      <div className="w-full">
        <div className=" relative min-h-[136px] min-w-[266px] ">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          <Badge
            variant="secondary"
            className="opacity-95 absolute top-3 gap-1 left-3"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs">5,0</span>
          </Badge>
          <Button
            size="icon"
            className="absolute right-2 top-2 flex h-7 w-7 items-center rounded-full bg-muted-foreground"
          >
            <HeartIcon className="fill-white " size={14}></HeartIcon>
          </Button>
        </div>
        <h3 className="pt-2 text-base font-semibold">{barbershop.name}</h3>
        <div>
          <p className="text-sm text-muted-foreground">{barbershop.address}</p>
        </div>
      </div>
    </Link>
  );
};

export default BarbershopItem;
