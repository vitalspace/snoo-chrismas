<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { World } from "@threlte/rapier";

  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { showHTML, showTriviaButton } from "../../stores/stores";
  import Controls from "./Ui/Controls.svelte";
  // import User from "./dialogs/User.svelte";

  const { progress } = useProgress();

  let showCanvas = false;

  const tweenedProgress = tweened(0, {
    duration: 800,
  });

  $: tweenedProgress.set($progress);

  $: {
    if ($tweenedProgress === 1) {
      showCanvas = true;
      showTriviaButton.set(true);
      showHTML.set(true);
      console.log("me cuento");
    }
  }
</script>

{#if $tweenedProgress < 1 && !showCanvas}
  <div
    transition:fade|local={{
      duration: 200,
    }}
    class="absolute top-0 left-0 w-full h-full bg-[#0d1320] flex flex-col items-center justify-center"
  >
    <div class="grid gap-y-4 text-center bangers-regular">
      <div>
        <h1 class="mountains-of-christmas-bold text-7xl text-border text-white">
          Snoo Christmas Trivia
        </h1>
      </div>

      <div class="w-full grid gap-4">
        <p class="mountains-of-christmas-bold text-xl text-white">Loading</p>
        <div class="w-full border h-3">
          <div
            class="h-full bg-white w-full"
            style="width: {$tweenedProgress * 100}%"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- <CubeControls /> -->

<div class="h-screen" class:showCanvas>
  <Controls />

  <Canvas>
    <World>
      <Scene />
    </World>
  </Canvas>
</div>
