import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDetailCommon,
  getDetailPet,
  getDetailImages,
  getAreaBasedList,
  stripHtml,
} from "@/lib/api";
import { CONTENT_TYPE_LABELS, CONTENT_TYPE_EMOJI } from "@/types/pet";
import { CATEGORY_SLUGS } from "@/constants/seo";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButtons from "@/components/ShareButtons";
import PetCard from "@/components/PetCard";

interface Props {
  params: Promise<{ contentId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contentId } = await params;
  const [common, pet] = await Promise.all([
    getDetailCommon(contentId),
    getDetailPet(contentId),
  ]);
  if (!common) return { title: "여행지 정보" };

  const typeLabel = CONTENT_TYPE_LABELS[common.contenttypeid ?? ""] ?? "여행지";

  let desc = `${common.title}은(는) 반려동물 동반 가능한 ${typeLabel}입니다.`;
  if (pet?.acmpyPsblCpam) desc += ` 동반 가능: ${pet.acmpyPsblCpam.slice(0, 50)}.`;
  const overview = stripHtml(common.overview)?.slice(0, 80);
  if (overview) desc += ` ${overview}`;

  return {
    title: `${common.title} - 반려동물 동반 가능 | 네발여행`,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${common.title} - 반려동물 동반 ${typeLabel} | 네발여행`,
      description: desc.slice(0, 160),
      type: "article",
      images: common.firstimage
        ? [{ url: common.firstimage, width: 800, height: 600, alt: common.title }]
        : [],
      siteName: "네발여행",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${common.title} | 네발여행`,
      description: desc.slice(0, 160),
      images: common.firstimage ? [common.firstimage] : [],
    },
  };
}

