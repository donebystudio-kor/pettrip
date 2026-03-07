"use client";
import { useRouter } from "next/navigation";
import AreaFilter from "@/components/AreaFilter";
import CategoryFilter from "@/components/CategoryFilter";

interface Props {
  initialArea: string;
  initialType: string;
}

export default function HomeClient({ initialArea, initialType }: Props) {
  const router = useRouter();

  const navigate = (area: string, type: string) => {
    const sp = new URLSearchParams();
    if (area) sp.set("area", area);
    if (type) sp.set("type", type);
    const query = sp.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <div className="sticky top-[52px] md:top-[52px] z-40 bg-[#FFF8F0]/95 backdrop-blur-sm border-b border-[#FFE5D5] px-4 py-3 space-y-2">
      <AreaFilter
        selected={initialArea}
        onChange={(code) => navigate(code, initialType)}
      />
      <CategoryFilter
        selected={initialType}
        onChange={(id) => navigate(initialArea, id)}
      />
    </div>
  );
}
