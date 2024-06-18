import { Merriweather, Raleway } from "next/font/google";

const secondaryfont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface secondaryfontProps {
  children: React.ReactNode;
  className?: string;
}

export function SecondaryFont({ children, className }: secondaryfontProps) {
  return (
    <span className={secondaryfont.className + " " + className}>
      {children}
    </span>
  );
}

const accentfont = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface accentfontProps {
  children: React.ReactNode;
  className?: string;
}

export function AccentFont({ children, className }: accentfontProps) {
  return (
    <span className={accentfont.className + " " + className}>{children}</span>
  );
}
