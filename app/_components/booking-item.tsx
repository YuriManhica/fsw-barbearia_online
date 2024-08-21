"use client";

import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
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
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[450px] w-[450px] sm:w-full">
          <CardContent className="px-0 py-0 flex ">
            <div className="flex flex-col gap-2 py-5 pl-5 flex-[3]">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>{booking.barbershop.imageUrl}</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex items-center flex-col justify-center flex-1 border-l border-solid border-secondary ">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "HH:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>
            {isBookingConfirmed ? "Detalhe da Reserva" : "Reserva Finalizada"}
          </SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[200px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
            />
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-ellipsis text-nowrap">
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
                  <h3 className="text-gray-400 text-sm">Data:</h3>
                  <h4 className="text-sm ">
                    {format(booking.date, "dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>
              )}

              {booking.date && (
                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Horas:</h3>
                  <h4 className="text-sm ">{format(booking.date, "HH:mm")}</h4>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia:</h3>
                <h4 className="text-sm ">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row w-full mt-6 gap-1">
            <SheetClose asChild>
              <Button className="w-full">Voltar</Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  className="w-full"
                  variant="destructive"
                >
                  {isDeleteLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja cancelar a reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    A operação não pode ser desfeita após o cancelamento.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row">
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
