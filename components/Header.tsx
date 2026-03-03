import Link from "next/link";

export default function Header({
  leftName,
  modeTitle,
  subtitle,
  toolStrip,
}: {
  leftName: string;
  modeTitle: string;
  subtitle: string;
  toolStrip: string[];
}) {
  return (
    <header className="w-full border-b border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm opacity-80">{leftName}</div>
            <nav className="mt-6 flex gap-4 text-sm opacity-80">
              <Link href="/info" className="hover:opacity-100">
                Info
              </Link>
              <span className="opacity-40">|</span>
              <Link href="/cv" className="hover:opacity-100">
                CV
              </Link>
              <span className="opacity-40">|</span>
              <Link href="/contact" className="hover:opacity-100">
                Contact
              </Link>
            </nav>
          </div>

          <div className="text-right">
            <div className="text-3xl font-semibold leading-tight">
              {modeTitle}
            </div>
            <div className="mt-1 text-sm opacity-80">{subtitle}</div>
            <div className="mt-6 flex flex-wrap justify-end gap-x-3 gap-y-1 text-sm opacity-70">
              {toolStrip.map((t) => (
                <span key={t} className="whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}