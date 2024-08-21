import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_componets/barbershop-item";
import Search from "./_componets/search";
import Welcome from "./_componets/welcome";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershop = await db.barbershop.findMany({});

  const Confirmedbookings = session?.user
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
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="mt-6 ">
        {Confirmedbookings.length > 0 ? (
          <>
            <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
              Minhas Reservas
            </h2>
            <div className="px-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
              {Confirmedbookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : (
          <div className="px-5 text-gray-400 text-sm">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-2">
              Você não possui reservas activas.
            </h2>
            <p>
              Que tal agendar seu próximo corte ou tratamento? Com vá serviços
              exclusivos, garanta sua vaga com um de nossos talentosos
              cabeleireiros. Estamos prontos para transformar o seu visual e
              oferecer uma experiência incrível!
            </p>
          </div>
        )}
      </div>

      <div className="px-5 mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-300 font-extrabold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
          {barbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="px-5 mb-10 md:flex-col">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-300 font-extrabold">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden md: flex-[5]">
          {barbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
