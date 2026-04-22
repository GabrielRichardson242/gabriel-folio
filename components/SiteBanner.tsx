"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

export default function SiteBanner({
  style,
}: {
  style?: CSSProperties;
}) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 w-screen bg-[#232323]"
      style={style}
    >
      <div className="h-px w-full bg-[#ededed]" />
      <div className="flex h-[42px] w-full items-center pl-10 pr-6">
        <Link
          href="/"
          className="ml-[30px] font-british text-[14px] leading-none tracking-[0.01em] text-[#ededed] no-underline transition-opacity duration-150 hover:opacity-70 hover:no-underline"
        >
          GABRIEL RICHARDSON
        </Link>
      </div>
      <div className="h-px w-full bg-[#ededed]" />
    </div>
  );
}