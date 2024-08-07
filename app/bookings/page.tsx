import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

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

      <div className="px-5 py-6">
        {confirmedBookings.length <= 0 && finishedBookings.length <= 0 && (
          <>
            <h1 className="text-xl font-bold">Sem Agendamentos no Momento?</h1>
            <h2 className="mt-6 mb-3 text-gray-400 font-bold text-sm">
              Aproveite essa oportunidade para agendar agora e desfrutar dos
              nossos serviços excepcionais! Não perca tempo, reserve já e
              descubra como podemos tornar seu dia ainda mais especial.
            </h2>
            <Link href="/">
              <Button className="w-[100px] mt-6">Voltar</Button>
            </Link>
          </>
        )}

        {(confirmedBookings.length > 0 || finishedBookings.length > 0) && (
          <h1 className="text-xl font-bold">Agendamentos</h1>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-gray-400 uppercase font-bold text-sm">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-gray-400 uppercase font-bold text-sm">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
