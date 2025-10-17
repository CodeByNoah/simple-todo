import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  date: Date;
};

type TaskListProps = {
  tasks: Task[];
};

function Tasklist({ tasks }: TaskListProps) {
  return (
    <ScrollArea className="border-primary m-auto mt-8 h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tasks</h4>
        {tasks.map((task) => (
          <>
            <div className="flex items-center gap-2">
              <div className="text-sm">{task.title}</div>
              <Checkbox className="rounded" />
              <Trash2 className="text-destructive" size={20} />
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}

export default Tasklist;
