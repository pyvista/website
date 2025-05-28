import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const slicedBanners = [
  "/images/banner-1.png",
  "/images/banner-2.png",
  "/images/banner-3.png",
  "/images/banner-4.png",
];

export default function DynamicBanner() {
  const [scrolled, setScrolled] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
      if (!isScrolled) setIndex(0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slicedBanners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [scrolled]);

  return (
    <div
      className={`w-full ${
        scrolled
          ? "h-[15vh] md:h-[15vh] lg:h-[20vh]"
          : "h-[40vh] md:h-[60vh] lg:h-[70vh]"
      } relative z-10 overflow-hidden transition-all duration-200`}
    >
      <AnimatePresence mode="wait">
        {scrolled ? (
          <motion.div
            key={`sliced-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={slicedBanners[index]}
              alt={`Banner Slice ${index + 1}`}
              width={1920}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src="/images/banner.png"
              alt="Full Banner"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
