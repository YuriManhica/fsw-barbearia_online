import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between flex-row items-center">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
