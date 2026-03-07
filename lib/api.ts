import {
  PetItem,
  PetDetailCommon,
  PetDetailPet,
  PetImage,
  ApiResponse,
} from "@/types/pet";

const SERVICE_KEY =
  "726c80985f6abaead5820d0512cb8ba9e489be0d9d8dbff24001658139a5b767";
const BASE_URL =
  "https://apis.data.go.kr/B551011/KorPetTourService2";

const COMMON_PARAMS: Record<string, string> = {
  serviceKey: SERVICE_KEY,
  MobileOS: "ETC",
  MobileApp: "펫트립",
  _type: "json",
};

// 단일 페이지 fetch + totalCount 반환
async function fetchApiPage<T>(
  operation: string,
  params: Record<string, string | number>
): Promise<{ items: T[]; totalCount: number }> {
  const searchParams = new URLSearchParams({
    ...COMMON_PARAMS,
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  });

  const url = `${BASE_URL}/${operation}?${searchParams.toString()}`;

  try {
    let res = await fetch(url, { next: { revalidate: 3600 } });
    for (let attempt = 1; attempt < 3 && (res.status === 504 || res.status === 503); attempt++) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      res = await fetch(url, { next: { revalidate: 3600 } });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: ApiResponse<T> = await res.json();

    if (!data.response) {
      console.error(`API 응답 형식 오류 (${operation}):`, JSON.stringify(data));
      return { items: [], totalCount: 0 };
    }

    const { resultCode } = data.response.header;

    if (resultCode !== "0000") {
      console.error(`API 오류 [${resultCode}]:`, data.response.header.resultMsg);
      return { items: [], totalCount: 0 };
    }

    const body = data.response.body;
    const rawItems = body.items;
    if (!rawItems) return { items: [], totalCount: 0 };

    const item = (rawItems as { item: T | T[] }).item;
    if (!item) return { items: [], totalCount: 0 };
    const items = Array.isArray(item) ? item : [item];
    return { items, totalCount: body.totalCount };
  } catch (err) {
    console.error(`fetchApi 오류 (${operation}):`, err);
    return { items: [], totalCount: 0 };
  }
}

// 편의 래퍼: 단일 페이지
async function fetchApi<T>(
  operation: string,
  params: Record<string, string | number>
): Promise<T[]> {
  const { items } = await fetchApiPage<T>(operation, params);
  return items;
}

// 전체 페이지 자동 수집 (100개씩, 병렬 fetch)
async function fetchAllPages<T>(
  operation: string,
  baseParams: Record<string, string | number>
): Promise<T[]> {
  const PAGE_SIZE = 100;
  const first = await fetchApiPage<T>(operation, {
    ...baseParams,
    pageNo: 1,
    numOfRows: PAGE_SIZE,
  });

  if (first.totalCount <= PAGE_SIZE) return first.items;

  const totalPages = Math.ceil(first.totalCount / PAGE_SIZE);
  const restPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

  const restResults = await Promise.all(
    restPages.map((page) =>
      fetchApi<T>(operation, { ...baseParams, pageNo: page, numOfRows: PAGE_SIZE })
    )
  );

  return [...first.items, ...restResults.flat()];
}

// 키워드 검색 (전체 결과)
export async function searchKeyword(keyword: string): Promise<PetItem[]> {
  return fetchAllPages<PetItem>("searchKeyword2", {
    keyword,
    arrange: "A",
  });
}

// 지역별 목록 (전체 결과)
export async function getAreaBasedList(
  areaCode?: string,
  sigunguCode?: string,
  contentTypeId?: string,
  // 홈 미리보기용으로 개수 제한이 필요할 때만 사용
  limit?: number
): Promise<PetItem[]> {
  const baseParams: Record<string, string | number> = { arrange: "A" };
  if (areaCode) baseParams.areaCode = areaCode;
  if (sigunguCode) baseParams.sigunguCode = sigunguCode;
  if (contentTypeId) baseParams.contentTypeId = contentTypeId;

  if (limit) {
    // 홈 미리보기: 1페이지만
    return fetchApi<PetItem>("areaBasedList2", {
      ...baseParams,
      pageNo: 1,
      numOfRows: limit,
    });
  }

  return fetchAllPages<PetItem>("areaBasedList2", baseParams);
}

// 위치 기반 목록
export async function getLocationBasedList(
  mapX: number,
  mapY: number,
  radius = 20000,
  page = 1,
  numOfRows = 20,
  contentTypeId?: string
): Promise<PetItem[]> {
  const params: Record<string, string | number> = {
    mapX,
    mapY,
    radius,
    pageNo: page,
    numOfRows,
    arrange: "E",
  };
  if (contentTypeId) params.contentTypeId = contentTypeId;

  return fetchApi<PetItem>("locationBasedList2", params);
}

// 상세 공통 정보
export async function getDetailCommon(
  contentId: string
): Promise<PetDetailCommon | null> {
  const items = await fetchApi<PetDetailCommon>("detailCommon2", { contentId });
  return items[0] ?? null;
}

// 반려동물 동반 조건
export async function getDetailPet(
  contentId: string
): Promise<PetDetailPet | null> {
  const items = await fetchApi<PetDetailPet>("detailPetTour2", { contentId });
  return items[0] ?? null;
}

// 이미지 목록
export async function getDetailImages(
  contentId: string
): Promise<PetImage[]> {
  return fetchApi<PetImage>("detailImage2", {
    contentId,
    imageYN: "Y",
    subImageYN: "Y",
  });
}

// HTML 태그 제거 유틸
export function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

// 거리 포맷
export function formatDist(dist?: string): string {
  if (!dist) return "";
  const m = parseFloat(dist);
  if (m >= 1000) return `${(m / 1000).toFixed(1)}km`;
  return `${Math.round(m)}m`;
}
