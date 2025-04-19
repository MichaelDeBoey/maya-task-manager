import type { Task } from "@prisma/client";

import { useCreatedTasks } from "./use-created-tasks";
import { useDeletedTasks } from "./use-deleted-tasks";
import { useMovedTasks } from "./use-moved-tasks";

export const useTasksToShow = (tasks: Task[]) => {
  const createdTasks = useCreatedTasks();
  const deletedTasks = useDeletedTasks();
  const movedTasks = useMovedTasks();

  const tasksById = new Map(
    tasks.concat(createdTasks).map((task) => [task.id, task]),
  );

  movedTasks.forEach(({ id, order, status }) => {
    const task = tasksById.get(id);
    if (task) {
      tasksById.set(id, { ...task, order, status });
    }
  });

  deletedTasks.forEach((taskId) => tasksById.delete(taskId));

  return Array.from(tasksById.values());
};
