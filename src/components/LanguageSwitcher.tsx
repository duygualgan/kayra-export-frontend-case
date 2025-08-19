"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      <Link href={`/en${pathname.replace(/^\/(en|tr)/, "")}`}>EN</Link>
      <Link href={`/tr${pathname.replace(/^\/(en|tr)/, "")}`}>TR</Link>
    </div>
  );
}
