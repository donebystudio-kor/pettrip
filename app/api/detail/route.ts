import { NextRequest, NextResponse } from "next/server";
import { getDetailCommon } from "@/lib/api";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json(null, { status: 400 });

  const common = await getDetailCommon(id);
  if (!common) return NextResponse.json(null, { status: 404 });

  return NextResponse.json({
    contentid: common.contentid,
    title: common.title,
    addr1: common.addr1,
    firstimage: common.firstimage,
  });
}
