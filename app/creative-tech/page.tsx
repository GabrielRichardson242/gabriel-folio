import Image from "next/image";
import Link from "next/link";

function Divider() {
  return <div className="h-[2px] w-full bg-[#CEDECE]" />;
}

function ProjectRow({
  title,
  role,
  context,
  mediaOnLeft,
  media,
  placeholderLabel,
}: {
  title: string;
  role: string;
  context: string;
  mediaOnLeft: boolean;
  media?: { src: string; alt: string };
  placeholderLabel?: string;
}) {
  return (
    <section className="py-[110px]">
      <div className="mx-auto max-w-[1180px] px-10">
        <div
          className={`grid grid-cols-1 items-center gap-14 md:grid-cols-2 ${
            mediaOnLeft ? "" : "md:[&>*:first-child]:order-2"
          }`}
        >
          <div className="flex justify-center md:justify-start">
            {media ? (
              <Image
                src={media.src}
                alt={media.alt}
                width={560}
                height={360}
                className="h-auto w-full max-w-[560px] border border-[#CEDECE]/60"
                priority={false}
              />
            ) : (
              <div className="flex h-[320px] w-[320px] items-center justify-center border border-[#CEDECE]/60 bg-[#D9D9D9] text-black">
                <div className="font-body text-3xl font-semibold leading-tight">
                  {placeholderLabel ?? "Placeholder"}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-head text-[56px] leading-[0.95] md:text-[72px]">
              {title}
            </h2>

            <div className="mt-6 font-body text-[13px] leading-5 text-[#CEDECE]">
              <div>{role}</div>
              <div className="opacity-70">{context}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#242424] text-[#CEDECE]">
      {/* Top bar */}
      <header className="mx-auto flex max-w-[1180px] items-start justify-between px-10 pt-10">
        <div className="font-body text-[14px] leading-5">
          <div>Gabriel Richardson</div>
          <div className="mt-2 opacity-70">
            Third year Design Marketing student
            <br />
            Kingston School of Art.
          </div>
        </div>

        <nav className="font-body text-[14px] opacity-90">
          <Link className="hover:opacity-100" href="/info">
            Info
          </Link>
          <span className="px-3 opacity-60">|</span>
          <Link className="hover:opacity-100" href="/cv">
            CV
          </Link>
          <span className="px-3 opacity-60">|</span>
          <Link className="hover:opacity-100" href="/contact">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-10 pb-[95px] pt-[140px]">
        <h1 className="font-head text-[84px] leading-[0.9] md:text-[104px]">
          CREATIVE
          <br />
          TECHNOLOGIST
        </h1>

        <p className="font-body mt-6 text-[18px] text-[#DF4939]">
          Building Interactive, Audience-led Systems
        </p>

        <p className="font-body mt-2 text-[13px] text-[#DF4939] opacity-90">
          Web-GL&nbsp;&nbsp;|&nbsp;&nbsp;Unity&nbsp;&nbsp;|&nbsp;&nbsp;Live
          Interactivity
        </p>
      </section>

      <Divider />

      {/* Projects */}
      <ProjectRow
        mediaOnLeft
        media={{ src: "/glasto.jpg", alt: "Festival prototype" }} // replace with gif later
        title="Festival interactive game prototype"
        role="Role: Concept and Technology Lead in a 2 person tech team"
        context="Third Year University Project"
      />

      <Divider />

      <ProjectRow
        mediaOnLeft={false}
        placeholderLabel="Ambroise"
        title="Ambroise digital gallery spaces"
        role="Role: Project Manager, Developer, Brand Designer, Strategist"
        context="Personal Project, turned Third Year University Project"
      />

      <Divider />

      <ProjectRow
        mediaOnLeft
        placeholderLabel="Shits and gigs"
        title="Blink 182 interactive experience"
        role="Role: Project Manager, Strategist, Lead Prototyper"
        context="Second Year University Project"
      />

      <Divider />
    </main>
  );
}