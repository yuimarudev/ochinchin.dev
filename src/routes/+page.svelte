<script lang="ts">
  import "$lib/app.css";
  import "@acab/reset.css";
  import select, { frameList } from "$lib/curl/frames";
  import { color, colors } from "$lib/curl";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let text = "";
  let frame = 0;
  let previousColor = 0;
  let style = "";

  onMount(() => {
    if (browser) {
      const url = new URL(location.href);
      const frames = frameList[url.searchParams.get("name")!] ?? select();

      history.replaceState({}, "", url);

      const tid = setInterval(() => {
        const i = frame >= frames.length ? (frame = 0) : frame++;
        const newColor = (previousColor = color(previousColor));

        text = frames[i];
        style = "color: " + colors[newColor] + ";";
      }, 100);
      return () => clearInterval(tid);
    }
  });
</script>

<div class="main">
  <div class="wrapper">
    <pre {style}>{text}</pre>
  </div>
  <a href="https://github.com/yuimarudev/ochinchin.dev">GitHub</a>
</div>

<style>
  pre {
    font-family: Arial, Helvetica, sans-serif;
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
</style>
