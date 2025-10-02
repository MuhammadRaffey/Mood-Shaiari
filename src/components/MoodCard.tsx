"use client";

import { motion } from "framer-motion";

interface MoodCardProps {
  label: string;
  emoji: string;
  gradient: string;
  onClick: () => void;
  index: number;
}

const MoodCard = ({
  label,
  emoji,
  gradient,
  onClick,
  index,
}: MoodCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl h-72 w-full transition-all duration-500
        bg-gradient-to-br ${gradient} p-1`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />

      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.span
          className="text-6xl mb-4"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {emoji}
        </motion.span>
        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {label}
        </h3>
      </div>

      {/* Border glow effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.3)",
        }}
      />
    </motion.button>
  );
};

export default MoodCard;
