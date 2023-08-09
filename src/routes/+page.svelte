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
  let url = new URL("https://example.com/");

  onMount(() => {
    if (browser) {
      url = new URL(location.href);
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
  <div class="wrapper margin-bottom">
    <pre class="text" {style}>{text}</pre>
  </div>
  <a class="margin-bottom" href="https://github.com/yuimarudev/ochinchin.dev"
    >GitHub</a
  >
  <p>Also available in curl</p>
  <p class="label">Click on the URL to copy</p>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <pre
    on:click={async () => {
      await navigator.clipboard
        .writeText("curl " + url.href)
        .then(() => alert("Copied!"))
        .catch(() => alert("Error"));
    }}
    class="margin-bottom"><code>curl {url}</code></pre>
</div>

<style>
  .text {
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
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }

  .label {
    font-size: small;
    color: gray;
  }

  pre {
    font-size: larger;
  }
</style>
