interface SpinningLogoProps {
  emoji: string;
  label: string;
  speed?: number;
  delay?: number;
}

const SpinningLogo = ({ emoji, label, speed = 4, delay = 0 }: SpinningLogoProps) => {
  return (
    <div className="flex flex-col items-center gap-1" style={{ animationDelay: `${delay}s` }}>
      <div
        className="text-3xl floating-logo"
        style={{
          animation: `logo-spin ${speed}s linear infinite, logo-float 3s ease-in-out infinite`,
          animationDelay: `${delay}s, ${delay * 0.5}s`,
          transformStyle: "preserve-3d",
        }}
      >
        {emoji}
      </div>
      <span className="text-[10px] font-mono-space text-diary-gold/70 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

export default SpinningLogo;
