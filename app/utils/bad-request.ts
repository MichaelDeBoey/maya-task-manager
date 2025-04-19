export const badRequest = (body: string) =>
  new Response(body, {
    status: 400,
    statusText: "Bad Request",
  });
