import type { Task } from "@prisma/client";
import type { FunctionComponent } from "react";

type Props = Pick<Task, "title">;
export const Card: FunctionComponent<Props> = ({ title }) => (
  <li className="-mb-[2px] border-t-2 border-b-2 border-t-transparent border-b-transparent px-2 py-1 last:mb-0">
    <div className="flex w-full rounded-lg border-slate-300 bg-white p-2 text-sm shadow-sm shadow-slate-300">
      <div className="grow">
        <h3>{title}</h3>
      </div>
    </div>
  </li>
);
