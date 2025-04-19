import type { Task } from "@prisma/client";
import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";

import { Card } from "./card";

const statusToTitle: Record<Status, string> = {
  [Status.TODO]: "Pending",
  [Status.IN_PROGRESS]: "In Progress",
  [Status.DONE]: "Complete",
};

type Props = {
  status: Status;
  tasks: Task[];
};
export const Column: FunctionComponent<Props> = ({ status, tasks }) => (
  <div className="flex max-h-full w-80 shrink-0 flex-col overflow-hidden rounded-xl border-slate-400 bg-slate-100 shadow-sm shadow-slate-400">
    <h2 className="block w-full rounded-lg border border-transparent p-2 px-2 py-1 text-left font-medium text-slate-600">
      {statusToTitle[status]}
    </h2>

    <ul className="min-h-[2px] grow overflow-auto">
      {tasks
        .sort((a, b) => a.order - b.order)
        .map((task) => (
          <Card id={task.id} key={task.id} title={task.title} />
        ))}
    </ul>
  </div>
);
