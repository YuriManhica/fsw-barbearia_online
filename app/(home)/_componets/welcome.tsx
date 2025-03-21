"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

const Welcome = () => {
  const { data } = useSession();

  return (
    <>
      {data?.user ? (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Olá, {data?.user?.name}!</h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE',' dd 'de' MMMM.", {
                locale: ptBR,
              })}
            </p>
          </div>
          <Avatar>
            <AvatarImage src={data.user?.image ?? ""} />
          </Avatar>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">
            Olá, vamos agendar um corte hoje?
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM.", {
              locale: ptBR,
            })}
          </p>
        </div>
      )}
    </>
  );
};

export default Welcome;
