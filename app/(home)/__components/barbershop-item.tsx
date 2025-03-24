"use client";

import LoaderBarber from "@/app/_assets/LoaderBarber.json";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import Lottie from "lottie-react";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //função para o botão Reservar entrar na página de barbearias com o seu respectivo id o redireciona para sua barbearia.
  const handleBookingClick = () => {
    setIsLoading(true);
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <div className="relative">
      {" "}
      {/* Torna esta div o ponto de referência para o posicionamento absoluto */}
      <Card className="min-w-[180px] max-w-[167px] rounded-2xl mb-6 relative overflow-hidden">
        {/* Animação de loading sobrepondo tudo */}
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/80 z-50">
            <Lottie
              loop={true}
              animationData={LoaderBarber}
              className="w-20 h-20"
            />
          </div>
        )}

        {/* Conteúdo do Card */}
        <CardContent className="pb-3 px-0">
          <div className="h-[159px] w-full relative">
            <div className="absolute top-3 left-3 z-50">
              <Badge
                variant="secondary"
                className="opacity-95 top-3 gap-1 left-3"
              >
                <StarIcon size={12} className="fill-primary text-primary" />
                <span className="text-xs">5,0</span>
              </Badge>
            </div>
            <Image
              alt={barbershop.name}
              src={barbershop.imageUrl}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              fill
              className="rounded-t-2xl shadow-lg click"
            />
          </div>
          <div className="px-3">
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.name}
            </h2>
            <p className="text-sm text-gray-500 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.address}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Button
              variant="default"
              className="w-[90%] mt-3"
              onClick={handleBookingClick}
              disabled={isLoading}
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberShopItem;
