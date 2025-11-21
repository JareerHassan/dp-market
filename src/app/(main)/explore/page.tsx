"use client"

import React, { useState, useEffect, useRef } from "react";

import { products, categories } from '@/lib/dummy-data';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
const dynamicWords = ["Templates", "AI Bots", "Datasets", "Models", "Prompts"];

export default function ExplorePage() {

   const [typedWord, setTypedWord] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [forward, setForward] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
  
    const typingRef = useRef<NodeJS.Timeout | null>(null);
  
    // Typing + wait + untyping effect
    useEffect(() => {
      const currentWord = dynamicWords[currentWordIndex];
      let charIndex = forward ? 0 : currentWord.length;
  
      const type = () => {
        if (forward) {
          if (charIndex <= currentWord.length) {
            setTypedWord(currentWord.slice(0, charIndex));
            charIndex++;
            if (charIndex > currentWord.length) {
              // Wait before untyping
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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
         <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Explore the World <br />
          of <span className="text-orange-500">{typedWord}</span>
          <span className="animate-blink">|</span>
        </h1>
        <div className="mt-8 max-w-2xl mx-auto flex items-center relative">
          <Input
            type="search"
            placeholder="Search by name, tag, or description..."
            className="w-full !py-6 !pl-12 !pr-32 text-lg"
          />
          <Icons.Search className="absolute left-4 h-6 w-6 text-primary/70" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <h2 className="text-2xl font-bold">Filters</h2>
            
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Category</h3>
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${category.id}`} />
                  <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal text-foreground/80 hover:text-accent cursor-pointer">{category.name}</Label>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <div className="flex gap-2">
                <Input type="number" placeholder="Min" className="text-sm" />
                <Input type="number" placeholder="Max" className="text-sm" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Rating</h3>
               {[4, 3, 2, 1].map(rating => (
                 <div key={rating} className="flex items-center space-x-2">
                   <Checkbox id={`rating-${rating}`} />
                   <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                     {Array(5).fill(0).map((_, i) => (
                       <Icons.Star key={i} className={`w-4 h-4 ${i < rating ? 'text-primary' : 'text-muted-foreground/50'}`} />
                     ))}
                     <span className="text-sm text-foreground/80">& Up</span>
                   </Label>
                 </div>
               ))}
            </div>

            <Button variant="ghost" className="w-full border">Apply Filters</Button>

          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">{products.length} products found</p>
            <Select>
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
              <Button variant="outline">Load More</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
