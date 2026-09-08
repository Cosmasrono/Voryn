import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, subtitle, center, light }: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "!text-gold-400" : ""}`}>
          <span className="h-px w-6 bg-current" />
          {eyebrow}
          <span className="h-px w-6 bg-current" />
        </span>
      )}
      {/* decorative diamond spacer */}
      {eyebrow && (
        <span
          className={`mx-auto mt-2 mb-1 block h-1.5 w-1.5 rotate-45 rounded-none ${
            center ? "mx-auto" : ""
          } ${light ? "bg-gold-400/60" : "bg-gold-500/50"}`}
          style={{ display: center ? "block" : "inline-block" }}
        />
      )}
      <h2
        className={`mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-silver-300" : "text-silver-600"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
