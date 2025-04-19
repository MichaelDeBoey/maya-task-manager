import type { Task } from "@prisma/client";

import { prisma } from "~/db.server";

export const deleteTask = async (id: Task["id"]) =>
  prisma.task.delete({ where: { id } });

export const getAllTasksForBoard = async () => prisma.task.findMany();
