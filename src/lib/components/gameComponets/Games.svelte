<script lang="ts">
  import { HTML } from "@threlte/extras";
  import {
    showHTML,
    showTrivia,
    showTriviaButton,
  } from "../../../stores/stores";

  import Quiz from "./Trivia.svelte";

  const ShowQuiz = () => {
    showTrivia.set(true);
  };
</script>

{#if !$showTrivia && $showTriviaButton}
  <HTML transform position={[5, 1.2, 0]} scale={[0.5, 0.5, 0.5]}>
    <button
      on:click={ShowQuiz}
      class="bg-orange-600 border-2 text-white font-bold py-2 px-8 rounded hover:bg-orange-700"
      >Click to Play Trivia
    </button>
  </HTML>
{/if}

{#if $showHTML}
  <HTML transform position={[-5, 1.2, 0]} scale={[0.5, 0.5, 0.5]}>
    <button
      class="bg-orange-600 border-2 text-white font-bold py-2 px-8 rounded hover:bg-orange-700"
      >Coming soon...</button
    >
  </HTML>
{/if}

{#if $showTrivia}
  <Quiz position={[5, 4.5, 0]} scale={[0.5, 0.5, 0.5]} rotation={[0, 0, 0]} />
{/if}
