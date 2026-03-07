"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";

interface FavItem {
  contentid: string;
  title: string;
  addr1?: string;
  firstimage?: string;
}

export default function FavoritesClient() {
  const [items, setItems] = useState<FavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = getFavorites();
    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    // 각 즐겨찾기 아이템의 기본 정보를 가져옴
    Promise.all(
      ids.map(async (id) => {
        try {
          const res = await fetch(`/api/detail?id=${id}`);
          if (!res.ok) return null;
          return await res.json();
        } catch {
          return null;
        }
      })
    ).then((results) => {
      setItems(results.filter(Boolean) as FavItem[]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4 animate-pulse">🐾</div>
        <p className="text-[#888] text-sm">불러오는 중...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-[#aaa]">
        <div className="text-5xl mb-4">❤️</div>
        <p className="text-lg font-medium text-[#888]">저장한 여행지가 없어요</p>
        <p className="text-sm mt-2 mb-6">마음에 드는 여행지를 즐겨찾기에 추가해보세요</p>
        <Link
          href="/"
          className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#e55a25] transition-colors"
        >
          여행지 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-[#888] mb-4">{items.length}개 저장됨</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.contentid}
            href={`/${item.contentid}`}
            className="flex gap-4 bg-white border border-[#FFE5D5] rounded-2xl p-4 hover:border-[#FF6B35] hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF0E8] flex-shrink-0">
              {item.firstimage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.firstimage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">
                  🐾
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 py-1">
              <h3 className="font-bold text-sm text-[#2D2D2D] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                {item.title}
              </h3>
              {item.addr1 && (
                <p className="text-xs text-[#888] mt-1 line-clamp-1">
                  📍 {item.addr1}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
