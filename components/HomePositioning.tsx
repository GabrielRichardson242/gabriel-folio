"use client";

const capabilities = [
  "Opportunity Discovery",
  "Systems Thinking",
  "Evidence Based Pitching",
  "Rapid Prototyping",
  "Experience Design",
  "Self Directed Learning",
];

export default function HomePositioning() {
  return (
    <section className="relative z-30 -mt-[140vh] bg-[#9c871f] text-white">
      <div className="grid min-h-screen grid-cols-1 min-[900px]:grid-cols-[38vw_1fr]">
        <div className="px-8 py-14 min-[900px]:px-14 min-[900px]:py-16">
          <div className="font-body text-[clamp(1.45rem,1.85vw,2.25rem)] font-bold leading-[1.45]">
            <p>
              I work between Design, Technology and Strategy to identify
              opportunities, shape them into pitch ready propositions, and build
              prototypes that test their value.
            </p>

            <p className="mt-14">
              Through university projects and independent ventures, I have
              developed a practice centred around rapid experimentation. Using
              emerging AI workflows, I&apos;ve enabled fast self-directed
              technical learning, quickly learning to utilise any tools required
              to move ideas from concept to testable prototypes under tight
              deadlines, without prior technical experience.
            </p>

            <p className="mt-14">
              This has given freedom in our ideation, allowing my teams to create
              beyond confidence and comfort.
            </p>
          </div>

          <div className="mt-20 grid gap-y-9 font-kalmansk text-[clamp(1.8rem,2.25vw,3rem)] leading-none tracking-[0.02em]">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              <span>{capabilities[0]}</span>
              <span>*</span>
              <span>{capabilities[1]}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <span>*</span>
              <span>{capabilities[2]}</span>
              <span>*</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              <span>{capabilities[3]}</span>
              <span>*</span>
              <span>{capabilities[4]}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <span>*</span>
              <span>{capabilities[5]}</span>
              <span>*</span>
            </div>
          </div>
        </div>

        <div className="min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-screen">
          <div className="h-[60vh] bg-black min-[900px]:h-screen">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/projects/home-practice-loop.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}