import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import BarberShopInfo from "./_componets/barbershopinfo";
import ServiceItems from "./_componets/service-item";

interface BarberShopDetaisPageProps {
  params: {
    id?: string;
  };
}

const BarberShopDetaisPage = async ({ params }: BarberShopDetaisPageProps) => {
  const session = await getServerSession(authOptions);

  //se o id não for encotrado redirecionar para  a página notfound
  if (!params.id) {
    //TODO:redirecionar para Home Page
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  //chamar prisma e pagar barbearias
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  //se o barbershop não for encontrado redireciona null
  if (!barbershop) {
    //TODO:redirecionar null
    return null;
  }

  //se o barbershop for encontrado retornar o nome da barbearia
  return (
    <div>
      <BarberShopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 py-4 px-3">
        {barbershop.services.map((service) => (
          <ServiceItems
            key={service.id}
            service={service}
            barbershop={barbershop}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetaisPage;
