import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/shared/config/routes";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === ROUTES.home) {
    return NextResponse.redirect(new URL(ROUTES.greeting, request.url));
  }
}
