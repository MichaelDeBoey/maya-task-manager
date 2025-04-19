import type { Status, Task } from "@prisma/client";
import invariant from "tiny-invariant";

export const parseTaskMutation = (
  formData: FormData,
): Pick<Task, "id" | "order" | "status" | "title"> => {
  const id = String(formData.get("id"));
  invariant(id, "Missing `id`");

  const order = Number(formData.get("order"));
  invariant(typeof order === "number", "Missing `order`");

  const status = String(formData.get("status")) as Status;
  invariant(status, "Missing `status`");

  const title = String(formData.get("title"));
  invariant(title, "Missing `title`");

  return { id, order, status, title };
};
