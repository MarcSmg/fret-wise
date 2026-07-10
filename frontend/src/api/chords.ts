import { api } from "./client";
import type { SavedChordResponse } from "./types/chords";

// Saved chords

// Get all saved chords for the current user
export async function getSavedChords(): Promise<SavedChordResponse[]> {
  const response = await api.get<SavedChordResponse[]>("/saved-chords/");
  return response.data;
}

export async function saveChord(chordId: number) {
  const response = await api.post("/saved-chords/", { id: chordId });
  return response.data;
}

// Progressions

// Get all progressions for the current user
export async function getProgressions() {
  const response = await api.get("/progressions/");
  return response.data;
}

// Progression chords

// Get all chords for a specific progression
export async function getProgressionChords(progressionId: number) {
  const response = await api.get(`/progression-chords/?progression_id=${progressionId}`);
  return response.data;
}
