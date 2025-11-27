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
const quickCategories = ["ChatGPT Bot", "AI Writer", "AI Templates", "Data Models", "Prompt Library"];

const HeroSection: React.FC<HeroSectionProps> = ({ heroBg }) => {
  const background = heroBg || PlaceHolderImages.find((p) => p.id === "hero-background");

  const [searchTerm, setSearchTerm] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);

  const [imgLoaded, setImgLoaded] = useState(false);

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
    <section className="w-full  flex flex-col items-center justify-center text-center px-4 relative">

      {/* Content */}
      <div className="relative z-10 max-w-3xl pb-24 pt-32"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Explore the World <br />
          of <span className="text-orange-500">{typedWord}</span>
          <span className="animate-blink">|</span>
        </h1>

        {/* Search */}
        <div className="mt-8 relative">
          <Input
            type="text"
            placeholder="Search AI models, prompts, datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-6 pr-12 text-lg focus:shadow-none  rounded-lg border border-gray-700 placeholder-gray-300 focus:border-orange-500 focus:ring-0 dark:bg-gray-700/50"
          />


          <Icons.Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

        </div>


        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {quickCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchTerm(cat)}
              className="px-3 py-1 text-sm border border-1 border-gray-700 rounded-lg  dark:bg-transparent dark:hover:bg-[#3c1511] hover:border-orange-500 transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[120vw] blur-3xl rounded-full"
        style={{
          background: "var(--bg-gradient)",
        }}
      />


      <style jsx>{`
    .animate-blink {
      animation: blink 1s step-start infinite;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
  `}</style>
    </section >

  );
};

export default HeroSection;