import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";

import { badRequest } from "~/utils";

import type { Route } from "./+types/route";
import { deleteTask, getAllTasksForBoard } from "./board.db.server";
import { Column } from "./column";
import { INTENTS } from "./constants";
import { useDeletedTasks } from "./use-deleted-tasks";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (!intent) {
    throw badRequest("Missing intent");
  }

  if (![INTENTS.deleteTask].includes(String(intent) as keyof typeof INTENTS)) {
    throw badRequest(`Unknown intent: ${intent}`);
  }

  if (intent === INTENTS.deleteTask) {
    const taskId = String(formData.get("taskId"));
    invariant(taskId, "Missing `taskId`");

    return deleteTask(taskId);
  }
};

export const loader = async () => ({
  tasks: await getAllTasksForBoard(),
});

export const meta: Route.MetaFunction = () => [
  { title: "Board | Maya task manager" },
];

const Board: FunctionComponent<Route.ComponentProps> = ({
  loaderData: { tasks },
}) => {
  const deletedTasks = useDeletedTasks();
  const tasksToShow = tasks.filter(({ id }) => !deletedTasks.includes(id));

  return (
    <div className="flex h-full min-h-0 flex-col overflow-x-scroll">
      <div className="flex h-full min-h-0 grow items-start gap-4 px-8 py-4">
        {Object.keys(Status).map((status) => (
          <Column
            key={status}
            status={status as Status}
            tasks={tasksToShow.filter((task) => task.status === status)}
          />
        ))}

        <div className="h-1 w-8 shrink-0" />
      </div>
    </div>
  );
};
export default Board;
