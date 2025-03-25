"use client";

import { Barbershop } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BarbershopItem from "../_components/barber-shop";
import Header from "../_components/header";
import { searchForBarbershops } from "./_actions/search";

const Barbershops = () => {
  const searchParams = useSearchParams();
  const [barbershop, setBarbershops] = useState<Barbershop[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchBarbershops = async () => {
      if (!searchFor) return;
      const foundBarbershops = await searchForBarbershops(searchFor);
      setBarbershops(foundBarbershops);
      localStorage.removeItem("cachedRestaurants");
      sessionStorage.removeItem("cachedRestaurants");
    };

    fetchBarbershops();
  });

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6 ">
        <h1 className="text-2xl font-bold mb-2">Resultados da Busca!</h1>
        {barbershop.length <= 0 && (
          <h1 className="text-sm font-bold -mb-2">
            Nenhuma Barbearia encontrada!
          </h1>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Barbershops;
