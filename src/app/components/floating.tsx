// components/FloatingElements.js
import { Feather, Stars, Music } from 'lucide-react';

const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      >
        {i % 3 === 0 ? (
          <Feather className="w-6 h-6 text-purple-300/40" />
        ) : i % 3 === 1 ? (
          <Stars className="w-4 h-4 text-yellow-300/40" />
        ) : (
          <Music className="w-5 h-5 text-pink-300/40" />
        )}
      </div>
    ))}
  </div>
);

export default FloatingElements;