export default async function DetailPage({ params }: Props) {
  const { contentId } = await params;

  const [common, pet, images] = await Promise.all([
    getDetailCommon(contentId),
    getDetailPet(contentId),
    getDetailImages(contentId),
  ]);

  if (!common) notFound();

  const typeLabel = CONTENT_TYPE_LABELS[common.contenttypeid ?? ""] ?? "여행지";
  const typeEmoji = CONTENT_TYPE_EMOJI[common.contenttypeid ?? ""] ?? "🐾";
  const overview = stripHtml(common.overview);
  const homepage = common.homepage?.replace(/<[^>]*>/g, "").trim();

  const allImages = [
    ...(common.firstimage ? [common.firstimage] : []),
    ...images.map((img) => img.originimgurl).filter((u) => u !== common.firstimage),
  ];

  const kakaoMapUrl = common.mapx && common.mapy
    ? `https://map.kakao.com/link/map/${encodeURIComponent(common.title)},${common.mapy},${common.mapx}`
    : null;

  const naverMapUrl = common.mapx && common.mapy
    ? `https://map.naver.com/index.nhn?lng=${common.mapx}&lat=${common.mapy}&title=${encodeURIComponent(common.title)}`
    : null;

  const petInfoCards = [
    { icon: "🐕", label: "동반 가능 동물", value: pet?.acmpyPsblCpam },
    { icon: "🎒", label: "필요 물품", value: pet?.acmpyNeedMtr },
    { icon: "🏪", label: "편의시설", value: pet?.relaPosesFclty },
    { icon: "⚠️", label: "안전 주의사항", value: pet?.relaAcdntRiskMtr },
    { icon: "🎁", label: "제공 물품", value: pet?.relaFrnshPrdlst },
  ].filter((c) => c.value);

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: common.title,
    description: overview || `${common.title} 반려동물 동반 여행지`,
    ...(common.addr1 && {
      address: {
        "@type": "PostalAddress",
        streetAddress: common.addr1 + (common.addr2 ? ` ${common.addr2}` : ""),
        addressCountry: "KR",
      },
    }),
    ...(common.mapx && common.mapy && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: parseFloat(common.mapy),
        longitude: parseFloat(common.mapx),
      },
    }),
    ...(common.firstimage && { image: common.firstimage }),
    ...(common.tel && { telephone: common.tel }),
    ...(homepage && { url: homepage.startsWith("http") ? homepage : `https://${homepage}` }),
    isAccessibleForFree: true,
    publicAccess: true,
  };

  // 같은 카테고리 관련 여행지
  const relatedItems = (await getAreaBasedList(undefined, undefined, common.contenttypeid, 12))
    .filter((item) => item.contentid !== contentId)
    .slice(0, 6);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <nav className="text-xs text-[#888] mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#FF6B35] transition-colors">홈</Link>
        <span>/</span>
        {common.contenttypeid && (
          <>
            <Link
              href={`/category/${CATEGORY_SLUGS.find((c) => c.typeId === common.contenttypeid)?.slug || "tourist"}`}
              className="hover:text-[#FF6B35] transition-colors"
            >
              {typeLabel}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[#2D2D2D] font-medium line-clamp-1">{common.title}</span>
      </nav>

      {/* 이미지 갤러리 */}
      {allImages.length > 0 ? (
        <div className="mb-6">
          {/* 메인 이미지 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={allImages[0]}
            alt={common.title}
            className="w-full h-56 md:h-80 object-cover rounded-2xl"
          />
          {/* 서브 이미지 */}
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
              {allImages.slice(1, 6).map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`${common.title} ${i + 2}`}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-52 bg-[#FFF0E8] rounded-2xl flex items-center justify-center text-6xl mb-6">
          🐾
        </div>
      )}

      {/* 제목 영역 */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium bg-[#FFF0E8] text-[#FF6B35] px-3 py-1 rounded-full border border-[#FFE5D5]">
            {typeEmoji} {typeLabel}
          </span>
          {pet && (
            <span className="text-xs font-medium bg-[#E0F7F5] text-[#4ECDC4] px-3 py-1 rounded-full border border-[#B8EDE6]">
              🐾 동반 가능
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">{common.title}</h1>
          <FavoriteButton contentId={contentId} />
        </div>
      </div>

      {/* 기본 정보 카드 */}
      <div className="bg-white rounded-2xl border border-[#FFE5D5] p-5 space-y-3 mb-5 shadow-sm">
        {common.addr1 && (
          <div className="flex items-start gap-3 text-sm">
            <span className="w-8 h-8 bg-[#FFF0E8] rounded-full flex items-center justify-center shrink-0 text-base">📍</span>
            <div className="pt-1">
              <p className="text-[#555]">
                {common.addr1}
                {common.addr2 ? ` ${common.addr2}` : ""}
              </p>
            </div>
          </div>
        )}
        {common.tel && (
          <div className="flex items-start gap-3 text-sm">
            <span className="w-8 h-8 bg-[#FFF0E8] rounded-full flex items-center justify-center shrink-0 text-base">📞</span>
            <div className="pt-1">
              <a href={`tel:${common.tel.replace(/[^0-9]/g, "")}`} className="text-[#FF6B35] hover:underline">
                {common.tel}
              </a>
            </div>
          </div>
        )}
        {homepage && (
          <div className="flex items-start gap-3 text-sm">
            <span className="w-8 h-8 bg-[#FFF0E8] rounded-full flex items-center justify-center shrink-0 text-base">🌐</span>
            <div className="pt-1">
              <a
                href={homepage.startsWith("http") ? homepage : `https://${homepage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B35] hover:underline break-all"
              >
                홈페이지 바로가기
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 반려동물 동반 정보 - 아이콘 카드 */}
      {petInfoCards.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-[#2D2D2D] mb-3 flex items-center gap-2">
            🐾 반려동물 동반 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {petInfoCards.map((card, i) => (
              <div
                key={i}
                className="bg-[#FFF8F0] border border-[#FFE5D5] rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-base shadow-sm">{card.icon}</span>
                  <span className="font-semibold text-sm text-[#FF6B35]">{card.label}</span>
                </div>
                <p className="text-sm text-[#555] leading-relaxed">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 소개 */}
      {overview && (
        <div className="bg-white rounded-2xl border border-[#FFE5D5] p-5 mb-5 shadow-sm">
          <h2 className="font-bold text-[#2D2D2D] mb-3">소개</h2>
          <p className="text-sm text-[#555] leading-relaxed whitespace-pre-line">{overview}</p>
        </div>
      )}

      {/* 길찾기 */}
      {(kakaoMapUrl || naverMapUrl) && (
        <div className="mb-5">
          <h2 className="font-bold text-[#2D2D2D] mb-3 flex items-center gap-2">
            🗺️ 길찾기
          </h2>
          <div className="flex gap-3">
            {kakaoMapUrl && (
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#FFDE00] text-[#3A1D1D] font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 transition-opacity shadow-sm"
              >
                🗺️ 카카오맵
              </a>
            )}
            {naverMapUrl && (
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#03C75A] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 transition-opacity shadow-sm"
              >
                🗺️ 네이버맵
              </a>
            )}
          </div>
        </div>
      )}

      {/* 공유 */}
      <div className="mb-5">
        <h2 className="font-bold text-[#2D2D2D] mb-3 flex items-center gap-2">
          📤 공유하기
        </h2>
        <ShareButtons
          title={common.title}
          description={overview || `${common.title} 반려동물 동반 여행지`}
          imageUrl={common.firstimage}
          contentId={contentId}
        />
      </div>

      {/* 관련 여행지 */}
      {relatedItems.length > 0 && (
        <div className="mt-8 border-t border-[#FFE5D5] pt-8">
          <h2 className="font-bold text-[#2D2D2D] mb-4">
            다른 {typeLabel} 추천
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {relatedItems.map((item) => (
              <PetCard key={item.contentid} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
