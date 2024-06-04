"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface barbershopinfoProps {
  barbershop: Barbershop;
}

const BarberShopInfo = ({ barbershop }: barbershopinfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 top-4 left-4 absolute"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-50 top-4 right-4 absolute"
        >
          <MenuIcon />
        </Button>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>
      <div className=" px-5 pt-3 pb-6 border border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="fill-primary text-secondary" size={20} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-[0.438rem] mt-2">
          <StarIcon className="fill-primary text-primary" size={17} />
          <p className="text-sm">5,0 (745 avaliações).</p>
        </div>
      </div>
    </div>
  );
};

export default BarberShopInfo;
