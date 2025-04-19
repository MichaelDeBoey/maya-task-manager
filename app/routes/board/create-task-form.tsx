import type { Status } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useRef } from "react";
import { Form, useSubmit } from "react-router";
import invariant from "tiny-invariant";

import { INTENTS } from "./constants";

type Props = {
  nextOrder: number;
  onCancel: () => void;
  onCreateTask: () => void;
  status: Status;
};
export const CreateTaskForm: FunctionComponent<Props> = ({
  nextOrder,
  onCancel,
  onCreateTask,
  status,
}) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const submit = useSubmit();

  return (
    <Form
      className="flex flex-col gap-2.5 p-2 pt-1"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.set("id", crypto.randomUUID());
        formData.set("intent", INTENTS.createTask);
        formData.set("order", String(nextOrder));
        formData.set("status", status);

        submit(formData, {
          fetcherKey: `task:${formData.get("id")}`,
          method: "post",
          navigate: false,
        });

        invariant(textAreaRef.current);
        textAreaRef.current.value = "";

        onCreateTask();
      }}
    >
      <textarea
        autoFocus
        className="h-14 w-full resize-none rounded-lg border-slate-300 px-2 py-1 text-sm shadow shadow-slate-300 outline-hidden placeholder:text-sm placeholder:text-slate-500"
        name="title"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();

            saveButtonRef.current?.click();
          }
        }}
        placeholder="Enter a title for this task"
        ref={textAreaRef}
        required
      />

      <div className="flex justify-between">
        <button
          aria-label="Create task"
          className="cursor-pointer rounded-lg bg-blue-500 p-2 text-left text-sm font-medium text-white"
          ref={saveButtonRef}
          type="submit"
        >
          Save Card
        </button>

        <button
          aria-label="Cancel"
          className="cursor-pointer rounded-lg p-2 text-left text-sm font-medium hover:bg-slate-200 focus:bg-slate-200"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};
