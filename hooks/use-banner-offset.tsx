// useBannerOffset.ts
import { useEffect, useState } from 'react';

export function useBannerOffset(threshold = 100): "short" | "tall" {
  const [offset, setOffset] = useState<"short" | "tall">("tall");

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY > threshold ? "short" : "tall");
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return offset;
}