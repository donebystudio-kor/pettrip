import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAreaBasedList } from "@/lib/api";
import PetCard from "@/components/PetCard";
import { REGION_SLUGS, CATEGORY_SLUGS } from "@/constants/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REGION_SLUGS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = REGION_SLUGS.find((r) => r.slug === slug);
  if (!region) return {};

  const title = `${region.name} 반려동물 동반 여행지`;
  const description = `${region.name} 지역의 반려동물 동반 가능한 여행지, 숙소, 음식점, 관광지 정보를 확인하세요. ${region.desc.slice(0, 100)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 네발여행`,
      description,
      type: "website",
    },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = REGION_SLUGS.find((r) => r.slug === slug);
  if (!region) notFound();

  const items = await getAreaBasedList(region.code, undefined, undefined, 100);

  // ItemList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${region.name} 반려동물 동반 여행지`,
    description: region.desc,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `https://pettrip.vercel.app/${item.contentid}`,
    })),
  };

  const otherRegions = REGION_SLUGS.filter((r) => r.slug !== slug).slice(0, 8);

  // 카테고리별 수량 계산
  const categoryCounts = CATEGORY_SLUGS.map((cat) => ({
    ...cat,
    count: items.filter((item) => item.contenttypeid === cat.typeId).length,
  })).filter((c) => c.count > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <nav className="text-xs text-[#888] mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#FF6B35] transition-colors">홈</Link>
        <span>/</span>
        <span className="text-[#2D2D2D] font-medium">{region.name}</span>
      </nav>

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
          {region.name} 반려동물 동반 여행지
        </h1>
        <p className="text-sm text-[#555] leading-relaxed max-w-3xl">
          {region.desc}
        </p>
      </div>

      {/* 카테고리 바로가기 */}
      {categoryCounts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#2D2D2D] mb-3">{region.name} 카테고리별 여행지</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categoryCounts.map((cat) => (
              <Link
                key={cat.slug}
                href={`/region/${slug}/${cat.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-[#FFE5D5] bg-white text-[#666] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-200"
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className="text-xs text-[#aaa]">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 여행지 목록 */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2D2D2D]">전체 여행지</h2>
          <span className="text-sm text-[#888]">{items.length}개</span>
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <PetCard key={item.contentid} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#aaa]">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-lg font-medium text-[#888]">등록된 여행지가 없어요</p>
          </div>
        )}
      </div>

      {/* 다른 지역 바로가기 */}
      <div className="border-t border-[#FFE5D5] pt-8">
        <h2 className="text-base font-bold text-[#2D2D2D] mb-4">다른 지역 여행지</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {otherRegions.map((r) => (
            <Link
              key={r.slug}
              href={`/region/${r.slug}`}
              className="text-center py-3 rounded-xl border border-[#FFE5D5] bg-white hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all text-sm font-medium text-[#555]"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
