"use client";

import { useState } from "react";

export default function PoetryPage() {
  const [mood, setMood] = useState("I am Happy Today");
  const [poem, setPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPoem = async () => {
    setLoading(true);
    setError(null);
    setPoem(null);

    try {
      const response = await fetch("/api/poetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await response.json();
      if (response.ok) {
        setPoem(data.poem);
      } else {
        setError(data.error || "Failed to generate the poem.");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Mood Poetry Generator
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your mood, and let us craft a poem that speaks to your soul.
        </p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your mood (e.g., happy, sad)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={fetchPoem}
          disabled={loading || !mood.trim()}
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {loading ? "Generating..." : "Generate Poem"}
        </button>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {poem && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow flex flex-col items-center">
            <h2 className="text-xl font-black mb-2">Your Poem:</h2>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed font-[NotoNastaliqUrdu] font-bold text-2xl text-center">
              {poem}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
