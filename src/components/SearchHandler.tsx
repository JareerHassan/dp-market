// app/components/SearchHandler.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchHandlerProps {
  onSearchQueryChange: (query: string) => void;
}

export default function SearchHandler({ onSearchQueryChange }: SearchHandlerProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (search) {
      onSearchQueryChange(search.trim());
    } else {
      onSearchQueryChange(""); // Clear if no search param
    }
  }, [search, onSearchQueryChange]);

  return null; // This component renders nothing
}