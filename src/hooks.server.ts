import type { Handle } from "@sveltejs/kit";
import handleCurl from "$lib/server/curl";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.request.headers.get("user-agent")?.includes("curl")) {
    return await handleCurl(event);
  }

  return resolve(event);
};
