import { eventStream } from "remix-utils/sse/server";

import { emitter, EVENTS } from "~/events.server";

import type { Route } from "./+types/task-events";

export const loader = async ({ request }: Route.LoaderArgs) =>
  eventStream(request.signal, (send) => {
    const handler = (message: string) => send({ data: message });

    emitter.addListener(EVENTS.TASK_CREATED, handler);
    emitter.addListener(EVENTS.TASK_DELETED, handler);
    emitter.addListener(EVENTS.TASK_UPDATED, handler);

    return () => {
      emitter.removeListener(EVENTS.TASK_CREATED, handler);
      emitter.removeListener(EVENTS.TASK_DELETED, handler);
      emitter.removeListener(EVENTS.TASK_UPDATED, handler);
    };
  });
