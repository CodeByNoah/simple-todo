"use server";
import { startOfDay, endOfDay } from "date-fns";

import prisma from "@/lib/prisma";

export async function getTaskByDate(dateString: string) {
  const date = new Date(dateString);
  return prisma.task.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lt: endOfDay(date),
      },
    },
  });
}

export async function deleteTaskById(id: number) {
  const deletedTask = await prisma.task.delete({
    where: {
      id: id,
    },
  });
}
