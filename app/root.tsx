import type { FunctionComponent, PropsWithChildren } from "react";
import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useRealtimeTasksRevalidation } from "./use-realtime-tasks-revalidation";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="h-screen bg-slate-200 text-slate-900">
      <div className="flex h-full min-h-0 flex-col">
        <div className="box-border flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4">
          <Link to="/" className="block w-1/3 leading-3">
            <div className="text-2xl font-black text-white">Task manager</div>
            <div className="text-slate-500">Maya</div>
          </Link>
        </div>

        <div className="h-full min-h-0 grow">{children}</div>
      </div>

      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const App: FunctionComponent = () => {
  useRealtimeTasksRevalidation();

  return <Outlet />;
};
export default App;

export const ErrorBoundary: FunctionComponent<Route.ErrorBoundaryProps> = ({
  error,
}) => {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
};
