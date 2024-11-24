"use client";

import { useState } from "react";
import { Sparkles, Copy, Share2 } from "lucide-react";

export default function PoetryPage() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [poetryStyle, setPoetryStyle] = useState(null);
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const moods = [
    { 
      label: "Khush (Happy)", 
      emoji: "✨",
      image: "/api/placeholder/800/600",
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      label: "Udaas (Sad)", 
      emoji: "🌧️",
      image: "/api/placeholder/800/600",
      gradient: "from-blue-400 to-indigo-500"
    },
    { 
      label: "Pur Sukoon (Calm)", 
      emoji: "🌊",
      image: "/api/placeholder/800/600",
      gradient: "from-teal-400 to-emerald-500"
    },
    { 
      label: "Gussa (Angry)", 
      emoji: "⚡",
      image: "/api/placeholder/800/600",
      gradient: "from-red-400 to-rose-500"
    },
    { 
      label: "Pyaar (Love)", 
      emoji: "💝",
      image: "/api/placeholder/800/600",
      gradient: "from-pink-400 to-purple-500"
    },
    { 
      label: "Nirvana (Blissful)", 
      emoji: "🌸",
      image: "/api/placeholder/800/600",
      gradient: "from-indigo-400 to-pink-600"
    }
  ];

  const poetryStyles = [
    { name: "Ghazal", description: "Classical form with rhyming couplets" },
    { name: "Nazm", description: "Free-flowing modern verse" },
    { name: "Haiku", description: "Brief three-line poems" }
  ];

  const fetchPoem = async () => {
    if (!mood || !poetryStyle) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/poetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, poetryStyle }),
      });
      const data = await response.json();
      if (response.ok) {
        setPoem(data.poem);
        setStep(3);
      } else {
        setError(data.error || "Failed to generate poem");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (poem) {
      try {
        await navigator.clipboard.writeText(poem); // Ensure we use await for async clipboard operation
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy text: ", error);
        setError("Failed to copy text.");
      }
    }
  };

  const renderMoodSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {moods.map((moodOption) => (
        <button
          key={moodOption.label}
          onClick={() => {
            setMood(moodOption.label);
            setStep(2);
          }}
          className={`group relative overflow-hidden rounded-3xl h-72 w-full transition-all duration-500 hover:scale-105
            bg-gradient-to-br ${moodOption.gradient} p-0.5`}
        >
          <div className="absolute inset-0.5 bg-black rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-opacity-60 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-5xl mb-4">{moodOption.emoji}</span>
              <h3 className="text-3xl font-bold text-white mb-2">{moodOption.label}</h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderPoetryStyleSelection = () => (
    <div className="w-full max-w-4xl space-y-6">
      {poetryStyles.map((style) => (
        <button
          key={style.name}
          onClick={() => {
            setPoetryStyle(style.name);
            fetchPoem();
          }}
          className="w-full p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl hover:bg-opacity-30 transition-all duration-300 group text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">{style.name}</h3>
              <p className="text-gray-300 text-lg">{style.description}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            Poetry Generator
          </h1>
          <p className="text-gray-300 text-xl">Transform your emotions into verses with ease</p>
        </div>

        {step === 1 && renderMoodSelection()}
        {step === 2 && renderPoetryStyleSelection()}

        {step === 3 && poem && (
          <div className="w-full max-w-3xl">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold text-white">Your Poem</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Copy className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(poem)}`)}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
                
                <p className="text-xl leading-relaxed text-gray-100 whitespace-pre-line text-center">
                  {poem}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/20 text-red-200 rounded-lg max-w-md text-center">
            {error}
          </div>
        )}

        {copied && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg">
            Poem copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
