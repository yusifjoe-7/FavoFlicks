import type { ReactNode } from "react"
import { useRef, useState, useEffect } from "react";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function SideScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth - scrollRef.current.clientWidth / 4;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full self-start flex items-center min-h-5 my-2">

      <ChevronLeftIcon
        sx={{ fontSize: 35, display: { xs: 'none', sm: 'block' } }}
        onClick={() => scroll("left")}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-bg rounded-2xl transition-opacity duration-300
          ${showLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <ChevronRightIcon
        sx={{ fontSize: 35, display: { xs: 'none', sm: 'block' } }}
        onClick={() => scroll("right")}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-bg rounded-2xl transition-opacity duration-300
          ${showRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className="flex items-top overflow-x-auto scroll-smooth scrollbar-hide my-auto py-4 w-full"
        ref={scrollRef}
      >
        {children}
      </div>

    </div>
    
  );
}