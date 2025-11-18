import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteTaskById } from "@/actions/taskAcrions";
import { useSpan } from "effect/Effect";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  date: Date;
  priority: string;
};

type TaskListProps = {
  tasks: Task[];
  isPending: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function Tasklist({ tasks, isPending, setTasks }: TaskListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  async function handleDelete(task: Task) {
    {
      try {
        setDeletingId(task.id); // ⚡ spinner
        const result = await deleteTaskById(task.id); // ❌ فرض کن اگر موفقیت داشت، Promise resolve می‌شه

        // ✅ فقط اگر حذف موفق بود، state آپدیت شود
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      } catch (error) {
        console.error("Failed to delete task:", error);
        // ⚠️ نمایش پیام خطا
        alert("حذف تسک موفق نبود!");
      } finally {
        setDeletingId(null); // spinner off
      }
    }
  }

  return (
    <ScrollArea className="w-1/5 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-lg leading-none font-bold">Tasks</h4>
        {isPending || deletingId ? (
          <Spinner className="text-primary m-auto size-8" />
        ) : tasks.length === 0 ? (
          <div>There is no task </div>
        ) : (
          tasks.map((task, index) => (
            <>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="writing rotate-180 text-xs"
                    style={{
                      writingMode: "vertical-rl",
                    }}
                  >
                    {task.priority}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-sm">{task.title}</div>
                    </div>
                    <div className="text-muted-foreground ml-1 text-xs">
                      {task.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    {new Intl.DateTimeFormat("fa-IR", {
                      month: "long",
                      day: "numeric",
                    }).format(task.date)}
                  </div>
                  <Checkbox className="cursor-pointer rounded" />

                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(task)}
                  >
                    <Trash2
                      className="text-foreground hover:text cursor-pointer"
                      size={20}
                    />
                  </Button>
                </div>
              </div>

              {tasks.length - 1 === index ? null : (
                <Separator className="my-2" />
              )}
            </>
          ))
        )}
      </div>
    </ScrollArea>
  );
}

export default Tasklist;
