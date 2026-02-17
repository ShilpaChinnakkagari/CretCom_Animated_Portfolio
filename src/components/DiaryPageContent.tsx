import { ReactNode } from "react";

interface DiaryPageContentProps {
  children: ReactNode;
  active: boolean;
}

const DiaryPageContent = ({ children, active }: DiaryPageContentProps) => {
  return (
    <div
      className={`absolute inset-0 p-6 sm:p-8 overflow-y-auto transition-all duration-700 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        animation: active ? "page-content-appear 0.8s ease-out 0.3s both" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default DiaryPageContent;
