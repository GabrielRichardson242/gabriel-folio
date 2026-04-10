"use client";

type PhraseGraphicProps = {
  outlineSrc: string;
  fillSrc: string;
  alt: string;
  isActive: boolean;
  className?: string;
  delayMs?: number;
};

export default function PhraseGraphic({
  outlineSrc,
  fillSrc,
  alt,
  isActive,
  className = "",
  delayMs = 0,
}: PhraseGraphicProps) {
  return (
    <div className={`relative w-full border border-blue-500 ${className}`}>
      <img
        src={outlineSrc}
        alt={alt}
        className="block w-full h-auto select-none"
        draggable={false}
      />

      <img
        src={fillSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 block w-full h-auto select-none transition-opacity duration-500 ease-out"
        style={{
          opacity: isActive ? 1 : 0,
          transitionDelay: `${delayMs}ms`,
        }}
      />
    </div>
  );
}