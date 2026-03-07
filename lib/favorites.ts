const STORAGE_KEY = "pettrip-favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(contentId: string): boolean {
  return getFavorites().includes(contentId);
}

export function toggleFavorite(contentId: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(contentId);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.unshift(contentId);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  return idx < 0; // true if added
}
