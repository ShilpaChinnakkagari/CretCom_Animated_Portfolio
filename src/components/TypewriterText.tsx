import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

const TypewriterText = ({ text, speed = 30, delay = 0, className = "", style = {}, as: Tag = "span" }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <Tag className={className} style={style}>
      {displayed}
      {started && displayed.length < text.length && (
        <span style={{ borderRight: "2px solid hsl(42 78% 55% / 0.6)", animation: "blink-caret 0.8s infinite", marginLeft: "1px" }}>&nbsp;</span>
      )}
    </Tag>
  );
};

export default TypewriterText;
