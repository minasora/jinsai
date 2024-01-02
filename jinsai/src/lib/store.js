import { writable } from 'svelte/store';

export const totalScore = writable(0);
export const language = writable('cn');
export const currentScore = writable(0);