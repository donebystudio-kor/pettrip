// 목록 아이템 (searchKeyword2, areaBasedList2, locationBasedList2 공통)
export interface PetItem {
  contentid: string;
  contenttypeid?: string;
  title: string;
  addr1?: string;
  addr2?: string;
  mapx?: string;
  mapy?: string;
  firstimage?: string;
  firstimage2?: string;
  tel?: string;
  dist?: string; // locationBasedList2에서 거리(m)
  createdtime?: string;
  modifiedtime?: string;
}

// 상세 공통 정보
export interface PetDetailCommon extends PetItem {
  homepage?: string;
  overview?: string;
  zipcode?: string;
  telname?: string;
  mlevel?: string;
}

// 반려동물 동반 조건 (detailPetTour2)
export interface PetDetailPet {
  contentid: string;
  acmpyPsblCpam?: string;   // 동반 가능 동물 종류
  acmpyTypeCd?: string;      // 동반 타입
  acmpyNeedMtr?: string;     // 동반 시 필요 물품
  relaPosesFclty?: string;   // 관련 편의시설
  relaAcdntRiskMtr?: string; // 안전주의사항
  relaFrnshPrdlst?: string;  // 제공 물품
  createtime?: string;
  modifiedtime?: string;
}

// 이미지
export interface PetImage {
  contentid: string;
  imgname?: string;
  originimgurl: string;
  smallimageurl?: string;
  serialnum?: string;
  cpyrhtDivCd?: string;
}

// contenttypeid 레이블 맵
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  "12": "관광지",
  "14": "문화시설",
  "15": "축제·행사",
  "28": "레포츠",
  "32": "숙박",
  "38": "쇼핑",
  "39": "음식점",
};

// contenttypeid 이모지 맵
export const CONTENT_TYPE_EMOJI: Record<string, string> = {
  "12": "🏕️",
  "14": "🎭",
  "15": "🎪",
  "28": "🏃",
  "32": "🏨",
  "38": "🛍️",
  "39": "🍽️",
};

// 지역 코드 (areaCode)
export const AREA_CODES: { code: string; name: string }[] = [
  { code: "1", name: "서울" },
  { code: "2", name: "인천" },
  { code: "3", name: "대전" },
  { code: "4", name: "대구" },
  { code: "5", name: "광주" },
  { code: "6", name: "부산" },
  { code: "7", name: "울산" },
  { code: "8", name: "세종" },
  { code: "31", name: "경기" },
  { code: "32", name: "강원" },
  { code: "33", name: "충북" },
  { code: "34", name: "충남" },
  { code: "35", name: "경북" },
  { code: "36", name: "경남" },
  { code: "37", name: "전북" },
  { code: "38", name: "전남" },
  { code: "39", name: "제주" },
];

// API 응답 구조
export interface ApiResponse<T> {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: T | T[] } | "";
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
