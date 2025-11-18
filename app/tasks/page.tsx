"use client";

import Tasklist from "@/components/shared/Tasklist";
import { useCallback, useEffect, useState, useTransition } from "react";
import { PersianCalendar } from "@/components/ui/persian-calendar";
import { Calendar } from "@/components/ui/calendar";
import { getTaskByDate } from "@/actions/taskAcrions";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  date: Date;
  priority: string;
};
function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, startTransition] = useTransition();

  const [date, setDate] = useState<Date | undefined>(new Date());
  console.log(tasks);

  const handleSelect = useCallback((date: Date | undefined) => {
    if (!date) return;

    startTransition(async () => {
      setDate(date);
      const data = await getTaskByDate(date.toISOString());
      setTasks(data);
    });
    // **** ۳. یک آرایه وابستگی خالی به آن بدهید ****
    // چون startTransition, setDate, setTasks توسط هوک‌های ری‌اکت تضمین شده‌اند که استیبل باشند
  }, []);
  return (
    <div className="flex items-stretch justify-center gap-4 p-4">
      <Tasklist tasks={tasks} setTasks={setTasks} isPending={isPending} />
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="w-1/5 rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
    </div>
  );
}

export default Page;
