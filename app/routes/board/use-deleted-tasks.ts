import { useFetchers } from "react-router";

import { INTENTS } from "./constants";

type DeletedTaskFetcher = ReturnType<typeof useFetchers>[number] & {
  formData: FormData;
};

export const useDeletedTasks = () =>
  useFetchers()
    .filter(
      (fetcher): fetcher is DeletedTaskFetcher =>
        fetcher.formData?.get("intent") === INTENTS.deleteTask,
    )
    .map((fetcher) => String(fetcher.formData.get("taskId")));
