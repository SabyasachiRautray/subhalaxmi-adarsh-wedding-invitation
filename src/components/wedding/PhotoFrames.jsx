import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING } from "../../constants/testIds";

const BRIDE_PHOTO = "/bride.webp";
const GROOM_PHOTO = "/groom.webp";
const COUPLE_PHOTO = "/couple.webp";

/* ═══════════════════════════════════════════════════
   PHOTO FRAMES — Asymmetric Editorial Parallax Collage
   ═══════════════════════════════════════════════════ */
const PhotoFrames = () => {
  const containerRef = useRef(null);

  // Parallax effects tied to the scroll position of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for each element
  const yCouple = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yBride = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yGroom = useTransform(scrollYProgress, [0, 1], [-20, 80]);
  const rotateBride = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotateGroom = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section
      ref={containerRef}
      data-testid={WEDDING.photoSection}
      className="relative overflow-hidden ornate-border-top ornate-border-bottom"
      style={{
        backgroundColor: "var(--clr-cream-dark, #F5ECDA)",
        padding: "var(--section-pad-y) 0", // Full width bleeding
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-10 md:mb-24 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "var(--clr-maroon, #6B0F1A)",
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              lineHeight: 1.2,
            }}
          >
            Match Made by the Universe
          </h2>

          <p
            className="max-w-md mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--clr-text-muted, #6B5C60)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            Brought together by family, bound by love.
          </p>

          <div
            className="mx-auto mt-4"
            style={{
              width: "60px",
              height: "2px",
              background: "var(--grad-gold)",
              borderRadius: "var(--radius-full)",
            }}
          />
        </motion.div>

        {/* Collage Container */}
        <div className="relative w-full flex flex-col md:block items-center justify-center gap-16 md:gap-0 md:h-[800px] pt-4 pb-16 md:py-0">
          {/* Bride - Top Left (Floating overlapping on desktop, Top on mobile) */}
          <motion.div
            className="relative md:absolute z-20 w-[220px] h-[280px] md:w-[220px] md:h-[300px] md:left-[5%] lg:left-[15%] md:top-[10%] self-start md:self-auto ml-2 md:ml-0"
            style={{ y: yBride, rotate: rotateBride }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-full h-full p-2 sm:p-3 bg-[var(--clr-ivory)] shadow-[0_10px_30px_rgba(61,8,20,0.2)] rounded-sm group">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={GROOM_PHOTO}
                  alt="Adarsh"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] px-4 py-1.5 rounded-sm shadow-lg rotate-[-5deg]">
                <span
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                  className="font-display text-lg sm:text-xl"
                >
                  Adarsh
                </span>
              </div>
            </div>
          </motion.div>

          {/* Couple - Center (Largest) */}
          <motion.div
            className="relative md:absolute z-10 w-[280px] h-[360px] md:w-[400px] md:h-[520px] md:left-[calc(50%-200px)] md:top-[calc(50%-260px)]"
            style={{ y: yCouple }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 bg-[var(--clr-gold)] transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5" />
              <div className="absolute inset-0 border-[3px] border-[var(--clr-ivory)] overflow-hidden rounded-sm shadow-2xl relative z-10">
                <img
                  src={COUPLE_PHOTO}
                  alt="Together Forever"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-maroon-deep)]/60 to-transparent opacity-60" />
                {/* <h3 
                  className="absolute bottom-6 left-0 right-0 text-center z-20"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "var(--clr-gold-bright, #E5C76B)",
                    fontSize: "var(--fs-2xl, 1.75rem)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                  }}
                >
                  Together Forever
                </h3> */}
              </div>
            </div>
          </motion.div>

          {/* Groom - Bottom Right (Floating overlapping on desktop, Bottom on mobile) */}
          <motion.div
            className="relative md:absolute z-20 w-[220px] h-[280px] md:w-[220px] md:h-[300px] md:right-[5%] lg:right-[15%] md:bottom-[10%] self-end md:self-auto mr-2 md:mr-0"
            style={{ y: yGroom, rotate: rotateGroom }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full p-2 sm:p-3 bg-[var(--clr-ivory)] shadow-[0_10px_30px_rgba(61,8,20,0.2)] rounded-sm group">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={BRIDE_PHOTO}
                  alt="Radhika Nayak"
                  className="w-full h-full object-cover scale-145 transition-transform duration-700 group-hover:scale-[1.50]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-4 -left-4 bg-[var(--clr-gold)] text-[var(--clr-maroon-deep)] px-4 py-1.5 rounded-sm shadow-lg rotate-[5deg]">
                <span
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                  className="font-display  text-lg sm:text-xl font-semibold"
                >
                  Radhika
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating Text Accents */}
          <motion.div
            className="absolute z-0 left-[10%] bottom-[20%] opacity-40 hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ delay: 0.6 }}
          >
            <h4
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "4rem",
                color: "var(--clr-gold)",
              }}
            >
              Two Souls
            </h4>
          </motion.div>
          <motion.div
            className="absolute z-0 right-[10%] top-[20%] opacity-40 hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
          >
            <h4
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "4rem",
                color: "var(--clr-maroon)",
              }}
            >
              One Heart
            </h4>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoFrames;
