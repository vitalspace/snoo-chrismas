import { writable } from "svelte/store";

export let showTrivia = writable(false);
export let showTriviaButton = writable(false);
export let user = writable("Vital");

export let showHTML = writable(false);