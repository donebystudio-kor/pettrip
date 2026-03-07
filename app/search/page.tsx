import { Metadata } from "next";
import { searchKeyword, getAreaBasedList } from "@/lib/api";
import PetCard from "@/components/PetCard";
import SearchClient from "./SearchClient";
import { AREA_CODES } from "@/types/pet";

interface Props {
  searchParams: Promise<{ keyword?: string; area?: string; type?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { keyword, area } = await searchParams;
  const areaName = AREA_CODES.find((a) => a.code === area)?.name;

  let title = "반려동물 동반 여행지 검색";
  if (keyword) title = `"${keyword}" 검색 결과`;
  else if (areaName) title = `${areaName} 반려동물 동반 여행지`;

  return {
    title,
    description: `${title} - 강아지, 고양이와 함께할 수 있는 반려동물 동반 여행지를 찾아보세요.`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { keyword, area, type } = await searchParams;

  let items = [];
  if (keyword) {
    items = await searchKeyword(keyword);
  } else {
    items = await getAreaBasedList(area, undefined, type);
  }

  const areaName = AREA_CODES.find((a) => a.code === area)?.name;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2D2D2D]">
          {keyword
            ? `"${keyword}" 검색 결과`
            : areaName
            ? `${areaName} 반려동물 여행지`
            : "반려동물 동반 여행지 검색"}
        </h1>
        {items.length > 0 && (
          <p className="text-sm text-[#888] mt-1">{items.length}개 여행지</p>
        )}
      </div>

      {/* 필터 (클라이언트) */}
      <SearchClient
        initialKeyword={keyword ?? ""}
        initialArea={area ?? ""}
        initialType={type ?? ""}
      />

      {/* 결과 */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {items.map((item) => (
            <PetCard key={item.contentid} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#aaa]">
          <div className="text-5xl mb-4">🐾</div>
          <p className="text-lg font-medium text-[#888]">
            {keyword ? `"${keyword}"에 해당하는 여행지가 없어요` : "여행지를 찾지 못했어요"}
          </p>
          <p className="text-sm mt-2">다른 키워드나 지역으로 검색해보세요</p>
        </div>
      )}
    </div>
  );
}
