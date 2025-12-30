"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { categories } from "@/lib/dummy-data";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const dynamicWords = ["Templates", "AI Bots", "Datasets", "Models", "Prompts"];

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export default function ExplorePage() {
  const [typedWord, setTypedWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Typing Animation
  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];
    let charIndex = forward ? 0 : currentWord.length;

    const type = () => {
      if (forward) {
        if (charIndex < currentWord.length) {
          setTypedWord(currentWord.slice(0, charIndex + 1));
          charIndex++;
          typingRef.current = setTimeout(type, 150);
        } else {
          typingRef.current = setTimeout(() => setForward(false), 1500);
        }
      } else {
        if (charIndex > 0) {
          setTypedWord(currentWord.slice(0, charIndex - 1));
          charIndex--;
          typingRef.current = setTimeout(type, 100);
        } else {
          setForward(true);
          setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        }
      }
    };

    typingRef.current = setTimeout(type, forward ? 150 : 100);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentWordIndex, forward]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiProduct[]>(
          "https://marketplacebackend.oxmite.com/api/products"
        );
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Image URL Helper
  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath || imagePath.trim() === "") return "/placeholder.jpg";

    const cleanPath = imagePath.replace(/\\/g, "/").trim();
    if (!cleanPath || cleanPath === "/") return "/placeholder.jpg";

    const normalized = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;
    return `https://marketplacebackend.oxmite.com/${normalized}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Explore the World <br />
          of{" "}
          <span className="text-orange-500 inline-block min-w-[180px]">
            {typedWord}
          </span>
          <span className="animate-blink text-orange-500">|</span>
        </h1>

        <div className="mt-10 max-w-2xl mx-auto relative">
          <Input
            type="search"
            placeholder="Search by name, tag, or description..."
            className="w-full py-6 pl-12 pr-4 text-lg rounded-xl"
          />
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8 bg-card p-6 rounded-xl border">
            <h2 className="text-2xl font-bold">Filters</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Category</h3>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-3 mb-3">
                    <Checkbox id={`cat-${category.id}`} />
                    <Label
                      htmlFor={`cat-${category.id}`}
                      className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="flex gap-3">
                  <Input type="number" placeholder="Min" className="text-sm" />
                  <Input type="number" placeholder="Max" className="text-sm" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Rating</h3>
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3 mb-3">
                    <Checkbox id={`rating-${rating}`} />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="flex items-center gap-1 cursor-pointer text-sm"
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icons.Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-muted-foreground">& Up</span>
                    </Label>
                  </div>
                ))}
              </div>

              <Button variant="default" className="w-full">
                Apply Filters
              </Button>
              <Button variant="ghost" className="w-full">
                Clear All
              </Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">
              {loading
                ? "Loading products..."
                : error
                ? "Error loading products"
                : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
            </p>

            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading amazing products...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-red-500">
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-2xl mb-4">No products found yet.</p>
              <p>Be the first to add one!</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => {
                const imageUrl = getImageUrl(product.image);

                return (
                  <ProductCard
                    key={product._id}
                    product={{
                      id: product._id,
                      name: product.name,
                      description: product.description,
                      imageUrl,
                      features: product.features,
                      link: product.link,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Load More (for future pagination) */}
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}