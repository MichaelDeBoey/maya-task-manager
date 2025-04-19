import type { Task } from "@prisma/client";
import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useState } from "react";

import { Plus } from "~/icons";

import { Card } from "./card";
import { CreateTaskForm } from "./create-task-form";

const statusToTitle: Record<Status, string> = {
  [Status.TODO]: "Pending",
  [Status.IN_PROGRESS]: "In Progress",
  [Status.DONE]: "Complete",
};

type Props = {
  status: Status;
  tasks: Task[];
};
export const Column: FunctionComponent<Props> = ({ status, tasks }) => {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

  return (
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

      {showCreateTaskForm ? (
        <CreateTaskForm
          nextOrder={tasks.length === 0 ? 1 : tasks[tasks.length - 1].order + 1}
          onCreateTask={() => setShowCreateTaskForm(false)}
          onCancel={() => setShowCreateTaskForm(false)}
          status={status}
        />
      ) : (
        <div className="p-2 pt-1">
          <button
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left font-medium text-slate-500 hover:bg-slate-200 focus:bg-slate-200"
            onClick={() => setShowCreateTaskForm(true)}
            type="button"
          >
            <Plus /> Add a task
          </button>
        </div>
      )}
    </div>
  );
};
