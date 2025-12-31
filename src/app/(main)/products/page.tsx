"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
import { useSearchParams } from "next/navigation"; // ← Added this import

const dynamicWords = ["Templates", "AI Bots", "Datasets", "Models", "Prompts"];

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  features: string[];
  price?: number;
  rating?: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ExplorePage() {
  const [typedWord, setTypedWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // ← NEW: Read search query from URL (Next.js App Router)
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  useEffect(() => {
    if (urlSearchQuery && urlSearchQuery.trim() !== "") {
      setSearchQuery(urlSearchQuery.trim());
    }
  }, [urlSearchQuery]);

  // Typing Animation Effect
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
        setAllProducts(response.data);
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

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.category ? selectedCategories.includes(p.category) : false
      );
    }

    // Price filter
    if (priceMin || priceMax) {
      filtered = filtered.filter((p) => {
        const price = p.price ?? 0;
        const min = priceMin ? parseFloat(priceMin) : -Infinity;
        const max = priceMax ? parseFloat(priceMax) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) => {
        const rating = p.rating ?? 0;
        return selectedRatings.some((r) => rating >= r);
      });
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "popularity":
          return 0;
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "price-asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price-desc":
          return (b.price ?? 0) - (a.price ?? 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [allProducts, searchQuery, selectedCategories, priceMin, priceMax, selectedRatings, sortBy]);

  // Update displayed products
  useEffect(() => {
    setProducts(filteredAndSortedProducts);
  }, [filteredAndSortedProducts]);

  // Handlers
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryName]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== categoryName));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings((prev) => [...prev, rating]);
    } else {
      setSelectedRatings((prev) => prev.filter((r) => r !== rating));
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceMin("");
    setPriceMax("");
    setSelectedRatings([]);
    setSortBy("newest");
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <Checkbox
                      id={`cat-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                    />
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
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Rating</h3>
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3 mb-3">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                    />
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
              <Button variant="ghost" className="w-full" onClick={clearAllFilters}>
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

            <Select value={sortBy} onValueChange={setSortBy}>
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
              <p className="text-2xl mb-4">No products found.</p>
              <p>Try adjusting your filters.</p>
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