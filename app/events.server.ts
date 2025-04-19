import { EventEmitter } from "node:events";

export const emitter = new EventEmitter();

export const EVENTS = {
  TASK_CREATED: "TASK_CREATED",
  TASK_DELETED: "TASK_DELETED",
  TASK_UPDATED: "TASK_UPDATED",
} as const;
