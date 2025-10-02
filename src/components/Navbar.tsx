"use client";

import { motion } from "framer-motion";
import { History, Home, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onOpenHistory: () => void;
  onReset: () => void;
  historyCount: number;
}

const Navbar = ({ onOpenHistory, onReset, historyCount }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl bg-black/30 border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={onReset}
        >
          <Sparkles className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">موڈ شاعری</h1>
            <p className="text-xs text-slate-400">Mood Shayari</p>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <Button
            onClick={onReset}
            variant="glass"
            size="default"
            className="gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </Button>

          <Button
            onClick={onOpenHistory}
            variant="glass"
            size="default"
            className="gap-2 relative"
          >
            <History className="w-5 h-5" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {historyCount > 9 ? "9+" : historyCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
