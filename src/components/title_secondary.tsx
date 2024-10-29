import { TitleProps } from "@/types/misc";

export default function TitleSecondary({ children, className = "", delay = 0 }: TitleProps) {
  const letters = Array.from(children as string);

  return (
    <h2 className={`${className} mb-2 text-md lg:text-3xl font-semibold`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-letter"
          style={{ animationDelay: `${delay + index * 0.1}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h2>
  );
}

