"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Clock, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface PoemHistory {
  id: string;
  poem: string;
  mood: string;
  style: string;
  timestamp: number;
  isFavorite: boolean;
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: PoemHistory[];
  onSelectPoem: (poem: PoemHistory) => void;
  onDeletePoem: (id: string) => void;
  onClearHistory: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

const HistoryPanel = ({
  isOpen,
  onClose,
  history,
  onSelectPoem,
  onDeletePoem,
  onClearHistory,
  showFavoritesOnly,
  onToggleFavorites,
}: HistoryPanelProps) => {
  const filteredHistory = showFavoritesOnly
    ? history.filter((p) => p.isFavorite)
    : history;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-950/95 to-indigo-950/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden border-l border-white/10"
          >
            <div className="h-full flex flex-col">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    {showFavoritesOnly ? "Favorites" : "History"}
                  </CardTitle>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-white"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={onToggleFavorites}
                    variant={showFavoritesOnly ? "default" : "outline"}
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Favorites
                  </Button>
                  <Button
                    onClick={onClearHistory}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    disabled={filteredHistory.length === 0}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
              </CardHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Clock className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-center">
                      {showFavoritesOnly
                        ? "No favorite poems yet"
                        : "No poems in history"}
                    </p>
                  </div>
                ) : (
                  filteredHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border-white/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div
                              className="flex-1"
                              onClick={() => onSelectPoem(item)}
                            >
                              <p className="text-xs text-slate-400 mb-1">
                                {item.mood} • {item.style}
                              </p>
                              <p
                                className="text-sm text-white line-clamp-3"
                                style={{
                                  fontFamily: "Noto Nastaliq Urdu, serif",
                                  direction: "rtl",
                                }}
                              >
                                {item.poem}
                              </p>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeletePoem(item.id);
                              }}
                              variant="ghost"
                              size="icon"
                              className="text-slate-500 hover:text-red-400 h-8 w-8"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
