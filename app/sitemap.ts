import { MetadataRoute } from "next";
import { getAreaBasedList } from "@/lib/api";
import { REGION_SLUGS, CATEGORY_SLUGS, COMBO_PAGES } from "@/constants/seo";

const BASE_URL = "https://pettrip.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/nearby`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/favorites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // 2. 지역별 페이지 (17개)
  const regionRoutes: MetadataRoute.Sitemap = REGION_SLUGS.map((r) => ({
    url: `${BASE_URL}/region/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. 카테고리별 페이지 (7개)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 4. 지역+카테고리 조합 페이지 (20개)
  const comboRoutes: MetadataRoute.Sitemap = COMBO_PAGES.map((c) => ({
    url: `${BASE_URL}/region/${c.regionSlug}/${c.categorySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5. 상세 페이지 (주요 지역 전체 수집)
  let detailRoutes: MetadataRoute.Sitemap = [];
  try {
    const majorAreaCodes = ["1", "6", "39", "31", "32", "36"];
    const results = await Promise.all(
      majorAreaCodes.map((code) => getAreaBasedList(code))
    );

    const allItems = results.flat();
    const seen = new Set<string>();
    detailRoutes = allItems
      .filter((item) => {
        if (seen.has(item.contentid)) return false;
        seen.add(item.contentid);
        return true;
      })
      .map((item) => ({
        url: `${BASE_URL}/${item.contentid}`,
        lastModified: item.modifiedtime
          ? new Date(
              item.modifiedtime.replace(
                /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                "$1-$2-$3T$4:$5:$6"
              )
            )
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (e) {
    console.error("sitemap 상세 페이지 수집 오류:", e);
  }

  return [
    ...staticRoutes,
    ...regionRoutes,
    ...categoryRoutes,
    ...comboRoutes,
    ...detailRoutes,
  ];
}
