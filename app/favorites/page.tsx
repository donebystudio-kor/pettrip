import { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "즐겨찾기",
  description: "저장한 반려동물 동반 여행지 목록을 확인하세요.",
};

export default function FavoritesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2D2D2D]">❤️ 즐겨찾기</h1>
        <p className="text-sm text-[#888] mt-1">저장한 여행지를 모아볼 수 있어요</p>
      </div>
      <FavoritesClient />
    </div>
  );
}
