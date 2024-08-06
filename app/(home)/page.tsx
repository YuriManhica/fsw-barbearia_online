import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_componets/barbershop-item";
import Search from "./_componets/search";
import Welcome from "./_componets/welcome";

export default async function Home() {
  //chamar prisma e pagar barbearias
  const barbershop = await db.barbershop.findMany({});

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <Welcome />
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      {/* <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Minhas Reservas
        </h2>
        <BookingItem />
      </div> */}

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

      <div className="px-5 mt-6 mb-8">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-300 font-extrabold">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
          {barbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
