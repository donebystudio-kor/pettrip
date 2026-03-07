import Link from "next/link";
import { PetItem, CONTENT_TYPE_LABELS, CONTENT_TYPE_EMOJI } from "@/types/pet";
import { formatDist } from "@/lib/api";
import CardFavoriteButton from "./CardFavoriteButton";

interface Props {
  item: PetItem;
  showDist?: boolean;
}

export default function PetCard({ item, showDist }: Props) {
  const image = item.firstimage || item.firstimage2;
  const typeLabel = CONTENT_TYPE_LABELS[item.contenttypeid ?? ""] ?? "";
  const typeEmoji = CONTENT_TYPE_EMOJI[item.contenttypeid ?? ""] ?? "🐾";
  const dist = showDist ? formatDist(item.dist) : "";

  // 주소에서 시/도 추출
  const region = item.addr1?.split(" ").slice(0, 2).join(" ") ?? "";

  return (
    <Link href={`/${item.contentid}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#FFE5D5] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg">
        {/* 이미지 */}
        <div className="relative w-full aspect-[4/3] bg-[#FFF0E8] overflow-hidden">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-30">🐾</span>
            </div>
          )}

          {/* 뱃지들 */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {typeLabel && (
              <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-[#FF6B35] border border-[#FFE5D5] shadow-sm">
                {typeEmoji} {typeLabel}
              </span>
            )}
          </div>

          {/* 즐겨찾기 + 거리 뱃지 */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            {dist && (
              <span className="bg-[#FF6B35] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                {dist}
              </span>
            )}
            <CardFavoriteButton contentId={item.contentid} />
          </div>

          {/* 반려동물 동반 뱃지 */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-[#4ECDC4]/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
              🐾 동반 가능
            </span>
          </div>
        </div>

        {/* 정보 */}
        <div className="p-3.5">
          <h3 className="font-bold text-sm line-clamp-1 text-[#2D2D2D] group-hover:text-[#FF6B35] transition-colors">
            {item.title}
          </h3>
          {region && (
            <p className="text-xs text-[#888] mt-1.5 line-clamp-1 flex items-center gap-1">
              <span className="text-[#FF6B35]">📍</span> {region}
            </p>
          )}
          {item.tel && (
            <p className="text-xs text-[#aaa] mt-1 line-clamp-1 flex items-center gap-1">
              <span>📞</span> {item.tel}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
