import type { RequestEvent } from "@sveltejs/kit";
import chalk from "chalk";
import select, { frameList } from "./frames";

const colors = ["red", "yellow", "green", "blue", "magenta", "cyan", "white"];

const color = (previousColor: number) => {
  let color;

  do {
    color = Math.floor(Math.random() * colors.length);
  } while (color === previousColor);

  return color;
};

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
        const i = frame >= frames.length ? (frame = 0) : frame++;
        const newColor = (previousColor = color(previousColor));

        try {
          // @ts-ignore
          controller.enqueue(chalk[colors[newColor]](frames[i]));
          controller.enqueue("\x1b[2J\x1b[3J\x1b[H");
        } catch {
          clearInterval(tid);
        }
      }, 100);
    },
  });

  return new Response(readable);
}
