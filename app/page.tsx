import { Metadata } from "next";
import Link from "next/link";
import { getAreaBasedList } from "@/lib/api";
import PetCard from "@/components/PetCard";
import HomeClient from "./HomeClient";
import { AREA_CODES, CONTENT_TYPE_LABELS } from "@/types/pet";
import { REGION_SLUGS, CATEGORY_SLUGS } from "@/constants/seo";

interface Props {
  searchParams: Promise<{ area?: string; type?: string }>;
}

const POPULAR_AREAS = [
  { code: "1", name: "서울", emoji: "🏙️", desc: "도심 속 펫 카페" },
  { code: "6", name: "부산", emoji: "🌊", desc: "바다와 함께" },
  { code: "39", name: "제주", emoji: "🌴", desc: "자연 속 힐링" },
  { code: "32", name: "강원", emoji: "⛰️", desc: "산과 계곡" },
  { code: "31", name: "경기", emoji: "🌳", desc: "가까운 나들이" },
  { code: "36", name: "경남", emoji: "🏖️", desc: "남해안 여행" },
];

const CATEGORY_ICONS = [
  { id: "12", label: "관광지", emoji: "🏕️" },
  { id: "32", label: "숙박", emoji: "🏨" },
  { id: "39", label: "음식점", emoji: "🍽️" },
  { id: "28", label: "레포츠", emoji: "🏃" },
  { id: "38", label: "쇼핑", emoji: "🛍️" },
  { id: "14", label: "문화시설", emoji: "🎭" },
  { id: "15", label: "축제·행사", emoji: "🎪" },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { area, type } = await searchParams;
  const areaName = AREA_CODES.find((a) => a.code === area)?.name;
  const typeName = type ? CONTENT_TYPE_LABELS[type] : undefined;

  let title = "네발여행 - 반려동물과 함께하는 여행";
  if (areaName && typeName) title = `${areaName} ${typeName} | 네발여행`;
  else if (areaName) title = `${areaName} 반려동물 동반 여행지 | 네발여행`;
  else if (typeName) title = `${typeName} | 네발여행`;

  return { title };
}

export default async function HomePage({ searchParams }: Props) {
  const { area, type } = await searchParams;
  const isFiltered = !!(area || type);

  const items = await getAreaBasedList(area, undefined, type, 40);

  const areaName = AREA_CODES.find((a) => a.code === area)?.name;
  const typeName = type ? CONTENT_TYPE_LABELS[type] : undefined;
  const heading = [areaName, typeName].filter(Boolean).join(" ") || "전국 반려동물 동반 여행지";

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "네발여행",
    url: "https://pettrip.vercel.app",
    description: "반려동물과 함께하는 여행지를 찾아보세요",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://pettrip.vercel.app/search?keyword={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      {!isFiltered && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      )}

      {/* 히어로 섹션 (필터 미적용 시에만 표시) */}
      {!isFiltered && (
        <section className="bg-gradient-to-b from-[#FFF0E8] to-[#FFF8F0] py-12 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#FF6B35] text-sm font-medium tracking-wider mb-3">🐾 네발여행</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#2D2D2D] mb-4 leading-tight">
              우리 강아지와<br />어디 갈까?
            </h1>
            <p className="text-[#888] text-sm md:text-base mb-8">
              반려동물과 함께할 수 있는 여행지를 찾아보세요
            </p>

            {/* 검색 바 */}
            <Link
              href="/search"
              className="inline-flex items-center gap-3 bg-white border border-[#FFE5D5] rounded-full px-6 py-4 shadow-md hover:shadow-lg transition-shadow w-full max-w-lg"
            >
              <span className="text-xl">🔍</span>
              <span className="text-[#aaa] text-sm">여행지, 카페, 숙소 검색...</span>
              <span className="ml-auto bg-[#FF6B35] text-white text-sm font-medium px-4 py-2 rounded-full">검색</span>
            </Link>
          </div>
        </section>
      )}

      {/* 인기 지역 (필터 미적용 시에만 표시) */}
      {!isFiltered && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-1">인기 여행 지역</h2>
          <p className="text-sm text-[#888] mb-5">반려동물과 함께하기 좋은 지역</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {POPULAR_AREAS.map((area) => {
              const regionSlug = REGION_SLUGS.find((r) => r.code === area.code)?.slug;
              return (
              <Link
                key={area.code}
                href={regionSlug ? `/region/${regionSlug}` : `/?area=${area.code}`}
                className="bg-white border border-[#FFE5D5] rounded-2xl p-4 text-center hover:border-[#FF6B35] hover:shadow-md transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{area.emoji}</div>
                <p className="font-semibold text-sm text-[#2D2D2D] group-hover:text-[#FF6B35] transition-colors">{area.name}</p>
                <p className="text-xs text-[#aaa] mt-0.5">{area.desc}</p>
              </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 카테고리 아이콘 그리드 (필터 미적용 시에만 표시) */}
      {!isFiltered && (
        <section className="max-w-6xl mx-auto px-4 pb-10">
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-1">카테고리</h2>
          <p className="text-sm text-[#888] mb-5">원하는 유형의 여행지를 찾아보세요</p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {CATEGORY_ICONS.map((cat) => {
              const catSlug = CATEGORY_SLUGS.find((c) => c.typeId === cat.id)?.slug;
              return (
              <Link
                key={cat.id}
                href={catSlug ? `/category/${catSlug}` : `/?type=${cat.id}`}
                className="flex-shrink-0 bg-white border border-[#FFE5D5] rounded-2xl px-5 py-4 text-center hover:border-[#FF6B35] hover:shadow-md transition-all duration-200 group min-w-[90px]"
              >
                <div className="text-2xl mb-1.5">{cat.emoji}</div>
                <p className="text-xs font-medium text-[#555] group-hover:text-[#FF6B35] transition-colors">{cat.label}</p>
              </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 필터 고정 바 */}
      <HomeClient initialArea={area ?? ""} initialType={type ?? ""} />

      {/* 여행지 목록 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#2D2D2D]">
              {isFiltered ? heading : "최근 등록된 여행지"}
            </h2>
            {items.length > 0 && (
              <p className="text-sm text-[#888] mt-0.5">{items.length}개의 여행지</p>
            )}
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <PetCard key={item.contentid} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#aaa]">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-lg font-medium text-[#888]">여행지를 찾지 못했어요</p>
            <p className="text-sm mt-2">다른 지역이나 카테고리를 선택해보세요</p>
          </div>
        )}
      </div>

      {/* SEO 내부 링크 - 전체 지역 + 전체 카테고리 */}
      {!isFiltered && (
        <section className="max-w-6xl mx-auto px-4 py-10 border-t border-[#FFE5D5]">
          <h2 className="text-base font-bold text-[#2D2D2D] mb-4">전국 지역별 여행지</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {REGION_SLUGS.map((r) => (
              <Link
                key={r.slug}
                href={`/region/${r.slug}`}
                className="px-3 py-1.5 rounded-full text-xs border border-[#FFE5D5] bg-white text-[#666] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
              >
                {r.name} 여행지
              </Link>
            ))}
          </div>
          <h2 className="text-base font-bold text-[#2D2D2D] mb-4">카테고리별 여행지</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_SLUGS.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-3 py-1.5 rounded-full text-xs border border-[#FFE5D5] bg-white text-[#666] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
