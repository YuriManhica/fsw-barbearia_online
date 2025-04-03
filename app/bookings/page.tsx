import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import PaymentButton from "./_componets/payment-buttom";

const BookingsPage = async () => {
  //redireciona a sessao do usuario (ver se esta logado ou nao)
  const session = await getServerSession(authOptions);

  //se nao estiver logado redireciona para tela Inicial
  if (!session?.user) {
    redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.bookings.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.bookings.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  // const confirmedBookings = bookings.filter((bookings) =>
  //   isFuture(bookings.date)
  // );
  // const finisheddBookings = bookings.filter((bookings) =>
  //   isPast(bookings.date)
  // );

  return (
    <>
      <Header />

      <div className="py-6 mb-12 w-full">
        {confirmedBookings.length <= 0 && finishedBookings.length <= 0 && (
          <div className="px-4">
            <h1 className="text-xl font-bold">Sem Agendamentos no Momento!</h1>
            <h2 className="mt-6 mb-3 text-gray-400 font-bold text-sm">
              Aproveite essa oportunidade para agendar agora e desfrutar dos
              nossos serviços excepcionais! Não perca tempo, reserve já e
              descubra como podemos tornar seu dia ainda mais especial.
            </h2>
            <Link href="/">
              <Button className="w-[100px] mt-6">Voltar</Button>
            </Link>
          </div>
        )}

        {(confirmedBookings.length > 0 || finishedBookings.length > 0) && (
          <h1 className="text-xl font-bold px-4">Agendamentos</h1>
        )}

        {confirmedBookings.length > 0 && (
          <div className="px-4 ">
            <h2 className="mt-6 mb-3 w-fit px-4 rounded-sm  uppercase font-bold text-xs bg-primary text-white py-2 cursor-pointer text-center">
              Pedidos Confirmados
            </h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
            <PaymentButton />
          </div>
        )}

        {finishedBookings.length > 0 && (
          <div className="px-4">
            <h2 className="mt-6 mb-3 border-transparent bg-secondary text-gray-400 hover:bg-secondary/80 w-fit rounded-sm px-4 uppercase font-bold text-xs py-2 cursor-pointer text-center">
              Pedidos Finalizados
            </h2>
            <div className="flex md:grid md:grid-cols-2 flex-col gap-3 xl:grid-cols-3 w-full">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
