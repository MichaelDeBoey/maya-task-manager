import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";

import { emitter, EVENTS } from "~/events.server";
import { badRequest } from "~/utils";

import type { Route } from "./+types/route";
import {
  createTask,
  deleteTask,
  getAllTasksForBoard,
  updateTask,
} from "./board.db.server";
import { Column } from "./column";
import { INTENTS } from "./constants";
import { useTasksToShow } from "./use-tasks-to-show";
import { parseTaskMutation } from "./utils";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (!intent) {
    throw badRequest("Missing intent");
  }

  if (
    ![INTENTS.createTask, INTENTS.deleteTask, INTENTS.moveTask].includes(
      String(intent) as keyof typeof INTENTS,
    )
  ) {
    throw badRequest(`Unknown intent: ${intent}`);
  }

  if (intent === INTENTS.createTask) {
    const task = parseTaskMutation(formData);

    const createdTask = await createTask(task);
    emitter.emit(EVENTS.TASK_CREATED, new Date().toISOString());

    return createdTask;
  }

  if (intent === INTENTS.deleteTask) {
    const taskId = String(formData.get("taskId"));
    invariant(taskId, "Missing `taskId`");

    const deletedTask = await deleteTask(taskId);
    emitter.emit(EVENTS.TASK_DELETED, new Date().toISOString());

    return deletedTask;
  }

  if (intent === INTENTS.moveTask) {
    const task = parseTaskMutation(formData);

    const updatedTask = await updateTask(task);
    emitter.emit(EVENTS.TASK_UPDATED, new Date().toISOString());

    return updatedTask;
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
  const tasksToShow = useTasksToShow(tasks);

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
