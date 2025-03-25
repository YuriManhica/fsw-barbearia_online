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
        <h2 className="mb-6 text-lg font-semibold">Barbearias Encontrados</h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {barbershop.map((barbershops) => (
            <BarbershopItem key={barbershops.id} barbershop={barbershops} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Barbershops;
