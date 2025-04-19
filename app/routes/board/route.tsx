import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";

import type { Route } from "./+types/route";
import { getAllTasksForBoard } from "./board.db.server";
import { Column } from "./column";

export const loader = async () => ({
  tasks: await getAllTasksForBoard(),
});

export const meta: Route.MetaFunction = () => [
  { title: "Board | Maya task manager" },
];

const Board: FunctionComponent<Route.ComponentProps> = ({
  loaderData: { tasks },
}) => (
  <div className="flex h-full min-h-0 flex-col overflow-x-scroll">
    <div className="flex h-full min-h-0 grow items-start gap-4 px-8 py-4">
      {Object.keys(Status).map((status) => (
        <Column
          key={status}
          status={status as Status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}

      <div className="h-1 w-8 shrink-0" />
    </div>
  </div>
);
export default Board;
