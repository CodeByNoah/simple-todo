import Image from "next/image";

import prisma from "@/lib/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";

export default async function Home() {
  const tasks = await prisma.task.findMany();
  console.log(tasks);
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  return <div></div>;
}
