"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface StyleSelectorProps {
  styles: Array<{
    name: string;
    description: string;
    urduName: string;
  }>;
  onSelectStyle: (style: string) => void;
}

const StyleSelector = ({ styles, onSelectStyle }: StyleSelectorProps) => {
  return (
    <div className="w-full max-w-4xl space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        شاعری کی قسم منتخب کریں
      </motion.h2>

      {styles.map((style, index) => (
        <motion.button
          key={style.name}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, x: 10 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectStyle(style.name)}
          className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="text-left flex-1">
              <h3 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                <span className="text-indigo-400">{style.urduName}</span>
                <span className="text-xl text-slate-500">•</span>
                <span className="text-2xl">{style.name}</span>
              </h3>
              <p className="text-slate-300 text-lg">{style.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-8 h-8 text-indigo-400" />
              </motion.div>
              <Sparkles className="w-8 h-8 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default StyleSelector;
