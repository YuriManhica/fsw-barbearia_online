"use client";

import { MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import SideMenu from "./side-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { theme } = useTheme();
  return (
    <Card className="rounded-none shadow-sm w-full">
      <CardContent className="p-5 flex justify-between flex-row items-center">
        <Link href="/">
          <div className="bungee text-2xl flex gap-2">
            <h1 className="text-primary">Barb'r</h1>
            Hub
          </div>
          {/* <Image 
            src={theme === "dark" ? "/logotipo.png" : "/logotipodark.png"}
            alt="FSW Barber"
            height={22}
            width={120}
          /> */}
        </Link>
        <Sheet>
          <div className=" flex gap-4">
            {/* <ModeToggle /> */}
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="p-0 w-[90%]">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
