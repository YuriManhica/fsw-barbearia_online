import { getServerSession } from "next-auth";
import Image from "next/image";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import BarberShopItem from "./__components/barbershop-item";
import Search from "./__components/search";
import Welcome from "./__components/welcome";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershop = await db.barbershop.findMany({});

  const ConfirmedBookings = session?.user
    ? await db.bookings.findMany({
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
      })
    : [];

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <Welcome />
      </div>
      <div className="px-5 mt-6 gap-6 items-center flex flex-col justify-end sm:flex-row-reverse w-full lg:justify-center">
        <div className="w-full">
          <Search />
        </div>
        <div className="flex justify-center mx-auto h-full w-full">
          <Image
            src="/banner.png"
            alt="banner da pagina inicial"
            width={375}
            height={375}
            quality={100}
            className="rounded-lg object-contain"
          />
        </div>
      </div>

      <div className="mt-6 ">
        {ConfirmedBookings.length > 0 ? (
          <>
            <h2 className="pl-5 text-sm uppercase font-bold mb-3">
              Minhas Reservas
            </h2>
            <div className="px-3 flex gap-3 overflow-x-scroll  w-full [&::-webkit-scrollbar]:hidden">
              {ConfirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : (
          <div className="px-5 text-sm">
            <h2 className="text-md uppercase  font-bold mb-2">
              Você ainda não possui reservas ativas.
            </h2>
          </div>
        )}
      </div>

      <div className=" mt-6">
        <h2 className="px-5 text-sm mb-3 uppercase  font-extrabold">
          Recomendados
        </h2>
        <div className="px-4 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
          {barbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className=" mb-10 md:flex-col">
        <h2 className="px-5 text-sm mb-3 uppercase  font-extrabold">
          Populares
        </h2>
        <div className="px-5 flex gap-4  overflow-x-auto [&::-webkit-scrollbar]:hidden md: flex-[5]">
          {barbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
