import type { Task } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useFetcher } from "react-router";

import { Trash } from "~/icons";

import { INTENTS } from "./constants";

type Props = Pick<Task, "id" | "title">;
export const Card: FunctionComponent<Props> = ({ id, title }) => {
  const deleteFetcher = useFetcher();

  return (
    <li className="-mb-[2px] border-t-2 border-b-2 border-t-transparent border-b-transparent px-2 py-1 last:mb-0">
      <div className="flex w-full rounded-lg border-slate-300 bg-white p-2 text-sm shadow-sm shadow-slate-300">
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
