"use client";

export default function HomeIntro() {
  return (
    <section className="relative z-30 -mt-[52vh] bg-[#232323] px-6 pt-10 pb-20 text-[#ededed] min-[900px]:px-16 min-[900px]:pt-12 min-[900px]:pb-28">
      <div className="grid gap-10 min-[900px]:grid-cols-[520px_1fr] min-[900px]:gap-16">
        <div className="flex max-w-[520px] flex-col gap-20 min-[900px]:pl-12">
          <div>
            <h2 className="font-abolition text-[clamp(3.5rem,5vw,5.5rem)] uppercase italic leading-none text-[#ededed]/70">
              What I do.
            </h2>

            <div className="mt-7 max-w-[34ch] font-body text-[clamp(1.5rem,1.8vw,2rem)] font-semibold leading-[1.45] text-[#ededed]">
              <p>
                Through university and personal projects, I have consistently
                pursued challenges beyond my existing skillset, learning new
                tools and workflows as required.
              </p>

              <p className="mt-8">
                As a result, I have developed a strong ability to prototype
                ideas, adapt to unfamiliar technologies, and build for the proof
                required depending on the type and setting of the deliverable.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-abolition text-[clamp(3.5rem,5vw,5.5rem)] uppercase italic leading-none text-[#ededed]/70">
              Core capabilities.
            </h2>

            <ul className="mt-8 flex list-none flex-col gap-7 p-0 font-body text-[clamp(1.5rem,1.8vw,2rem)] font-semibold leading-none text-[#ededed]">
              <li>Opportunity Discovery</li>
              <li>Systems Thinking</li>
              <li>Experience Design</li>
              <li>Rapid Prototyping</li>
              <li>Evidence-Based Pitching</li>
              <li>Self-Directed Learning</li>
            </ul>

            <p className="mt-8 max-w-[30ch] font-disket text-[9px] uppercase leading-[1.6] tracking-[0.12em] text-[#ededed]/55">
              Highlighted throughout relevant projects.
            </p>
          </div>
        </div>

        <div className="min-[900px]:sticky min-[900px]:top-[72px] min-[900px]:h-[calc(100vh-96px)]">
          <div className="relative h-[58vh] overflow-hidden border border-white/20 bg-black min-[900px]:h-full">
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