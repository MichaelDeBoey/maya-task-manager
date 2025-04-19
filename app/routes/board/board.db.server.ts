import { prisma } from "~/db.server";

export const getAllTasksForBoard = async () => prisma.task.findMany();
