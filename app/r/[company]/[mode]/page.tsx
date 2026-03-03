"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();
  const params = useParams<{ company: string; mode: string }>();

  useEffect(() => {
    const mode = params?.mode;
    if (typeof mode === "string" && mode.length > 0) {
      router.replace(`/${mode}`);
    }
  }, [params, router]);

  return null;
}