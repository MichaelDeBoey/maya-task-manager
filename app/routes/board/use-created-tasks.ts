import type { Status } from "@prisma/client";
import { useFetchers } from "react-router";

import { INTENTS } from "./constants";

type CreatedTaskFetcher = ReturnType<typeof useFetchers>[number] & {
  formData: FormData;
};

export const useCreatedTasks = () =>
  useFetchers()
    .filter(
      (fetcher): fetcher is CreatedTaskFetcher =>
        fetcher.formData?.get("intent") === INTENTS.createTask,
    )
    .map((fetcher) => ({
      id: String(fetcher.formData.get("id")),
      order: Number(fetcher.formData.get("order")),
      status: String(fetcher.formData.get("status")) as Status,
      title: String(fetcher.formData.get("title")),
    }));
