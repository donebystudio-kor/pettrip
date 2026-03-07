"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface Props {
  contentId: string;
}

export default function CardFavoriteButton({ contentId }: Props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(contentId));
  }, [contentId]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFav(toggleFavorite(contentId));
      }}
      className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110"
      aria-label={fav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      <span className="text-sm">{fav ? "❤️" : "🤍"}</span>
    </button>
  );
}
