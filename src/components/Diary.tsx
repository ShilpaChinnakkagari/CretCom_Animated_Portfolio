import { useState } from "react";
import SkillTag from "./SkillTag";
import SpinningLogo from "./SpinningLogo";
import TypewriterText from "./TypewriterText";

const TOTAL_PAGES = 8;

const Diary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [showParticleName, setShowParticleName] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setPageKey(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setPageKey(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const openDiary = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 800);
  };

  const closeDiary = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowParticleName(true);
    }, 1200);
    setTimeout(() => {
      setIsClosing(false);
      setShowParticleName(false);
      setIsOpen(false);
      setCurrentPage(0);
      setPageKey(0);
    }, 4000);
  };

  // Golden particle dissolve + name reveal
  if (showParticleName) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Golden particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 6}px`,
                height: `${3 + Math.random() * 6}px`,
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
                background: `radial-gradient(circle, hsl(42 95% ${60 + Math.random() * 30}%) 0%, transparent 70%)`,
                animation: `particle-float-away ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 0.8}s both`,
              }}
            />
          ))}
        </div>
        {/* Glowing 3D name */}
        <div className="text-center" style={{ animation: "name-reveal 1.5s ease-out 0.3s both" }}>
          <h1
            className="font-cinzel text-4xl sm:text-7xl font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(42 95% 65%), hsl(42 90% 75%), hsl(45 100% 85%), hsl(42 90% 65%))",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gold-shimmer 3s linear infinite, name-glow-pulse 2s ease-in-out infinite",
              filter: "drop-shadow(0 0 30px hsl(42 90% 60% / 0.6)) drop-shadow(0 0 60px hsl(42 85% 55% / 0.3))",
              textShadow: "none",
            }}
          >
            Shilpa
          </h1>
          <p
            className="font-cinzel text-xl sm:text-3xl mt-2 tracking-[0.3em]"
            style={{
              color: "hsl(42 78% 60% / 0.9)",
              animation: "name-reveal 1.5s ease-out 0.8s both",
              filter: "drop-shadow(0 0 15px hsl(42 80% 55% / 0.4))",
            }}
          >
            Chinnakkagari
          </p>
          <p
            className="font-cormorant text-lg mt-6 italic"
            style={{
              color: "hsl(42 78% 55% / 0.6)",
              animation: "name-reveal 1.5s ease-out 1.3s both",
            }}
          >
            Pages of Creation
          </p>
        </div>

        <style>{`
          @keyframes particle-float-away {
            0% { opacity: 1; transform: scale(1) translate(0, 0); }
            100% { opacity: 0; transform: scale(0) translate(${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 150}px, -${100 + Math.random() * 300}px); }
          }
          @keyframes name-reveal {
            0% { opacity: 0; transform: scale(0.5) translateY(30px); filter: blur(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
          }
          @keyframes name-glow-pulse {
            0%, 100% { filter: drop-shadow(0 0 30px hsl(42 90% 60% / 0.6)) drop-shadow(0 0 60px hsl(42 85% 55% / 0.3)); }
            50% { filter: drop-shadow(0 0 50px hsl(42 90% 65% / 0.8)) drop-shadow(0 0 100px hsl(42 85% 60% / 0.5)); }
          }
        `}</style>
      </div>
    );
  }

  // Closed diary view
  if (!isOpen) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-screen perspective-1000">
        <div
          className={`cursor-pointer transition-all duration-1000 ${
            isOpening ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
          style={{ 
            animation: !isOpening ? "diary-float 6s ease-in-out infinite" : "none",
            transform: isOpening ? "scale(0.8) rotateY(90deg)" : "none",
          }}
          onClick={!isOpening ? openDiary : undefined}
        >
          {/* Outer golden glow aura */}
          <div
            className="absolute -inset-20 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, hsl(42 100% 65% / 0.5) 0%, hsl(42 95% 60% / 0.35) 25%, hsl(42 90% 55% / 0.2) 45%, hsl(42 80% 50% / 0.08) 60%, transparent 75%)",
              animation: "glow-pulse 2s ease-in-out infinite",
              filter: "blur(18px)",
            }}
          />
          {/* Mid glow ring */}
          <div
            className="absolute -inset-10 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, hsl(42 100% 70% / 0.45) 0%, hsl(42 95% 60% / 0.2) 50%, transparent 80%)",
              animation: "glow-pulse 1.8s ease-in-out infinite 0.3s",
              filter: "blur(8px)",
            }}
          />
          {/* Inner intense golden ring */}
          <div
            className="absolute -inset-4 rounded-xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, hsl(42 100% 72% / 0.35) 0%, hsl(42 90% 60% / 0.15) 50%, transparent 80%)",
              animation: "glow-pulse 1.5s ease-in-out infinite 0.6s",
              filter: "blur(3px)",
            }}
          />

          <div className="relative preserve-3d" style={{ perspective: "1200px" }}>
            {/* Front cover with opening animation */}
            <div
              className="relative w-[450px] h-[600px] sm:w-[550px] sm:h-[700px] rounded-lg diary-shadow"
              style={{
                background: "linear-gradient(145deg, hsl(25 40% 14%), hsl(25 40% 10%))",
                boxShadow: `0 20px 60px hsl(0 0% 0% / 0.6), 0 0 120px hsl(42 100% 65% / 0.45), 0 0 200px hsl(42 95% 60% / 0.25), 0 0 300px hsl(42 90% 55% / 0.12), inset 0 1px 0 hsl(25 35% 18% / 0.3)`,
                transformStyle: "preserve-3d",
                animation: isOpening ? "diary-open 0.8s ease-in-out forwards" : "none",
                transformOrigin: "left center",
              }}
            >
              <div className="absolute inset-0 rounded-lg opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 8px, hsl(25 30% 20%) 8px, hsl(25 30% 20%) 9px)" }} />
              <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 rounded-l-lg" style={{ background: "linear-gradient(90deg, hsl(25 40% 8%), hsl(25 40% 12%))", boxShadow: "inset -2px 0 8px hsl(0 0% 0% / 0.4)" }} />
              <div className="absolute inset-5 sm:inset-7 border rounded pointer-events-none" style={{ borderColor: "hsl(42 78% 55% / 0.4)" }} />
              <div className="absolute inset-6 sm:inset-8 border rounded pointer-events-none" style={{ borderColor: "hsl(42 78% 55% / 0.2)" }} />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center" style={{ backfaceVisibility: "hidden" }}>
                <div className="text-3xl mb-6 tracking-[0.5em]" style={{ color: "hsl(42 78% 55% / 0.7)" }}>✦ ✦ ✦</div>
                <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-shimmer leading-tight mb-4">Shilpa</h1>
                <h2 className="font-cinzel text-lg sm:text-xl tracking-[0.2em] mb-8" style={{ color: "hsl(42 78% 60% / 0.9)" }}>Chinnakkagari</h2>
                <div className="w-20 h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(42 78% 55% / 0.6), transparent)" }} />
                <p className="font-cormorant text-base sm:text-lg italic leading-relaxed" style={{ color: "hsl(42 78% 55% / 0.7)" }}>Pages of Creation</p>
                <p className="font-mono-space text-xs tracking-[0.3em] mt-4 uppercase" style={{ color: "hsl(42 78% 55% / 0.5)" }}>Building Intelligence</p>
                <p className="font-mono-space text-xs tracking-[0.3em] uppercase" style={{ color: "hsl(42 78% 55% / 0.5)" }}>Designing Impact</p>
                <div className="text-3xl mt-8 tracking-[0.5em]" style={{ color: "hsl(42 78% 55% / 0.7)" }}>✦ ✦ ✦</div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="font-mono-space text-xs tracking-[0.4em] uppercase animate-pulse" style={{ color: "hsl(42 78% 55% / 0.5)" }}>Click to Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Open diary view - WITH PAGE FLIP ANIMATIONS
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      {/* Dissolve particles when closing */}
      {isClosing && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 5}px`,
                height: `${2 + Math.random() * 5}px`,
                left: `${20 + Math.random() * 60}%`,
                top: `${25 + Math.random() * 50}%`,
                background: `radial-gradient(circle, hsl(42 95% ${55 + Math.random() * 35}%) 0%, transparent 70%)`,
                animation: `particle-dissolve ${1 + Math.random() * 1.5}s ease-out ${Math.random() * 0.6}s both`,
              }}
            />
          ))}
        </div>
      )}

      {/* Close button - TOP CENTER */}
      <button 
        onClick={closeDiary}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-black/50 border border-diary-gold rounded-full text-diary-gold hover:bg-diary-gold/20 z-50 font-mono-space text-sm tracking-widest"
      >
        ✕ CLOSE DIARY
      </button>

      {/* PREV Button - TOP LEFT */}
      <button
        onClick={prevPage}
        disabled={currentPage === 0 || isFlipping}
        className={`absolute top-20 left-4 z-50 px-6 py-3 rounded-full font-mono-space text-base tracking-widest transition-all backdrop-blur-sm border ${
          currentPage === 0 || isFlipping
            ? "text-gray-500 border-gray-500/30 cursor-not-allowed opacity-50"
            : "text-diary-gold border-diary-gold/30 hover:bg-diary-gold/20 cursor-pointer bg-black/30"
        }`}
      >
        ◄ PREV
      </button>

      {/* NEXT Button - BOTTOM RIGHT */}
      <button
        onClick={nextPage}
        disabled={currentPage === TOTAL_PAGES - 1 || isFlipping}
        className={`absolute bottom-20 right-4 z-50 px-6 py-3 rounded-full font-mono-space text-base tracking-widest transition-all backdrop-blur-sm border ${
          currentPage === TOTAL_PAGES - 1 || isFlipping
            ? "text-gray-500 border-gray-500/30 cursor-not-allowed opacity-50"
            : "text-diary-gold border-diary-gold/30 hover:bg-diary-gold/20 cursor-pointer bg-black/30"
        }`}
      >
        NEXT ►
      </button>

      {/* Main container */}
      <div 
        className="relative w-full max-w-6xl mx-auto px-4 mt-16"
        style={{
          animation: "diary-appear 0.5s ease-out",
        }}
      >
        {/* Diary with perspective for 3D flip */}
        <div
          className="relative w-full aspect-[4/3] rounded-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(25 40% 12%), hsl(25 40% 9%))",
            boxShadow: "0 30px 80px hsl(0 0% 0% / 0.7), 0 0 100px hsl(42 100% 65% / 0.35), 0 0 180px hsl(42 95% 60% / 0.2), 0 0 280px hsl(42 90% 55% / 0.1)",
            perspective: "2000px",
          }}
        >
          {/* Spine shadow */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 z-30" style={{ background: "linear-gradient(180deg, transparent 5%, hsl(25 30% 6%) 20%, hsl(25 30% 6%) 80%, transparent 95%)", boxShadow: "-4px 0 12px hsl(0 0% 0% / 0.3), 4px 0 12px hsl(0 0% 0% / 0.3)" }} />

          {/* Page flip overlay when flipping */}
          {isFlipping && (
            <div
              className="absolute top-3 bottom-3 z-40 rounded-lg"
              style={{
                left: flipDirection === "next" ? "calc(50% + 3px)" : "3px",
                right: flipDirection === "next" ? "3px" : "calc(50% + 3px)",
                background: "linear-gradient(135deg, #ece1d4, #e0d5c8)",
                transformOrigin: flipDirection === "next" ? "left center" : "right center",
                animation: flipDirection === "next" ? "page-flip-next 0.6s ease-in-out" : "page-flip-prev 0.6s ease-in-out",
                boxShadow: "0 0 30px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                color: "#b8860b40",
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Turning page...
            </div>
          )}

          {/* LEFT page */}
          <div 
            className="absolute top-3 bottom-3 left-3 sm:top-4 sm:bottom-4 sm:left-4 rounded-l overflow-hidden" 
            style={{ 
              right: "calc(50% + 3px)", 
              background: "linear-gradient(135deg, #e8ddd0, #ddd0c0)",
              zIndex: isFlipping && flipDirection === "prev" ? 20 : 10,
            }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="absolute top-0 bottom-0 right-0 w-5" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 0% / 0.06))" }} />
            <div className="relative z-10 h-full">
              {renderPage(currentPage, pageKey)}
            </div>
          </div>

          {/* RIGHT page */}
          <div 
            className="absolute top-3 bottom-3 right-3 sm:top-4 sm:bottom-4 sm:right-4 rounded-r overflow-hidden" 
            style={{ 
              left: "calc(50% + 3px)", 
              background: "linear-gradient(135deg, #ece1d4, #e0d5c8)",
              zIndex: isFlipping && flipDirection === "next" ? 20 : 10,
            }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="absolute top-0 bottom-0 left-0 w-5" style={{ background: "linear-gradient(-90deg, transparent, hsl(0 0% 0% / 0.06))" }} />
            <div className="relative z-10 h-full">
              {renderPageRight(currentPage, pageKey)}
            </div>
          </div>
        </div>

        {/* Page indicators - Now at bottom center */}
        <div className="flex justify-center gap-3 mt-4">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage 
                  ? "bg-diary-gold scale-150 shadow-lg shadow-diary-gold/50" 
                  : "bg-diary-gold/30"
              }`} 
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes diary-open {
          0% { 
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% { 
            transform: rotateY(45deg);
            opacity: 0.8;
          }
          100% { 
            transform: rotateY(90deg);
            opacity: 0;
          }
        }

        @keyframes diary-appear {
          0% { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes page-flip-next {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(-90deg);
            opacity: 0.8;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }

        @keyframes page-flip-prev {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(90deg);
            opacity: 0.8;
          }
          100% {
            transform: rotateY(180deg);
            opacity: 0;
          }
        }

        @keyframes particle-dissolve {
          0% { opacity: 0; transform: scale(0); }
          20% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0) translateY(-100px) translateX(${Math.random() > 0.5 ? '' : '-'}50px); }
        }
        @keyframes diary-float {
          0%, 100% { transform: translateY(0) rotateX(2deg) rotateY(-1deg); }
          50% { transform: translateY(-15px) rotateX(-1deg) rotateY(2deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px hsl(42 90% 60% / 0.5), 0 0 80px hsl(42 85% 55% / 0.3), 0 0 140px hsl(42 80% 50% / 0.15); }
          50% { box-shadow: 0 0 50px hsl(42 90% 65% / 0.7), 0 0 120px hsl(42 85% 60% / 0.4), 0 0 200px hsl(42 80% 55% / 0.25); }
        }
        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes page-content-appear {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// LEFT page content — all with typewriter
// LEFT page content — all with typewriter
function renderPage(page: number, pageKey: number) {
  const ink = "#1a2235";
  const inkMed = "#3a4a65";
  const inkLight = "#6a7a95";
  const gold = "#b8860b";

  // 👇 PUT THE DATE FUNCTION HERE 👇
  const getFormattedDate = (format: 'long' | 'short' | 'numeric') => {
    const date = new Date();
    
    switch(format) {
      case 'long':
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'short':
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      case 'numeric':
        return date.toLocaleDateString('en-US');
      default:
        return date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
    }
  };

  const pageBase: React.CSSProperties = {
    position: "absolute", inset: 0, padding: "2rem 2.25rem",
    overflowY: "auto", color: ink,
  };

  switch (page) {
    case 0:
      return (
        <div style={pageBase} key={`p0-${pageKey}`}>
          {/* 👇 AND USE IT HERE 👇 */}
          <TypewriterText 
            text={getFormattedDate('long')} 
            className="font-dancing text-base mb-2 block" 
            style={{ color: inkLight }} 
            delay={200} 
            speed={40} 
            as="p" 
          />
          <TypewriterText text="The Beginning" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={900} speed={50} as="h2" />
          <TypewriterText text="I decided I wouldn't just study AI… I would build with it." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={1600} speed={25} as="p" />
          <br />
          <TypewriterText text="I'm a B.Tech Computer Science (AI) undergraduate at MITS with a CGPA of 9.81." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={3200} speed={20} as="p" />
          <br />
          <TypewriterText text="But grades were never the goal." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={5000} speed={30} as="p" />
          <TypewriterText text="I design solutions with structure, clarity, and intention." className="font-dancing text-base italic mt-4 pl-4 block" style={{ color: inkLight, borderLeft: `2px solid ${gold}66` }} delay={6000} speed={25} as="p" />
        </div>
      );

    case 1:
      return (
        <div style={pageBase} key={`p1-${pageKey}`}>
          <TypewriterText text="Foundations" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="Education" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={700} speed={50} as="h2" />
          <div className="space-y-4" style={{ animation: "page-content-appear 0.8s ease-out 1.2s both" }}>
            {[
              { icon: "🎓", title: "B.Tech CSE (AI)", sub: "MITS", detail: "2023–2027 | 9.81" },
              { icon: "📚", title: "Intermediate", sub: "BIEAP", detail: "99.1%" },
              { icon: "📖", title: "SSC", sub: "", detail: "100%" },
            ].map((edu) => (
              <div key={edu.title} className="rounded-lg p-4" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)" }}>
                <p className="font-cinzel text-sm" style={{ color: ink }}>{edu.icon} {edu.title}</p>
                {edu.sub && <p className="font-cormorant text-sm mt-1" style={{ color: inkMed }}>{edu.sub}</p>}
                <p className="font-mono-space text-xs mt-1" style={{ color: inkLight }}>{edu.detail}</p>
              </div>
            ))}
          </div>
          <TypewriterText text="Consistency is engineered." className="font-dancing text-base italic mt-4 pl-4 block" style={{ color: inkLight, borderLeft: `2px solid ${gold}66` }} delay={2000} speed={30} as="p" />
        </div>
      );

    case 2:
      return (
        <div style={pageBase} key={`p2-${pageKey}`}>
          <TypewriterText text="Arsenal" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="Skills" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={600} speed={50} as="h2" />
          <div className="space-y-4">
            {[
              { label: "Programming", skills: ["Java", "Python", "Dart"], color: "gold" as const },
              { label: "Development", skills: ["Flutter", "HTML/CSS/JS", "Flask"], color: "teal" as const },
              { label: "AI & ML", skills: ["ML", "DL", "OpenCV", "NLP", "GenAI"], color: "magenta" as const },
              { label: "Cloud", skills: ["AWS", "SQL", "Git"], color: "blue" as const },
            ].map((group, gi) => (
              <div key={group.label}>
                <p className="font-mono-space text-xs tracking-widest uppercase mb-2" style={{ color: inkLight }}>{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s, si) => (
                    <SkillTag key={s} label={s} delay={(gi * 3 + si) * 80 + 100} color={group.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 3:
      return (
        <div style={pageBase} key={`p3-${pageKey}`}>
          <TypewriterText text="Project I" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="Attendrix" className="font-cinzel text-xl sm:text-2xl mb-3 block" style={{ color: ink }} delay={600} speed={50} as="h2" />
          <p className="font-mono-space text-xs tracking-widest uppercase mb-2" style={{ color: inkLight, animation: "page-content-appear 0.5s ease-out 1s both" }}>Automated Attendance</p>
          <p className="font-mono-space text-xs mb-4" style={{ color: "#1a9e8f", animation: "page-content-appear 0.5s ease-out 1.2s both" }}>Flask • MySQL • AWS</p>
          <TypewriterText text="AI-powered attendance via classroom cameras. Role-based portals, analytics, and AWS deployment." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={1400} speed={20} as="p" />
          <ul className="mt-3 space-y-2 font-cormorant text-sm" style={{ color: inkMed, animation: "page-content-appear 0.5s ease-out 2.5s both" }}>
            <li>• Admin, Faculty, Student portals</li>
            <li>• Analytics & reporting</li>
            <li>• Hall ticket & fee receipts</li>
            <li>• Leave management</li>
          </ul>
        </div>
      );

    case 4:
      return (
        <div style={pageBase} key={`p4-${pageKey}`}>
          <TypewriterText text="Project II & III" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="CretCom & Chatbot" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={700} speed={50} as="h2" />
          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", animation: "page-content-appear 0.5s ease-out 1.2s both" }}>
            <p className="font-cinzel text-sm" style={{ color: ink }}>📱 CretCom</p>
            <p className="font-mono-space text-xs" style={{ color: "#1a9e8f" }}>Flutter</p>
            <p className="font-cormorant text-sm mt-2" style={{ color: inkMed }}>Subject-wise learning material app by academic year.</p>
          </div>
          <div className="rounded-lg p-4" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", animation: "page-content-appear 0.5s ease-out 1.6s both" }}>
            <p className="font-cinzel text-sm" style={{ color: ink }}>🤖 Health Chatbot</p>
            <p className="font-mono-space text-xs" style={{ color: "#a3367a" }}>Python</p>
            <p className="font-cormorant text-sm mt-2" style={{ color: inkMed }}>AI chatbot for health guidance with analytics dashboard.</p>
          </div>
        </div>
      );

    case 5:
      return (
        <div style={pageBase} key={`p5-${pageKey}`}>
          <TypewriterText text="Projects IV–VI" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="More Creations" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={700} speed={50} as="h2" />
          {[
            { icon: "📜", title: "Certificate Generator", tech: "Python", color: "#2a6fd6" },
            { icon: "🎯", title: "Comm-Ace Trainer", tech: "GenAI", color: "#a3367a" },
            { icon: "🏗️", title: "Complaint System", tech: "GenAI", color: "#1a9e8f" },
          ].map((p, i) => (
            <div key={p.title} className="rounded-lg p-3.5 mb-3" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", animation: `page-content-appear 0.5s ease-out ${1.2 + i * 0.3}s both` }}>
              <p className="font-cinzel text-sm" style={{ color: ink }}>{p.icon} {p.title}</p>
              <p className="font-mono-space text-xs" style={{ color: p.color }}>{p.tech}</p>
            </div>
          ))}
        </div>
      );

    case 6:
      return (
        <div style={pageBase} key={`p6-${pageKey}`}>
          <TypewriterText text="Identity" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="More Than a Student" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={600} speed={50} as="h2" />
          <div className="space-y-3 mt-3">
            {["Infosys Springboard Intern", "AI Practitioner", "Flutter Developer", "Java DSA Learner", "Problem Solver"].map((role, i) => (
              <div key={role} className="flex items-center gap-3" style={{ opacity: 0, animation: `page-content-appear 0.5s ease-out ${1 + i * 0.2}s both` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: gold }} />
                <span className="font-cormorant text-base" style={{ color: inkMed }}>{role}</span>
              </div>
            ))}
          </div>
          <TypewriterText text="I build systems with structure, logic, and purpose." className="font-cormorant text-base font-semibold mt-5 block" style={{ color: ink }} delay={2500} speed={25} as="p" />
        </div>
      );

    case 7:
      return (
        <div style={pageBase} key={`p7-${pageKey}`}>
          <TypewriterText text="Connect" className="font-dancing text-base mb-2 block" style={{ color: inkLight }} delay={200} speed={40} as="p" />
          <TypewriterText text="Let's Build Together" className="font-cinzel text-xl sm:text-2xl mb-4 block" style={{ color: ink }} delay={600} speed={50} as="h2" />
          <div className="space-y-3" style={{ animation: "page-content-appear 0.5s ease-out 1.2s both" }}>
            <a href="mailto:shilpa.aitech@gmail.com" className="flex items-center gap-3 p-3.5 rounded-lg" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", textDecoration: "none" }}>
              <span className="text-xl">✉️</span>
              <div>
                <p className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight }}>Email</p>
                <p className="font-cormorant text-sm" style={{ color: inkMed }}>shilpa.aitech@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3.5 rounded-lg" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)" }}>
              <span className="text-xl">📍</span>
              <div>
                <p className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight }}>Location</p>
                <p className="font-cormorant text-sm" style={{ color: inkMed }}>Madanapalle, AP</p>
              </div>
            </div>
            <a href="#" className="flex items-center gap-3 p-3.5 rounded-lg" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", textDecoration: "none" }}>
              <span className="text-xl">💼</span>
              <div>
                <p className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight }}>LinkedIn</p>
                <p className="font-cormorant text-sm" style={{ color: inkMed }}>Connect with me</p>
              </div>
            </a>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// RIGHT page content — with typewriter on key text
function renderPageRight(page: number, pageKey: number) {
  const ink = "#1a2235";
  const inkMed = "#3a4a65";
  const inkLight = "#6a7a95";
  const gold = "#b8860b";

  const pageBase: React.CSSProperties = {
    position: "absolute", inset: 0, padding: "2rem 2.25rem",
    overflowY: "auto", color: ink,
  };

  switch (page) {
    case 0:
      return (
        <div style={pageBase} key={`r0-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <div className="text-5xl mb-5" style={{ animation: "page-content-appear 0.5s ease-out 0.3s both" }}>🧠</div>
            <TypewriterText text="What drives me" className="font-dancing text-xl mb-3 block" style={{ color: ink }} delay={500} speed={40} as="p" />
            <TypewriterText text="I build systems that solve real academic and institutional problems — from automated attendance to intelligent complaint validation." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={1200} speed={18} as="p" />
            <div className="w-16 h-px mt-8 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, animation: "page-content-appear 0.5s ease-out 3s both" }} />
            <p className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight, animation: "page-content-appear 0.5s ease-out 3.2s both" }}>
              B.Tech CSE (AI) • 9.81 CGPA
            </p>
          </div>
        </div>
      );

    case 1:
      return (
        <div style={pageBase} key={`r1-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <div className="text-5xl mb-5" style={{ animation: "page-content-appear 0.5s ease-out 0.3s both" }}>📊</div>
            <TypewriterText text="By the Numbers" className="font-dancing text-xl mb-5 block" style={{ color: ink }} delay={400} speed={40} as="p" />
            <div className="space-y-5 w-full">
              {[
                { value: "9.81", label: "CGPA" },
                { value: "99.1%", label: "Intermediate" },
                { value: "100%", label: "SSC" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center" style={{ animation: `page-content-appear 0.5s ease-out ${1 + i * 0.3}s both` }}>
                  <p className="font-cinzel text-2xl font-bold" style={{ color: gold }}>{stat.value}</p>
                  <p className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div style={pageBase} key={`r2-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center">
            <TypewriterText text="Tech Ecosystem" className="font-dancing text-lg mb-8 block" style={{ color: ink }} delay={300} speed={40} as="p" />
            <div className="flex flex-wrap justify-center gap-8">
              <SpinningLogo emoji="⚛️" label="React" speed={4} delay={0} />
              <SpinningLogo emoji="🐦" label="Flutter" speed={5} delay={0.5} />
              <SpinningLogo emoji="🐍" label="Python" speed={3.5} delay={1} />
              <SpinningLogo emoji="☕" label="Java" speed={4.5} delay={1.5} />
              <SpinningLogo emoji="🤖" label="AI/ML" speed={3} delay={2} />
              <SpinningLogo emoji="☁️" label="AWS" speed={4.2} delay={2.5} />
            </div>
            <div className="w-16 h-px mt-10" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
            <TypewriterText text="Always learning" className="font-mono-space text-xs tracking-widest uppercase mt-4 block" style={{ color: inkLight }} delay={2000} speed={50} as="p" />
          </div>
        </div>
      );

    case 3:
      return (
        <div style={pageBase} key={`r3-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <div className="text-5xl mb-5" style={{ animation: "page-content-appear 0.5s ease-out 0.3s both" }}>🏫</div>
            <TypewriterText text="Impact" className="font-dancing text-lg mb-5 block" style={{ color: ink }} delay={400} speed={40} as="p" />
            <TypewriterText text="Reduced manual effort and centralized academic operations across the entire institution." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={800} speed={18} as="p" />
            <div className="mt-8 w-full space-y-3">
              {["Automation", "Analytics", "Cloud Deploy"].map((tag, i) => (
                <div key={tag} className="py-2 px-4 rounded text-center" style={{ background: "rgba(26,34,53,0.05)", border: "1px solid rgba(26,34,53,0.1)", animation: `page-content-appear 0.5s ease-out ${2 + i * 0.2}s both` }}>
                  <span className="font-mono-space text-xs tracking-widest uppercase" style={{ color: inkLight }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div style={pageBase} key={`r4-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <TypewriterText text="Philosophy" className="font-dancing text-xl italic mb-8 block" style={{ color: ink }} delay={300} speed={40} as="p" />
            <TypewriterText text={`"AI should not only automate. It should assist intelligently."`} className="font-cormorant text-lg italic leading-relaxed block" style={{ color: inkMed }} delay={800} speed={20} as="p" />
            <div className="w-10 h-px mx-auto mt-5 mb-5" style={{ background: gold, animation: "page-content-appear 0.5s ease-out 2.5s both" }} />
            <TypewriterText text="Every project is designed to simplify workflows and empower users." className="font-cormorant text-base leading-relaxed block" style={{ color: inkLight }} delay={2800} speed={20} as="p" />
          </div>
        </div>
      );

    case 5:
      return (
        <div style={pageBase} key={`r5-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <TypewriterText text="Project Descriptions" className="font-dancing text-lg mb-5 block" style={{ color: ink }} delay={300} speed={40} as="p" />
            <div className="space-y-4 w-full text-left">
              {[
                { name: "Certificate Generator:", desc: "Bulk automation from Excel uploads." },
                { name: "Comm-Ace Trainer:", desc: "Communication training for Accenture placement." },
                { name: "Complaint System:", desc: "AI-validated complaints with image upload and department notifications." },
              ].map((item, i) => (
                <p key={item.name} className="font-cormorant text-sm leading-relaxed" style={{ color: inkMed, animation: `page-content-appear 0.5s ease-out ${0.8 + i * 0.4}s both` }}>
                  <strong style={{ color: ink }}>{item.name}</strong> {item.desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div style={pageBase} key={`r6-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <div className="text-5xl mb-5" style={{ animation: "page-content-appear 0.5s ease-out 0.3s both" }}>💡</div>
            <TypewriterText text="Mission" className="font-dancing text-xl italic mb-5 block" style={{ color: ink }} delay={400} speed={40} as="p" />
            <TypewriterText text="I don't just complete projects." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={800} speed={25} as="p" />
            <TypewriterText text="I build systems with structure, logic, and purpose." className="font-cormorant text-lg font-semibold mt-3 block" style={{ color: ink }} delay={1800} speed={25} as="p" />
            <div className="w-16 h-px mt-8" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, animation: "page-content-appear 0.5s ease-out 3s both" }} />
          </div>
        </div>
      );

    case 7:
      return (
        <div style={pageBase} key={`r7-${pageKey}`}>
          <div className="h-full flex flex-col justify-center items-center text-center px-5">
            <div className="text-5xl mb-5" style={{ animation: "page-content-appear 0.5s ease-out 0.3s both" }}>✨</div>
            <TypewriterText text="Thank You" className="font-dancing text-xl mb-5 block" style={{ color: ink }} delay={400} speed={40} as="p" />
            <TypewriterText text="For taking the time to read through my diary." className="font-cormorant text-base leading-relaxed block" style={{ color: inkMed }} delay={900} speed={25} as="p" />
            <div className="w-16 h-px mt-8 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, animation: "page-content-appear 0.5s ease-out 2.5s both" }} />
            <TypewriterText text="Let's create something remarkable together." className="font-cormorant text-base italic block" style={{ color: inkLight }} delay={2800} speed={25} as="p" />
            <p className="font-mono-space text-xs tracking-widest uppercase mt-8" style={{ color: gold, animation: "page-content-appear 0.5s ease-out 4s both" }}>
              Shilpa Chinnakkagari
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default Diary;