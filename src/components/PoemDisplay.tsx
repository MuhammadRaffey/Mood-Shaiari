"use client";

import { motion } from "framer-motion";
import { Copy, Share2, Heart, Download, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { markdownToHtml, markdownToPlainText } from "@/lib/markdown";

interface PoemDisplayProps {
  poem: string;
  mood: string;
  style: string;
  onCopy: () => void;
  onShare: () => void;
  onFavorite: () => void;
  onRegenerate: () => void;
  isFavorited: boolean;
}

const PoemDisplay = ({
  poem,
  mood,
  style,
  onCopy,
  onShare,
  onFavorite,
  onRegenerate,
  isFavorited,
}: PoemDisplayProps) => {
  const handleDownload = () => {
    const plainText = markdownToPlainText(poem);
    const element = document.createElement("a");
    const file = new Blob([plainText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `shayari-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border-white/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-4xl mb-2">آپ کی شاعری</CardTitle>
              <p className="text-sm text-slate-300">
                Mood: {mood} | Style: {style}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onFavorite}
              className={`p-3 rounded-full transition-colors ${
                isFavorited
                  ? "bg-red-500 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`}
              />
            </motion.button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div
              className="text-2xl leading-relaxed text-slate-100 text-center prose-custom"
              style={{
                fontFamily: "Noto Nastaliq Urdu, serif",
                direction: "rtl",
                unicodeBidi: "embed",
              }}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(poem) }}
            />
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={onCopy}
              variant="glass"
              size="lg"
              className="gap-2"
            >
              <Copy className="w-5 h-5" />
              Copy
            </Button>

            <Button
              onClick={onShare}
              variant="glass"
              size="lg"
              className="gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share
            </Button>

            <Button
              onClick={handleDownload}
              variant="glass"
              size="lg"
              className="gap-2"
            >
              <Download className="w-5 h-5" />
              Download
            </Button>

            <Button
              onClick={onRegenerate}
              variant="default"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PoemDisplay;
