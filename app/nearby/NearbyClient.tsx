"use client";
import { useState } from "react";
import { PetItem } from "@/types/pet";
import PetCard from "@/components/PetCard";

const RADIUS_OPTIONS = [
  { label: "5km", value: 5000 },
  { label: "10km", value: 10000 },
  { label: "20km", value: 20000 },
];

export default function NearbyClient() {
  const [items, setItems] = useState<PetItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(10000);
  const [searched, setSearched] = useState(false);

  const search = async (r?: number) => {
    const selectedRadius = r ?? radius;
    setLoading(true);
    setError(null);

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: false,
        })
      );

      const { latitude: lat, longitude: lng } = pos.coords;
      const res = await fetch(
        `/api/nearby?lat=${lat}&lng=${lng}&radius=${selectedRadius}`
      );
      const data = await res.json();
      setItems(data.items ?? []);
      setSearched(true);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        setError("위치 접근 권한이 필요해요. 브라우저 설정에서 위치 권한을 허용해주세요.");
      } else {
        setError("여행지를 불러오는 데 실패했어요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 반경 선택 + 검색 버튼 */}
      <div className="bg-white border border-[#FFE5D5] rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-[#555]">검색 반경</span>
          <div className="flex gap-2">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setRadius(opt.value);
                  if (searched) search(opt.value);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  radius === opt.value
                    ? "bg-[#4ECDC4] text-white border-[#4ECDC4] shadow-sm"
                    : "bg-white text-[#666] border-[#E0F7F5] hover:border-[#4ECDC4]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => search()}
            disabled={loading}
            className="ml-auto bg-[#FF6B35] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#e55a25] transition-colors disabled:opacity-60 shadow-sm"
          >
            {loading ? "검색 중..." : "📍 내 위치로 검색"}
          </button>
        </div>
      </div>

      {/* 에러 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center text-red-600 text-sm mb-6">
          {error}
        </div>
      )}

      {/* 빈 상태 */}
      {!searched && !loading && (
        <div className="text-center py-20 text-[#aaa]">
          <div className="text-6xl mb-4">📍</div>
          <p className="text-lg font-medium text-[#888]">
            내 위치로 검색 버튼을 눌러주세요
          </p>
          <p className="text-sm mt-2">반경 {(radius / 1000).toFixed(0)}km 내 반려동물 여행지를 찾아드려요</p>
        </div>
      )}

      {/* 결과 없음 */}
      {searched && !loading && items.length === 0 && !error && (
        <div className="text-center py-20 text-[#aaa]">
          <div className="text-5xl mb-4">🐾</div>
          <p className="text-lg font-medium text-[#888]">주변에 여행지가 없어요</p>
          <p className="text-sm mt-2">반경을 넓혀서 다시 검색해보세요</p>
        </div>
      )}

      {/* 결과 */}
      {items.length > 0 && (
        <>
          <p className="text-sm text-[#888] mb-4 font-medium">{items.length}개 여행지 발견</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <PetCard key={item.contentid} item={item} showDist />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
