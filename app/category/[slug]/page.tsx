import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAreaBasedList } from "@/lib/api";
import PetCard from "@/components/PetCard";
import { CATEGORY_SLUGS, REGION_SLUGS } from "@/constants/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_SLUGS.find((c) => c.slug === slug);
  if (!category) return {};

  const title = `반려동물 동반 ${category.name}`;
  const description = category.desc.slice(0, 160);

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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORY_SLUGS.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = await getAreaBasedList(undefined, undefined, category.typeId, 100);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `반려동물 동반 ${category.name}`,
    description: category.desc,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `https://pettrip.vercel.app/${item.contentid}`,
    })),
  };

  const otherCategories = CATEGORY_SLUGS.filter((c) => c.slug !== slug);
  const popularRegions = REGION_SLUGS.filter((r) =>
    ["seoul", "busan", "jeju", "gangwon", "gyeonggi", "gyeongnam"].includes(r.slug)
  );

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
        <span className="text-[#2D2D2D] font-medium">{category.name}</span>
      </nav>

      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">{category.emoji}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">
            반려동물 동반 {category.name}
          </h1>
        </div>
        <p className="text-sm text-[#555] leading-relaxed max-w-3xl">
          {category.desc}
        </p>
      </div>

      {/* 지역별 바로가기 */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-[#2D2D2D] mb-3">지역별 {category.name}</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {popularRegions.map((r) => (
            <Link
              key={r.slug}
              href={`/region/${r.slug}/${slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-[#E0F7F5] bg-white text-[#666] hover:border-[#4ECDC4] hover:text-[#4ECDC4] transition-all duration-200"
            >
              {r.name} {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 여행지 목록 */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2D2D2D]">전체 {category.name}</h2>
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
            <p className="text-lg font-medium text-[#888]">등록된 {category.name}이(가) 없어요</p>
          </div>
        )}
      </div>

      {/* 다른 카테고리 */}
      <div className="border-t border-[#FFE5D5] pt-8">
        <h2 className="text-base font-bold text-[#2D2D2D] mb-4">다른 카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-[#FFE5D5] bg-white text-[#666] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
            >
              <span>{c.emoji}</span> {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
