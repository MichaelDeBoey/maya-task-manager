import type { Task } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useFetcher, useSubmit } from "react-router";
import invariant from "tiny-invariant";

import { Trash } from "~/icons";
import { cn } from "~/utils";

import { CONTENT_TYPES, INTENTS } from "./constants";

type Props = Pick<Task, "id" | "order" | "status" | "title"> & {
  nextOrder: Task["order"];
  previousOrder: Task["order"];
};
export const Card: FunctionComponent<Props> = ({
  id,
  nextOrder,
  order,
  previousOrder,
  status,
  title,
}) => {
  const deleteFetcher = useFetcher();
  const [acceptDrop, setAcceptDrop] = useState<"bottom" | "top" | "none">(
    "none",
  );
  const submit = useSubmit();

  return (
    <li
      className={cn(
        "-mb-[2px] cursor-grab border-t-2 border-b-2 px-2 py-1 last:mb-0 active:cursor-grabbing",
        {
          "border-t-transparent border-b-red-500": acceptDrop === "bottom",
          "border-t-red-500 border-b-transparent": acceptDrop === "top",
          "border-t-transparent border-b-transparent": acceptDrop === "none",
        },
      )}
      onDragLeave={() => setAcceptDrop("none")}
      onDragOver={(event) => {
        if (!event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        const rect = event.currentTarget.getBoundingClientRect();
        const midpoint = (rect.top + rect.bottom) / 2;

        setAcceptDrop(event.clientY <= midpoint ? "top" : "bottom");
      }}
      onDrop={(event) => {
        event.stopPropagation();

        const { id, title } = JSON.parse(
          event.dataTransfer.getData(CONTENT_TYPES.card),
        );
        invariant(id, "Missing `id`");
        invariant(title, "Missing `title`");

        const droppedOrder = acceptDrop === "top" ? previousOrder : nextOrder;
        const moveOrder = (droppedOrder + order) / 2;

        console.log({
          previousOrder,
          nextOrder,
          order,
          moved: {
            id,
            intent: INTENTS.moveTask,
            order: moveOrder,
            status,
            title,
          },
        });

        submit(
          { id, intent: INTENTS.moveTask, order: moveOrder, status, title },
          { fetcherKey: `task:${id}`, method: "post", navigate: false },
        );

        setAcceptDrop("none");
      }}
    >
      <div
        className="flex w-full rounded-lg border-slate-300 bg-white p-2 text-sm shadow-sm shadow-slate-300"
        draggable
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData(
            CONTENT_TYPES.card,
            JSON.stringify({ id, title }),
          );
        }}
      >
        <div className="grow">
          <h3>{title}</h3>
        </div>

        <deleteFetcher.Form className="shrink-0" method="post">
          <input type="hidden" name="taskId" value={id} />

          <button
            aria-label="Delete task"
            className="cursor-pointer hover:text-red-500"
            name="intent"
            type="submit"
            value={INTENTS.deleteTask}
          >
            <Trash />
          </button>
        </deleteFetcher.Form>
      </div>
    </li>
  );
};
