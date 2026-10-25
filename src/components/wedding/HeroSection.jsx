import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../constants/testIds";

/* ═══════════════════════════════════════
   Time calculation utility
   ═══════════════════════════════════════ */
const calculateTimeLeft = () => {
  const weddingDate = new Date("2026-11-24T18:00:00+05:30");
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

/* ═══════════════════════════════════════
   Countdown Unit — Elegant glass card
   ═══════════════════════════════════════ */
const CountdownUnit = ({ value, label, delay = 0 }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1.8 + delay, duration: 0.5 }}
  >
    <div
      className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] flex items-center justify-center rounded-xl relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(201,168,76,0.35)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="text-xl sm:text-2xl font-bold relative z-10"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "var(--clr-gold-bright, #E5C76B)",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span
      className="mt-1.5 uppercase tracking-[0.15em]"
      style={{
        fontFamily: "'Outfit', sans-serif",
        color: "rgba(245,236,218,0.6)",
        fontSize: "var(--fs-xs, 0.65rem)",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════
   Decorative mandala-inspired ornament
   ═══════════════════════════════════════ */
const OrnamentalDivider = () => (
  <div className="flex items-center justify-center gap-3 my-5">
    <div className="h-px w-8 sm:w-14" style={{ background: "linear-gradient(90deg, transparent, var(--clr-gold, #C9A84C))" }} />
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" fill="#C9A84C" opacity="0.7" />
      <circle cx="10" cy="10" r="2.5" fill="#E5C76B" opacity="0.9" />
    </svg>
    <div className="h-px w-8 sm:w-14" style={{ background: "linear-gradient(90deg, var(--clr-gold, #C9A84C), transparent)" }} />
  </div>
);

/* ═══════════════════════════════════════════════════
   HERO SECTION — Full viewport dark maroon immersive
   ═══════════════════════════════════════════════════ */
const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-testid={WEDDING.heroSection}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #2D0A10 0%, #4A0E18 35%, #3D0814 65%, #1A0508 100%)",
        padding: "var(--section-pad-y) var(--section-pad-x)",
      }}
    >
      {/* Subtle radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Brand Logo — Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10"
      >
        <img
          src={process.env.PUBLIC_URL + "/logosacred.png"}
          alt="Sacred Knots Logo"
          className="h-7 sm:h-9 w-auto object-contain"
          style={{ filter: "brightness(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
        />
      </motion.div>

      {/* Ganesha + Shloka */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex flex-col items-center text-center"
      >
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center mb-3"
          style={{
            border: "2px solid rgba(201,168,76,0.5)",
            boxShadow: "0 0 40px rgba(201,168,76,0.15), 0 4px 20px rgba(0,0,0,0.3)",
            background: "rgba(255,254,248,0.95)",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/ganesha_odia.png"}
            alt="Lord Ganesha — Odia Pattachitra"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <p
          className="tracking-[0.15em] uppercase font-bold mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--clr-gold, #C9A84C)",
            fontSize: "var(--fs-sm, 0.8rem)",
          }}
        >
          ‖ Shree Ganeshaya Namah ‖
        </p>

        <p
          className="italic max-w-xs leading-relaxed"
          style={{
            fontFamily: "'Noto Sans Devanagari', 'Cormorant Garamond', serif",
            color: "rgba(245,236,218,0.55)",
            fontSize: "var(--fs-xs, 0.7rem)",
            fontWeight: 500,
          }}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </p>
      </motion.div>

      {/* "Together with their families" */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="uppercase tracking-[0.25em] mb-6"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: "rgba(245,236,218,0.45)",
          fontSize: "var(--fs-xs, 0.65rem)",
          fontWeight: 500,
        }}
      >
        {/* Together with their families */}
      </motion.p>

      {/* Groom Name — slides in from left */}
      <motion.div
        className="text-center mb-2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
      >
        <h1
          style={{
            fontFamily: "'Alex Brush', cursive",
            color: "var(--clr-gold-bright, #E5C76B)",
            fontSize: "var(--fs-4xl, 2.75rem)",
            lineHeight: 1.15,
          }}
        >
          Adarsh
        </h1>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(245,236,218,0.45)",
            fontSize: "var(--fs-xs, 0.7rem)",
          }}
        >
          S/o. Mrs. Swapna Dora & Mr. Pradip Kumar Dora
        </p>
      </motion.div>

      {/* Ampersand */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        className="my-3"
      >
        <OrnamentalDivider />
      </motion.div>

      {/* Bride Name — slides in from right */}
      <motion.div
        className="text-center mb-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
      >
        <h1
          style={{
            fontFamily: "'Alex Brush', cursive",
            color: "var(--clr-gold-bright, #E5C76B)",
            fontSize: "var(--fs-4xl, 2.75rem)",
            lineHeight: 1.15,
          }}
        >
          Radhika
        </h1>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(245,236,218,0.45)",
            fontSize: "var(--fs-xs, 0.7rem)",
          }}
        >
          D/o. Mrs. Mita Nayak & Mr. Mukund Ch. Nayak<br />
          {/* <span style={{ fontSize: "0.85em", opacity: 0.8 }}>(Youngest daughter &bull; Gobindpur, Dhenkanal)</span> */}
        </p>
      </motion.div>

      {/* Save the Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-center mt-8 mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
          <p
            className="uppercase tracking-[0.2em]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "rgba(245,236,218,0.5)",
              fontSize: "var(--fs-xs, 0.7rem)",
              fontWeight: 600,
            }}
          >
            Save the Date
          </p>
          <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
        </div>
        <h2
          className="font-bold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--clr-gold, #C9A84C)",
            fontSize: "var(--fs-2xl, 1.75rem)",
          }}
        >
          24 — 26 November, 2026
        </h2>
      </motion.div>

      {/* Countdown */}
      <motion.div
        data-testid={WEDDING.countdownTimer}
        className="flex gap-3 sm:gap-5"
      >
        <CountdownUnit value={timeLeft.days} label="Days" delay={0} />
        <CountdownUnit value={timeLeft.hours} label="Hours" delay={0.1} />
        <CountdownUnit value={timeLeft.minutes} label="Min" delay={0.2} />
        <CountdownUnit value={timeLeft.seconds} label="Sec" delay={0.3} />
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--clr-cream, #FDF6EC), transparent)",
        }}
      />

      {/* Decorative side accents */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)" }}
      />
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
