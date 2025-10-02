"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import MoodCard from "@/components/MoodCard";
import StyleSelector from "@/components/StyleSelector";
import PoemDisplay from "@/components/PoemDisplay";
import LoadingAnimation from "@/components/LoadingAnimation";
import HistoryPanel, { PoemHistory } from "@/components/HistoryPanel";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { markdownToPlainText } from "@/lib/markdown";

export default function PoetryPage() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string | null>(null);
  const [poetryStyle, setPoetryStyle] = useState<string | null>(null);
  const [poem, setPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<PoemHistory[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPoemId, setCurrentPoemId] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("poemHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("poemHistory", JSON.stringify(history));
    }
  }, [history]);

  const moods = [
    {
      label: "Khush (Happy)",
      emoji: "✨",
      gradient: "from-amber-400 via-yellow-400 to-orange-500",
    },
    {
      label: "Udaas (Sad)",
      emoji: "🌧️",
      gradient: "from-slate-500 via-blue-500 to-indigo-600",
    },
    {
      label: "Pur Sukoon (Calm)",
      emoji: "🌊",
      gradient: "from-cyan-400 via-teal-500 to-emerald-600",
    },
    {
      label: "Gussa (Angry)",
      emoji: "⚡",
      gradient: "from-orange-500 via-red-500 to-rose-600",
    },
    {
      label: "Pyaar (Love)",
      emoji: "💝",
      gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    },
    {
      label: "Nirvana (Blissful)",
      emoji: "🌸",
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
    },
  ];

  const poetryStyles = [
    {
      name: "Ghazal",
      urduName: "غزل",
      description:
        "Classical form with rhyming couplets expressing love and loss",
    },
    {
      name: "Nazm",
      urduName: "نظم",
      description: "Free-flowing modern verse with structured theme",
    },
    {
      name: "Haiku",
      urduName: "ہائیکو",
      description: "Brief three-line poems capturing a moment",
    },
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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to generate poem");
        return;
      }

      const data = await response.json();
      const newPoemId = Date.now().toString();
      setPoem(data.poem);
      setCurrentPoemId(newPoemId);
      setStep(3);

      // Add to history
      const newHistoryItem: PoemHistory = {
        id: newPoemId,
        poem: data.poem,
        mood: mood,
        style: poetryStyle,
        timestamp: Date.now(),
        isFavorite: false,
      };
      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`An error occurred: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!poem) return;

    try {
      const plainText = markdownToPlainText(poem);
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setError("Failed to copy text.");
    }
  };

  const handleShare = () => {
    if (!poem) return;

    const plainText = markdownToPlainText(poem);

    if (navigator.share) {
      navigator
        .share({
          title: "Mood Shayari",
          text: plainText,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          plainText
        )}`,
        "_blank"
      );
    }
  };

  const handleFavorite = () => {
    if (!currentPoemId) return;

    setHistory((prev) =>
      prev.map((item) =>
        item.id === currentPoemId
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  const handleRegenerate = () => {
    setPoem(null);
    setCurrentPoemId(null);
    fetchPoem();
  };

  const handleReset = () => {
    setStep(1);
    setMood(null);
    setPoetryStyle(null);
    setPoem(null);
    setCurrentPoemId(null);
    setError(null);
  };

  const handleSelectFromHistory = (item: PoemHistory) => {
    setMood(item.mood);
    setPoetryStyle(item.style);
    setPoem(item.poem);
    setCurrentPoemId(item.id);
    setStep(3);
    setIsHistoryOpen(false);
  };

  const handleDeleteFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your history?")) {
      setHistory([]);
      localStorage.removeItem("poemHistory");
    }
  };

  const isFavorited = currentPoemId
    ? history.find((item) => item.id === currentPoemId)?.isFavorite || false
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]" />

      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        historyCount={history.length}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectPoem={handleSelectFromHistory}
        onDeletePoem={handleDeleteFromHistory}
        onClearHistory={handleClearHistory}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8 pt-32">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-16 space-y-4">
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500"
                >
                  آپ کا موڈ کیا ہے؟
                </motion.h1>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-slate-300 text-2xl"
                >
                  Choose your mood to create beautiful poetry
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {moods.map((moodOption, index) => (
                  <MoodCard
                    key={moodOption.label}
                    {...moodOption}
                    index={index}
                    onClick={() => {
                      setMood(moodOption.label);
                      setStep(2);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && !loading && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="mb-8">
                <Button
                  onClick={() => setStep(1)}
                  variant="glass"
                  size="lg"
                  className="gap-2"
                >
                  ← Back to Moods
                </Button>
              </div>

              <StyleSelector
                styles={poetryStyles}
                onSelectStyle={(style) => {
                  setPoetryStyle(style);
                  fetchPoem();
                }}
              />
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingAnimation />
            </motion.div>
          )}

          {step === 3 && poem && !loading && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <PoemDisplay
                poem={poem}
                mood={mood || ""}
                style={poetryStyle || ""}
                onCopy={handleCopy}
                onShare={handleShare}
                onFavorite={handleFavorite}
                onRegenerate={handleRegenerate}
                isFavorited={isFavorited}
              />

              <div className="mt-8">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  Create Another Poem
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500/20 backdrop-blur-lg text-red-200 p-6 rounded-2xl max-w-md text-center border border-red-500/30"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500/90 backdrop-blur-lg text-white p-6 rounded-2xl flex items-center gap-3 shadow-2xl"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Poem copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
