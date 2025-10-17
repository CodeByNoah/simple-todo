import prisma from "@/lib/prisma";
import Tasklist from "@/components/shared/Tasklist";

async function Page() {
  const tasks = await prisma.task.findMany();
  console.log(tasks);
  return (
    <div>
      <Tasklist tasks={tasks} />
    </div>
  );
}

export default Page;
