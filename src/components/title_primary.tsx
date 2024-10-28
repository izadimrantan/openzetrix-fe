import { TitleProps } from "@/types/misc";

export default function TitlePrimary({ children, className = "" }: TitleProps) {
  const letters = Array.from(children as string);

  return (
    <h1 className={`${className} mt-8 lg:mt-16 mb-2 text-xl lg:text-5xl font-semibold`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
}