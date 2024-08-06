"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface saveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: saveBookingParams) => {
  await db.bookings.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      barbershopId: params.barbershopId,
      date: params.date,
    },
  });
  revalidatePath("/");
  revalidatePath("/bookings");
};
