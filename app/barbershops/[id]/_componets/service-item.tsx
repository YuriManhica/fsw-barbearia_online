"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Bookings, Service } from "@prisma/client";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getDayBookings } from "../_actions/get-day-bookings";
import { saveBooking } from "../_actions/save-booking";
import { generateDateTimeList } from "../_helpers/hours";

interface ServiceItemsProps {
  barbershop: Barbershop;
  service: Service;
  isBookingDisabled?: boolean;
  isAuthenticated?: boolean;
}

const ServiceItems = ({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemsProps) => {
  const router = useRouter();
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [isloading, setLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);

      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleBookingOnClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }

    //TODO:abrir model de agendamentos
  };
  const timelist = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDateTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  const handleBookingSubmit = async () => {
    setLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }
      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);
      toast("Agendamento realizado com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'as' HH':'mm.'", {
          locale: ptBR,
        }),
        action: {
          label: "Ir para Agendamentos",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="relative min-h-[110px] max-w-[110px] min-w-[110px] max-h-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-sm font-bold text-primary uppercase">
                {Intl.NumberFormat("pt-MZ", {
                  style: "currency",
                  currency: "MZN",
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    className="text-primary"
                    onClick={handleBookingOnClick}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          display: "block",
                        },
                        cell: {
                          width: "100%",
                          display: "block",
                        },
                        button: {
                          width: "100%",
                          display: "block",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                          textAlign: "center",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-y border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timelist.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6">
                    <Card>
                      <CardContent className="p-4 gap-3 flex flex-col">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-semibold uppercase">
                            {Intl.NumberFormat("pt-MZ", {
                              style: "currency",
                              currency: "MZN",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data:</h3>
                            <h4 className="text-sm ">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </h4>
                          </div>
                        )}

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horas:</h3>
                            <h4 className="text-sm ">{hour}</h4>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia:</h3>
                          <h4 className="text-sm ">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!hour || isloading}
                    >
                      {isloading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar Reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItems;
