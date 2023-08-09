import type { RequestEvent } from "@sveltejs/kit";
import { Chalk } from "chalk";
import select, { frameList } from "$lib/curl/frames";
import { color, colors } from "$lib/curl";
const chalk = new Chalk({
  level: 2,
});

export default async function handleRequest(
  event: RequestEvent<Partial<Record<string, string>>, string | null>
): Promise<Response> {
  const name = event.url.searchParams.get("name")!;
  const frames = frameList[name] ?? select();
  let frame = 0;
  let previousColor: number;

  const readable = new ReadableStream({
    start(controller) {
      const tid = setInterval(() => {
        try {
          controller.enqueue("\x1b[2J\x1b[3J\x1b[H");
          const i = frame >= frames.length ? (frame = 0) : frame++;
          const newColor = (previousColor = color(previousColor));

          // @ts-ignore
          controller.enqueue(chalk[colors[newColor]](frames[i]));
        } catch (e) {
          clearInterval(tid);
        }
      }, 70);
    },
  });

  return new Response(readable);
}
