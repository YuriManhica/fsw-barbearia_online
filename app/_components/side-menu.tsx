"use client";

import {
  CalendarIcon,
  HomeIcon,
  LoaderIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

const SideMenu = () => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOutClick = async () => {
    setIsLoading(true); // Ativa o loading
    try {
      await signOut(); // Aguarda o logout ser concluído
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoading(false); // Desativa o loading, independentemente do sucesso ou erro
    }
  };

  const handleSignInClick = async () => {
    setIsLoading(true); // Ativa o loading
    try {
      await signIn("google"); // Aguarda o logout ser concluído
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoading(false); // Desativa o loading, independentemente do sucesso ou erro
    }
  };

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5 md:w-[50%]">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <div className="flex">
            <Button
              onClick={handleLogOutClick}
              className="px-3 w-fit gap-1"
              variant="outline"
              size="icon"
            >
              Sair
              {isLoading ? (
                <LoaderIcon className="animate-spin" size={18} />
              ) : (
                <LogOutIcon size={18} />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-5 p-6 gap-3">
          <div className="flex items-center gap-3">
            <UserIcon size={32} />
            <h2>Olá, faça o seu login.</h2>
          </div>
          <Button
            variant="secondary"
            className="w[90%] gap-2 justify-start"
            onClick={handleSignInClick}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={18} />
            ) : (
              <LogOutIcon size={18} />
            )}
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={20} className="mr-2" />
            Ínicio
          </Link>
        </Button>

        {data?.user && (
          <>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/bookings">
                <CalendarIcon size={20} className="mr-2" />
                Agendametos
              </Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default SideMenu;
