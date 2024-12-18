<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { showHTML } from "../../../stores/stores";

  let showMessage1 = false;
  let showMessage2 = false;
  let showMessage3 = false;

  const showMessageButton1 = () => {
    showMessage1 = !showMessage1;
  };

  const showMessageButton2 = () => {
    showMessage2 = !showMessage2;
  };

  const showMessageButton3 = () => {
    showMessage3 = !showMessage3;
  };
</script>

{#if $showHTML}
  <HTML
    transform
    occludea
    position={[-10, 1, -6]}
    scale={[0.5, 0.5, 0.5]}
    rotation={[0, 1.2, 0]}
  >
    <button
      on:click={showMessageButton1}
      class="bg-orange-600 border-2 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-700"
      >!</button
    >
  </HTML>

  {#if showMessage1}
    <HTML
      transform
      position={[-9.6, 1, -7]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[0, 1.2, 0]}
    >
      <div
        class="text-white bg-black p-2 rounded-md mountains-of-christmas-bold"
      >
        Happy Holidays
      </div>
    </HTML>
  {/if}

  <HTML
    transform
    occludea
    position={[0, 1, -12]}
    scale={[0.5, 0.5, 0.5]}
    rotation={[0, 0, 0]}
  >
    <button
      on:click={showMessageButton2}
      class="bg-orange-600 border-2 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-700"
      >!</button
    >
  </HTML>

  {#if showMessage2}
    <HTML
      transform
      position={[2, 1, -12]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[0, 0, 0]}
    >
      <div
        class="text-white bg-black p-2 rounded-md mountains-of-christmas-bold"
      >
        Snow is nice but at that cost....
      </div>
    </HTML>
  {/if}

  <HTML
    transform
    occludea
    position={[10, 1, 0]}
    scale={[0.5, 0.5, 0.5]}
    rotation={[0, -1.57, 0]}
  >
    <button
      on:click={showMessageButton3}
      class="bg-orange-600 border-2 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-700"
      >!</button
    >
  </HTML>

  {#if showMessage3}
    <HTML
      transform
      position={[10, 1, 2]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[0, -1.57, 0]}
    >
      <div
        class="text-white bg-black p-2 rounded-md mountains-of-christmas-bold"
      >
        Let's sail through the snow
      </div>
    </HTML>
  {/if}
{/if}
