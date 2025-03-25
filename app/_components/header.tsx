"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./side-menu";
import { ModeToggle } from "./theme-toogle";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  return (
    <Card className="rounded-none shadow-sm w-full">
      <CardContent className="p-5 flex justify-between flex-row items-center">
        <Link href="/">
          <Image src="/logotipo.png" alt="FSW Barber" height={22} width={120} />
        </Link>
        <Sheet>
          <div className="flex gap-4">
            <ModeToggle />
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
