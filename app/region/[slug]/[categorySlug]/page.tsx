import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAreaBasedList } from "@/lib/api";
import PetCard from "@/components/PetCard";
import { REGION_SLUGS, CATEGORY_SLUGS, COMBO_PAGES } from "@/constants/seo";

interface Props {
  params: Promise<{ slug: string; categorySlug: string }>;
}

export async function generateStaticParams() {
  return COMBO_PAGES.map((c) => ({
    slug: c.regionSlug,
    categorySlug: c.categorySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, categorySlug } = await params;
  const region = REGION_SLUGS.find((r) => r.slug === slug);
  const category = CATEGORY_SLUGS.find((c) => c.slug === categorySlug);
  if (!region || !category) return {};

  const title = `${region.name} ${category.name} - 반려동물 동반`;
  const description = `${region.name} 지역의 반려동물 동반 가능한 ${category.name} 정보를 확인하세요. 위치, 동반 조건, 편의시설 정보를 한눈에 볼 수 있습니다.`;

  return {
    title,
    description,
    openGraph: { title: `${title} | 펫트립`, description, type: "website" },
  };
}

export default async function ComboPage({ params }: Props) {
  const { slug, categorySlug } = await params;
  const region = REGION_SLUGS.find((r) => r.slug === slug);
  const category = CATEGORY_SLUGS.find((c) => c.slug === categorySlug);
  if (!region || !category) notFound();

  const items = await getAreaBasedList(region.code, undefined, category.typeId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${region.name} ${category.name} - 반려동물 동반`,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `https://pettrip.vercel.app/${item.contentid}`,
    })),
  };

  // 같은 지역의 다른 카테고리
  const sameRegionCategories = CATEGORY_SLUGS.filter((c) => c.slug !== categorySlug);
  // 같은 카테고리의 다른 지역
  const sameCategoryRegions = REGION_SLUGS.filter((r) => r.slug !== slug).slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <nav className="text-xs text-[#888] mb-4 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[#FF6B35] transition-colors">홈</Link>
        <span>/</span>
        <Link href={`/region/${slug}`} className="hover:text-[#FF6B35] transition-colors">{region.name}</Link>
        <span>/</span>
        <span className="text-[#2D2D2D] font-medium">{category.name}</span>
      </nav>

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-2">
          {region.name} {category.name}
        </h1>
        <p className="text-sm text-[#555]">
          {region.name} 지역의 반려동물 동반 가능한 {category.name} {items.length}곳을 소개합니다.
        </p>
      </div>

      {/* 여행지 목록 */}
      <div className="mb-10">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <PetCard key={item.contentid} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#aaa]">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-lg font-medium text-[#888]">등록된 {category.name}이(가) 없어요</p>
            <Link href={`/region/${slug}`} className="text-[#FF6B35] text-sm mt-3 inline-block hover:underline">
              {region.name} 전체 여행지 보기 →
            </Link>
          </div>
        )}
      </div>

      {/* 같은 지역 다른 카테고리 */}
      <div className="border-t border-[#FFE5D5] pt-8 mb-8">
        <h2 className="text-base font-bold text-[#2D2D2D] mb-3">{region.name}의 다른 카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {sameRegionCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/region/${slug}/${c.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-[#FFE5D5] bg-white text-[#666] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 같은 카테고리 다른 지역 */}
      <div className="border-t border-[#FFE5D5] pt-8">
        <h2 className="text-base font-bold text-[#2D2D2D] mb-3">다른 지역의 {category.name}</h2>
        <div className="flex flex-wrap gap-2">
          {sameCategoryRegions.map((r) => (
            <Link
              key={r.slug}
              href={`/region/${r.slug}/${categorySlug}`}
              className="px-4 py-2 rounded-full text-sm border border-[#E0F7F5] bg-white text-[#666] hover:border-[#4ECDC4] hover:text-[#4ECDC4] transition-all"
            >
              {r.name} {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
