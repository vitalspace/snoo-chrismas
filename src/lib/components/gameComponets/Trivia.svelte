<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { onMount, onDestroy } from "svelte";
  import { showTrivia } from "../../../stores/stores";

  import { generalQuestions } from "../utils/generalQuestions";

  export let position = [0, 0, 0];
  export let scale = [1, 1, 1];
  export let rotation = [0, 0, 0];

  const TIME_PER_QUESTION = 15; // seconds

  let currentLevel = 0;
  let message = "";
  let shuffledOptions = [];
  let remainingTime = TIME_PER_QUESTION;
  let score = 0;
  let gameFinished = false;
  let tutorialActive = true; // Show tutorial at the beginning
  let timer;
  let locked = false; // Prevents rapid transitions

  $: timePercentage = (remainingTime / TIME_PER_QUESTION) * 100;

  const CloseTrivia = () => {
    $showTrivia = false;
  };

  function shuffleOptions() {
    shuffledOptions = [...generalQuestions[currentLevel].options].sort(
      () => Math.random() - 0.5
    );
  }

  function handleTimeUp() {
    if (!locked) {
      locked = true; // Lock transition to avoid duplicates
      message = "Time's up! Moving to the next question...";
      clearInterval(timer); // Stop the timer
      setTimeout(() => goToNextLevel(), 2000); // Move to the next level with delay
    }
  }

  function checkAnswer(answer) {
    if (!locked) {
      locked = true; // Lock multiple interactions
      clearInterval(timer); // Stop the timer
      if (answer === generalQuestions[currentLevel].correctAnswer) {
        score += 1;
        message = "Correct! +1 point";
      } else {
        message = `Incorrect. The correct answer was: ${generalQuestions[currentLevel].correctAnswer}`;
      }
      setTimeout(() => goToNextLevel(), 2000); // Move to the next level with delay
    }
  }

  function goToNextLevel() {
    locked = false; // Unlock interactions for the next question
    if (currentLevel < generalQuestions.length - 1) {
      currentLevel += 1;
      remainingTime = TIME_PER_QUESTION;
      message = "";
      shuffleOptions();
      startTimer(); // Restart the timer
    } else {
      gameFinished = true;
    }
  }

  function startGame() {
    tutorialActive = false; // Hide the tutorial
    shuffleOptions();
    startTimer(); // Start timer
  }

  function restartGame() {
    currentLevel = 0;
    message = "";
    score = 0;
    remainingTime = TIME_PER_QUESTION;
    gameFinished = false;
    tutorialActive = true; // Show tutorial when restarting
    locked = false; // Ensure unlocking
    clearInterval(timer);
  }

  // Nueva función para terminar el juego
  function endGame() {
    clearInterval(timer); // Detener el temporizador
    gameFinished = true; // Mostrar pantalla de fin de juego
    message = "Game ended by user";
    locked = true; // Bloquear interacciones
  }

  function startTimer() {
    clearInterval(timer); // Ensure no previous timers are active
    timer = setInterval(() => {
      if (remainingTime <= 1) {
        clearInterval(timer);
        handleTimeUp(); // Handle time up
      } else {
        remainingTime -= 1;
      }
    }, 1000);
  }

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

{#if tutorialActive}
  <!-- Tutorial screen -->
  <HTML transform occlude {position} {scale} {rotation}>
    <div
      class="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl bg-[#0a0a1f] border-2 border-purple-400 select-none"
    >
      <div class="flex justify-end">
        <button
          class="bg-slate-950 rounded-full"
          on:click={() => showTrivia.set(false)}
          ><img class="h-6 w-6 text-white" src="/close.svg" alt="" /></button
        >
      </div>
      <h1
        class="text-2xl text-center mb-4 md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
      >
        Welcome to the Trivia game!
      </h1>
      <div class="mb-4 text-lg text-white">
        Instructions:
        <ul class="list-disc ml-6">
          <li>Answer the question correctly before time runs out.</li>
          <li>Each correct answer adds 1 point to your score.</li>
          <li>
            If time runs out, you will automatically move to the next question.
          </li>
        </ul>
      </div>
      <p class="mb-4">Test your knowledge and try to get the highest score!</p>
      <button
        class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-md text-lg relative overflow-hidden group"
        on:click={startGame}
      >
        Start Game
      </button>
    </div>
  </HTML>
{:else if gameFinished}
  <!-- Game Over screen -->
  <HTML transform occlude position={[5, 3, 0]} {scale} {rotation}>
    <div
      class="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl bg-[#0a0a1f] border-2 border-purple-400 select-none"
    >
      <div class="flex justify-end">
        <button
          class="bg-slate-950 rounded-full"
          on:click={() => showTrivia.set(false)}
          ><img class="h-6 w-6 text-white" src="/close.svg" alt="" /></button
        >
      </div>
      <h1
        class="text-2xl text-center mb-4 md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
      >
        Game Over
      </h1>
      <p class="mb-4 text-lg text-white">
        Your final score is: {score} out of {generalQuestions.length}
      </p>
      <button
        class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-md text-lg relative overflow-hidden group"
        on:click={restartGame}
      >
        Play Again
      </button>
    </div>
  </HTML>
{:else}
  <!-- Main Game -->
  <HTML transform occlude position={[5, 4, 0]} {scale} {rotation}>
    <div
      class="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl bg-[#0a0a1f] text-white border-2 border-purple-400 select-none"
    >
      <div class="flex justify-end">
        <button
          class="bg-slate-950 rounded-full"
          on:click={() => showTrivia.set(false)}
          ><img class="h-6 w-6 text-white" src="/close.svg" alt="" /></button
        >
      </div>
      <h1
        class="text-2xl text-center mb-4 md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
      >
        General Questions Quiz Game
      </h1>
      <p class="mb-2 text-white">
        Level: {currentLevel + 1} of {generalQuestions.length}
      </p>
      <p class="mb-2">Score: {score}</p>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style="width: {timePercentage}%"
        ></div>
      </div>
      <p class="mb-4">{generalQuestions[currentLevel].question}</p>
      <div class="grid grid-cols-2 gap-4 mb-4">
        {#each shuffledOptions as option}
          <button
            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-md relative overflow-hidden group"
            on:click={() => checkAnswer(option)}
            disabled={!!message}
          >
            {option}
          </button>
        {/each}
      </div>
      <button
        class="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        on:click={endGame}
      >
        End Game
      </button>
      {#if message}
        <p class="mt-4 text-center font-semibold">{message}</p>
      {/if}
    </div>
  </HTML>
{/if}
