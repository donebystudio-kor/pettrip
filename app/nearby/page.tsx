import { Metadata } from "next";
import NearbyClient from "./NearbyClient";

export const metadata: Metadata = {
  title: "내 주변 반려동물 여행지",
  description: "GPS 위치를 기반으로 가까운 반려동물 동반 가능 여행지, 숙소, 음식점을 찾아드려요.",
};

export default function NearbyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2D2D2D]">📍 내 주변 반려동물 여행지</h1>
        <p className="text-sm text-[#888] mt-1">현재 위치 근처의 반려동물 동반 가능 장소를 찾아드릴게요</p>
      </div>
      <NearbyClient />
    </div>
  );
}
