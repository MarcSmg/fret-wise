export interface SavedChordResponse {
  id: number;
  user: number;
  symbol: string;
  voicing: unknown;
  date_saved: string;
}

export interface CreateSavedChordRequest {
  symbol: string;
  voicing: unknown;
}
