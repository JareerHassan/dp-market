"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface HeroBg {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
}

interface HeroSectionProps {
  heroBg?: HeroBg;
}

const dynamicWords = ["Templates", "AI Bots", "Datasets", "Models", "Prompts"];
const quickCategories = ["ChatGPT Bot", "AI Writer",  "AI Templates", "Data Models", "Prompt Library"];

const HeroSection: React.FC<HeroSectionProps> = ({ heroBg }) => {
  const background = heroBg || PlaceHolderImages.find((p) => p.id === "hero-background");

  const [searchTerm, setSearchTerm] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);

  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // Typing effect
  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];
    let charIndex = forward ? 0 : currentWord.length;

    const type = () => {
      if (forward) {
        if (charIndex <= currentWord.length) {
          setTypedWord(currentWord.slice(0, charIndex));
          charIndex++;
          if (charIndex > currentWord.length) {
            typingRef.current = setTimeout(() => setForward(false), 1000);
          } else {
            typingRef.current = setTimeout(type, 150);
          }
        }
      } else {
        if (charIndex >= 0) {
          setTypedWord(currentWord.slice(0, charIndex));
          charIndex--;
          if (charIndex < 0) {
            setForward(true);
            setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
          }
          typingRef.current = setTimeout(type, 100);
        }
      }
    };

    type();
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentWordIndex, forward]);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background */}
      {background && (
        <Image
          src={background.imageUrl}
          alt={background.description}
          fill
          className="object-cover brightness-90 contrast-110 scale-105 animate-zoomSlow"
          data-ai-hint={background.imageHint}
          priority
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Explore the World <br />
          of <span className="text-orange-500">{typedWord}</span>
          <span className="animate-blink">|</span>
        </h1>

        {/* Search Input */}
        <div className="mt-10 relative w-full max-w-2xl">
          <Input
            type="text"
            placeholder="Search AI models, prompts, datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full !py-5 !pl-14 text-lg rounded-2xl border border-purple-400/30 bg-purple-900/40 
            backdrop-blur-md placeholder:text-purple-200/60 text-white 
            focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 transition-all"
          />
          <Icons.Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-purple-300/80" />
        </div>

        {/* Quick Categories / Badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {quickCategories.map((cat, i) => (
            <span
              key={i}
              onClick={() => setSearchTerm(cat)}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gray-800 text-gray-200 cursor-pointer hover:bg-gray-700 transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Extra Visual Flair */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] rounded-full bg-purple-600/10 blur-3xl animate-pulseSlow" />

      {/* Animations */}
      <style jsx>{`
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .animate-zoomSlow {
          animation: zoomSlow 15s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 8s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;