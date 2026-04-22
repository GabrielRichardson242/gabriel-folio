import Link from "next/link";

export default function InnovationStratPage() {
  return (
    <main className="min-h-screen bg-[#232323] px-8 py-24 text-[#ededed]">
      <div className="mx-auto max-w-[960px]">
        <p className="font-body text-[12px] uppercase tracking-[0.14em] text-[#b5b5b5]">
          Mode Page
        </p>
        <h1 className="mt-4 font-grith text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.9] text-[#ededed]">
          Innovation Strategy
        </h1>
        <p className="mt-8 max-w-[56ch] font-body text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4] text-[#ededed]">
          This mode page is being simplified for the current submission build.
        </p>
        <div className="mt-10">
          <Link href="/" className="font-body text-[14px] underline underline-offset-4">
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}