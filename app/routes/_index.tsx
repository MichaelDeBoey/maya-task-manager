import type { FunctionComponent } from "react";

import type { Route } from "./+types/_index";

export const meta: Route.MetaFunction = () => [
  { title: "Maya task manager App" },
  { name: "description", content: "Welcome to Maya's task manager!" },
];

const Index: FunctionComponent<Route.ComponentProps> = () => null;
export default Index;
