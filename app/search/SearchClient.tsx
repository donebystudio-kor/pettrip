"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import AreaFilter from "@/components/AreaFilter";

interface Props {
  initialKeyword: string;
  initialArea: string;
  initialType: string;
}

export default function SearchClient({ initialKeyword, initialArea, initialType }: Props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);

  const navigate = (params: { keyword?: string; area?: string; type?: string }) => {
    const merged = {
      keyword: params.keyword ?? keyword,
      area: params.area ?? initialArea,
      type: params.type ?? initialType,
    };
    const sp = new URLSearchParams();
    if (merged.keyword) sp.set("keyword", merged.keyword);
    if (merged.area) sp.set("area", merged.area);
    if (merged.type) sp.set("type", merged.type);
    router.push(`/search?${sp.toString()}`);
  };

  return (
    <div className="space-y-3">
      {/* 검색바 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ keyword, area: "", type: "" });
        }}
        className="flex items-center bg-white border border-[#FFE5D5] rounded-full px-5 py-3.5 gap-3 shadow-sm"
      >
        <span className="text-lg">🔍</span>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="여행지, 카페, 숙소 이름 검색..."
          className="flex-1 outline-none text-sm bg-transparent"
        />
        {keyword && (
          <button
            type="button"
            onClick={() => {
              setKeyword("");
              navigate({ keyword: "", area: initialArea, type: initialType });
            }}
            className="text-[#ccc] hover:text-[#999] text-lg leading-none"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="bg-[#FF6B35] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#e55a25] transition-colors"
        >
          검색
        </button>
      </form>

      {/* 지역 필터 */}
      <AreaFilter
        selected={initialArea}
        onChange={(code) => navigate({ area: code, keyword: "" })}
      />

      {/* 카테고리 필터 */}
      <CategoryFilter
        selected={initialType}
        onChange={(id) => navigate({ type: id })}
      />
    </div>
  );
}
