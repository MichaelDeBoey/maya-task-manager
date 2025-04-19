import { useFetchers } from "react-router";

import { INTENTS } from "./constants";
import type { Status } from "@prisma/client";

type MovedTaskFetcher = ReturnType<typeof useFetchers>[number] & {
  formData: FormData;
};

export const useMovedTasks = () =>
  useFetchers()
    .filter(
      (fetcher): fetcher is MovedTaskFetcher =>
        fetcher.formData?.get("intent") === INTENTS.moveTask,
    )
    .map((fetcher) => ({
      id: String(fetcher.formData.get("id")),
      order: Number(fetcher.formData.get("order")),
      status: String(fetcher.formData.get("status")) as Status,
    }));
