"use client";

import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cancelBooking } from "../_actions/cancel-booking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../_components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface BookingItemProps {
  booking: Prisma.BookingsGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const isBookingConfirmed = isFuture(booking.date);

  const handleBookingOnClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="shadow-sm sm:w-full">
          <CardContent className="px-0 py-0 flex">
            <div className="flex flex-col gap-2 py-5 px-2 whitespace-nowrap text-ellipsis truncate sm:flex-[3] flex-[2]">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit cursor-pointer "
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>{booking.barbershop.imageUrl}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden  whitespace-nowrap w-fit">
                  <h3 className="text-sm text-ellipsis truncate">
                    {booking.barbershop.name}
                  </h3>
                  <h4 className="text-xs text-gray-400 text-ellipsis truncate">
                    {booking.barbershop.address}
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col sm:px-2 justify-center flex-1 border-l border-solid border-secondary ">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "yyyy")}</p>
              <p className="text-sm">{format(booking.date, "HH:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0 w-[90%]">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>
            {isBookingConfirmed ? "Detalhe da Reserva" : "Reserva Finalizada"}
          </SheetTitle>
        </SheetHeader>

        <div className="px-8 md:px-4">
          <div className="relative h-[200px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
            />
            <div className="w-full absolute bottom-4 left-0 right-0 px-4">
              <Card>
                <CardContent className="p-3 flex gap-4 justify-center">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div className="whitespace-nowrap overflow-hidden ">
                    <h2 className="font-bold text-ellipsis truncate">
                      {booking.barbershop.name}
                    </h2>
                    <h3 className="text-xs text-ellipsis truncate">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit my-3"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-4 gap-3 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-semibold uppercase">
                  {Intl.NumberFormat("pt-MZ", {
                    style: "currency",
                    currency: "MZN",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              {booking.date && (
                <div className="flex justify-between">
                  <h3 className=" text-sm">Data:</h3>
                  <h4 className="text-sm ">
                    {format(booking.date, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>
              )}

              {booking.date && (
                <div className="flex justify-between">
                  <h3 className="text-sm">Horas:</h3>
                  <h4 className="text-sm ">{format(booking.date, "HH:mm")}</h4>
                </div>
              )}
              <div className="flex justify-between gap-5">
                <h3 className=" text-sm">Barbearia:</h3>
                <h4 className="text-sm whitespace-nowrap overflow-hidden text-ellipsis truncate">
                  {booking.barbershop.name}
                </h4>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row justify-center w-full mt-6 gap-4 ">
            <SheetClose asChild>
              <Button className="w-[50%]">Voltar</Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  className="w-[50%] "
                  variant="destructive"
                >
                  {isDeleteLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[80%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja cancelar a reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    A operação não pode ser desfeita após o cancelamento.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-2">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    className="w-full gap-1"
                    onClick={handleBookingOnClick}
                  >
                    {isDeleteLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
