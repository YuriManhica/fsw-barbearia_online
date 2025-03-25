"use client";

import { Barbershop } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BarbershopItem from "../_components/barber-shop";
import Header from "../_components/header";
import { searchForBarbershops } from "./_actions/search";

// Wrap the component that uses useSearchParams in Suspense
const BarbershopsContent = () => {
  const searchParams = useSearchParams();
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchBarbershops = async () => {
      if (!searchFor) return;
      const foundBarbershops = await searchForBarbershops(searchFor);
      setBarbershops(foundBarbershops);
      localStorage.removeItem("cachedBarbershops");
      sessionStorage.removeItem("cachedBarbershops");
    };

    fetchBarbershops();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-bold mb-2">Resultados da Busca!</h1>
      {barbershops.length <= 0 && (
        <h1 className="text-sm font-bold -mb-2">
          Nenhuma Barbearia encontrada!
        </h1>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const Barbershops = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Carregando...</div>}>
        <BarbershopsContent />
      </Suspense>
    </>
  );
};

export default Barbershops;
