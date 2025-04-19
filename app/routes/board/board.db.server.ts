import type { Task } from "@prisma/client";

import { prisma } from "~/db.server";

export const createTask = async (
  data: Pick<Task, "id" | "order" | "status" | "title">,
) => prisma.task.create({ data });

export const deleteTask = async (id: Task["id"]) =>
  prisma.task.delete({ where: { id } });

export const getAllTasksForBoard = async () => prisma.task.findMany();

export const updateTask = async ({
  id,
  ...data
}: Pick<Task, "id" | "order" | "status" | "title">) =>
  prisma.task.update({ data, where: { id } });
