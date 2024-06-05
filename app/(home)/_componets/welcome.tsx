"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

const Welcome = () => {
  const { data } = useSession();

  return (
    <>
      {data?.user ? (
        <div>
          <h2 className="text-xl font-bold">Olá, {data?.user?.name}.</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM.", {
              locale: ptBR,
            })}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Por favor, faça o login.</h2>
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
