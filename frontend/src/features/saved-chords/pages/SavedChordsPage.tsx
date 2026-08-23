import { useEffect, useState } from "react";
import { chordApi } from "../../../api/chords";
import Heading from "../../../shared/ui/Heading";
import type { ApiSavedChordResponse } from "@/types/api";

function formatVoicing(voicing: unknown) {
  if (typeof voicing === "string") {
    return voicing;
  }

  return JSON.stringify(voicing);
}

export const SavedChordsPage = () => {
  const [savedChords, setSavedChords] = useState<ApiSavedChordResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSavedChords() {
      try {
        const chords = await chordApi.getAllSavedChords();

        if (isMounted) {
          setSavedChords(chords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load your saved chords.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSavedChords();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="min-h-full bg-ui-elevated px-5 py-6 pb-24 md:px-10 md:pb-10">
      <Heading>Saved chords</Heading>

      {isLoading && (
        <p className="text-content-muted">Loading saved chords...</p>
      )}

      {error && (
        <p className="rounded-xl bg-status-error-soft p-4 text-status-error">
          {error}
        </p>
      )}

      {!isLoading && !error && savedChords.length === 0 && (
        <p className="text-content-muted">
          You have not saved any chords yet.
        </p>
      )}

      {!isLoading && !error && savedChords.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedChords.map((chord) => (
            <li
              key={chord.id}
              className="rounded-2xl border border-stroke-subtle bg-ui-card p-5 shadow-detail-sm"
            >
              <h2 className="text-2xl font-bold text-content">{chord.symbol}</h2>
              <p className="mt-2 break-words font-mono text-sm text-content-muted">
                Voicing: {formatVoicing(chord.voicing)}
              </p>
              <time
                className="mt-4 block text-xs text-content-muted"
                dateTime={chord.dateSaved}
              >
                Saved {new Date(chord.dateSaved).toLocaleDateString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
