import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import SectionTwo from "@/components/SectionTwo";

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

export default function CreativeTechPage() {
  return (
    <>
      <HomeHero>
        <SectionTwo />

        <section className="bg-[#242424] text-[#CEDECE] pt-[80px]">
          <Divider />

          <ProjectRow
            mediaOnLeft
            media={{ src: "/glasto.jpg", alt: "Festival prototype" }}
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
        </section>
      </HomeHero>
    </>
  );
}