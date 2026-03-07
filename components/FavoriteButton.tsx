"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface Props {
  contentId: string;
}

export default function FavoriteButton({ contentId }: Props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(contentId));
  }, [contentId]);

  const handleToggle = () => {
    const result = toggleFavorite(contentId);
    setFav(result);
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
        fav
          ? "bg-red-50 border-red-200 text-red-500"
          : "bg-white border-[#FFE5D5] text-[#ccc] hover:text-red-400 hover:border-red-200"
      }`}
      aria-label={fav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      <span className="text-lg">{fav ? "❤️" : "🤍"}</span>
    </button>
  );
}
