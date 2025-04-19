import { redirect } from "react-router";

import type { Route } from "./+types/_index";

export const loader = () => redirect("/board");

export const meta: Route.MetaFunction = () => [
  { title: "Maya task manager App" },
  { name: "description", content: "Welcome to Maya's task manager!" },
];
