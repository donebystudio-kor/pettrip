import { NextRequest, NextResponse } from "next/server";
import { getLocationBasedList } from "@/lib/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "0");
  const lng = parseFloat(searchParams.get("lng") ?? "0");
  const radius = parseInt(searchParams.get("radius") ?? "10000");

  if (!lat || !lng) {
    return NextResponse.json({ error: "좌표가 필요합니다" }, { status: 400 });
  }

  const items = await getLocationBasedList(lng, lat, radius, 1, 30);
  return NextResponse.json({ items });
}
