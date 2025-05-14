import type { Task } from "@prisma/client";
import { Status } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useSubmit } from "react-router";
import invariant from "tiny-invariant";

import { Plus } from "~/icons";
import { cn } from "~/utils";

import { Card } from "./card";
import { CONTENT_TYPES, INTENTS } from "./constants";
import { CreateTaskForm } from "./create-task-form";

const statusToTitle: Record<Status, string> = {
  [Status.BACKLOG]: "Backlog",
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
  const [acceptDrop, setAcceptDrop] = useState(false);
  const submit = useSubmit();

  return (
    <div
      className={cn(
        "flex max-h-full w-80 shrink-0 flex-col overflow-hidden rounded-xl border-slate-400 bg-slate-100 shadow-sm shadow-slate-400",
        { "outline outline-2 outline-red-500": acceptDrop },
      )}
      onDragLeave={() => setAcceptDrop(false)}
      onDragOver={(event) => {
        if (
          tasks.length > 0 ||
          !event.dataTransfer.types.includes(CONTENT_TYPES.card)
        ) {
          return;
        }

        event.preventDefault();

        setAcceptDrop(true);
      }}
      onDrop={(event) => {
        const { id, title } = JSON.parse(
          event.dataTransfer.getData(CONTENT_TYPES.card),
        );
        invariant(id, "Missing `id`");
        invariant(title, "Missing `title`");

        submit(
          { id, intent: INTENTS.moveTask, order: 1, status, title },
          { fetcherKey: `task:${id}`, method: "post", navigate: false },
        );

        setAcceptDrop(false);
      }}
    >
      <h2 className="block w-full rounded-lg border border-transparent p-2 px-2 py-1 text-left font-medium text-slate-600">
        {statusToTitle[status]}
      </h2>

      <ul className="min-h-[2px] grow overflow-auto">
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task, index, tasks) => (
            <Card
              {...task}
              key={task.id}
              nextOrder={tasks[index + 1]?.order || task.order + 1}
              previousOrder={tasks[index - 1]?.order || 0}
            />
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
