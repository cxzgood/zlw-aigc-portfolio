type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl leading-[1.12] font-semibold tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
