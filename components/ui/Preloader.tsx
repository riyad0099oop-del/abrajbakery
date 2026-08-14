"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the preloader in this session
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    
    if (hasSeenPreloader) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
      sessionStorage.setItem("hasSeenPreloader", "true");
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#FDFBF8] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-4">
            
            {/* Left Half of Logo */}
            <motion.div
              initial={{ x: -150, opacity: 0, rotate: -25 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 drop-shadow-md"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
            >
              <Image 
                src="/images/1786624083357.png" 
                alt="Logo Part 1" 
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Right Half of Logo */}
            <motion.div
              initial={{ x: 150, opacity: 0, rotate: 25 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 drop-shadow-md"
              style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
            >
              <Image 
                src="/images/1786624083357.png" 
                alt="Logo Part 2" 
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            
            {/* Center Glow after merge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
              transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-2xl z-[-1]"
            />
          </div>
          
          {/* Brand Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-wide"
          >
            برج التخفيضات
          </motion.div>
          
          {/* Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-6 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2.5 h-2.5 rounded-full bg-[#9b6a43]"
              />
            ))}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
