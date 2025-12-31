"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

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

const quickCategories = [
  "ChatGPT Bot",
  "AI Writer",
  "AI Templates",
  "Data Models",
  "Prompt Library",
];

const HeroSection: React.FC<HeroSectionProps> = ({ heroBg }) => {
  const router = useRouter();

  const background =
    heroBg || PlaceHolderImages.find((p) => p.id === "hero-background");

  const [searchTerm, setSearchTerm] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);

  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // SEARCH HANDLER - Your original logic preserved
  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return;

    // Your perfect hard-coded routes (unchanged)
    if (term === "chatgpt bot") router.push("/chatbot");
    else if (term === "ai writer") router.push("/chatbot");
    else if (term === "ai templates") router.push("/products");
    else if (term === "data models") router.push("/categories");
    else if (term === "prompt library") router.push("/chatbot");
    else {
      // FIXED: Manual search - safely encoded and goes to products with search query
      router.push(`/products?search=${encodeURIComponent(term)}`);
    }
  };

  // ENTER PRESS SEARCH
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Quick category buttons - now consistent with search behavior
  const handleQuickCategory = (category: string) => {
    const term = category.toLowerCase();
    setSearchTerm(category); // Optional: fills the input

    // Match your hard-coded logic
    if (term === "chatgpt bot") router.push("/chatbot");
    else if (term === "ai writer") router.push("/chatbot");
    else if (term === "ai templates") router.push("/products");
    else if (term === "data models") router.push("/categories");
    else if (term === "prompt library") router.push("/chatbot");
    else {
      router.push(`/products?search=${encodeURIComponent(term)}`);
    }
  };

  // Typing Animation
  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];
    let charIndex = forward ? 0 : currentWord.length;

    const type = () => {
      if (forward) {
        if (charIndex <= currentWord.length) {
          setTypedWord(currentWord.slice(0, charIndex));
          charIndex++;
          if (charIndex > currentWord.length) {
            typingRef.current = setTimeout(() => setForward(false), 1500);
          } else {
            typingRef.current = setTimeout(type, 120);
          }
        }
      } else {
        if (charIndex >= 0) {
          setTypedWord(currentWord.slice(0, charIndex));
          charIndex--;
          if (charIndex < 0) {
            setForward(true);
            setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
          } else {
            typingRef.current = setTimeout(type, 80);
          }
        }
      }
    };

    typingRef.current = setTimeout(type, forward ? 120 : 80);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentWordIndex, forward]);

  return (
    <section className="w-full flex flex-col items-center justify-center text-center px-4 relative">
      <div className="relative z-10 max-w-3xl pb-24 pt-32">
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
            onKeyDown={handleKeyPress}
            className="w-full py-6 pr-12 text-lg rounded-lg border border-gray-700 placeholder-gray-300 focus:border-orange-500"
          />
          <Icons.Search
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors"
          />
        </div>

        {/* Quick Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {quickCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleQuickCategory(cat)}
              className="px-4 py-2 text-sm font-medium border border-gray-700 rounded-lg hover:border-orange-500 hover:bg-orange-500/10 transition-all"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;