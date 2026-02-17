import { useState, useEffect } from "react";

interface SkillTagProps {
  label: string;
  delay?: number;
  color?: "gold" | "teal" | "magenta" | "blue";
}

const colorMap = {
  gold: {
    bg: "bg-diary-gold/20",
    border: "border-diary-gold/50",
    text: "text-diary-gold",
    shadow: "hsl(42 78% 55% / 0.4)",
  },
  teal: {
    bg: "bg-cosmic-teal/20",
    border: "border-cosmic-teal/50",
    text: "text-cosmic-teal",
    shadow: "hsl(180 70% 35% / 0.4)",
  },
  magenta: {
    bg: "bg-cosmic-magenta/20",
    border: "border-cosmic-magenta/50",
    text: "text-cosmic-magenta",
    shadow: "hsl(310 70% 40% / 0.4)",
  },
  blue: {
    bg: "bg-cosmic-blue/20",
    border: "border-cosmic-blue/50",
    text: "text-cosmic-blue",
    shadow: "hsl(220 80% 50% / 0.4)",
  },
};

const SkillTag = ({ label, delay = 0, color = "gold" }: SkillTagProps) => {
  const [visible, setVisible] = useState(false);
  const c = colorMap[color];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block px-3 py-1.5 rounded-md border font-mono-space text-xs tracking-wider
        ${c.bg} ${c.border} ${c.text}
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75"}
      `}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: visible
          ? `0 4px 0 ${c.shadow}, 0 8px 15px hsl(0 0% 0% / 0.3)`
          : "none",
        transitionDelay: `${delay}ms`,
      }}
    >
      {label}
    </span>
  );
};

export default SkillTag;
