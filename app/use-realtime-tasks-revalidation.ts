import { useEffect, useRef } from "react";
import { useRevalidator } from "react-router";
import { useEventSource } from "remix-utils/sse/react";

export const useRealtimeTasksRevalidation = () => {
  const data = useEventSource("/task-events");
  const revalidator = useRevalidator();
  let revalidate = useRef(revalidator.revalidate);

  useEffect(() => {
    // stores the latest version in a ref
    revalidate.current = revalidator.revalidate;
  }, [revalidator]);

  useEffect(() => {
    // This always uses the correct one from the ref
    revalidate.current?.();
  }, [data]);
};
