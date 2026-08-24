// Chords
export interface ApiSavedChordResponse {
  id: number;
  user: number;
  symbol: string;
  voicing: unknown;
  dateSaved: string;
}

export interface ApiCreateSavedChordRequest {
  symbol: string;
  voicing: unknown;
}