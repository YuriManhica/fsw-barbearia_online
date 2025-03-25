"use server";

import { db } from "@/app/_lib/prisma";

export const searchForBarbershops = async (search: string) => {
  const restaurants = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};
