import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../../constants/testIds";
import { MapPin, Clock, ChevronRight, ChevronLeft, Navigation } from "lucide-react";

const HALDI_BG = "/haldi.webp";
const SANGEET_BG = "/reception.webp";
const MEHENDI_BG = "/mehndi.webp";
const TOAST_BG = "/wedding.webp";

const events = [
  {
    day: "Day 1",
    date: "24th November 2026",
    title: "मेहंदी",
    tagline: "Pyar Ka Rang",
    venue: "Tamarind Terraces, Bhubaneswar",
    venueKey: "residence",
    googleMapsUrl: "https://www.google.com/maps/place/Tamarind+Terraces/@20.3371696,85.7980118,17z/data=!4m6!3m5!1s0x3a1908fa68d81933:0xe70c42d21524710e!8m2!3d20.3374267!4d85.7979575!16s%2Fg%2F11bbrk_9z8",
    image: MEHENDI_BG,
    accent: "#2D8B4E",
    items: [
      {
        name: "मेहंदी (Mehendi) — Pyar Ka Rang",
        time: "6:00 PM onwards",
        location: "Tamarind Terraces, Bhubaneswar",
        dressCode: "Festive Green / Ethnic",
      },
    ],
  },
  {
    day: "Day 2",
    date: "25th November 2026",
    title: "हल्दी & शाम शानदार",
    tagline: "Rango Ka Mela & Just Toast On The Coast",
    venue: "Hotel Lemon Tree, Bharatpur, Bhubaneswar",
    venueKey: "lemon-tree",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
    image: HALDI_BG,
    accent: "#E5A829",
    items: [
      {
        name: "हल्दी (Haldi) — Rango Ka Mela",
        time: "10:00 AM onwards",
        location: "Poolside, Hotel Lemon Tree, Bharatpur, Bhubaneswar",
        dressCode: "Vibrant Yellow / Sunny Traditional",
      },
      {
        name: "शाम शानदार (Sangeet) — Just Toast On The Coast",
        time: "6:30 PM onwards",
        location: "Tangerine Grand Hall 2, Hotel Lemon Tree, Bharatpur, BBSR",
        dressCode: "Evening Cocktail & Glamour",
      },
    ],
  },
  {
    day: "Day 3",
    date: "26th November 2026",
    title: "बारात & विवाह (Reception)",
    tagline: "The Royal Chariot & The Sacred Union of Souls",
    venue: "From Tamarind Terraces to Hotel Lemon Tree, Bharatpur, Bhubaneswar",
    venueKey: "baraat-route",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
    image: SANGEET_BG,
    accent: "#C9A84C",
    items: [
      {
        name: "बारात (Baraat) — The Royal Chariot",
        time: "4:00 PM",
        location: "From Tamarind Terraces to Hotel Lemon Tree, Bharatpur, Bhubaneswar",
        dressCode: "Traditional / Regal",
      },
      {
        name: "विवाह & Reception — The Sacred Union of Souls",
        time: "7:30 PM onwards",
        location: "Tangerine Grand Hall 1 & 2, (1st & 5th Floor), Hotel Lemon Tree, Bharatpur, Bhubaneswar",
        dressCode: "Royal Traditional Elegance",
      },
      {
        name: "शुभ विवाह मुहूर्त (Wedding Muhurtam)",
        time: "5:02 AM (27 Nov, pre-dawn)",
        location: "Tangerine Grand Hall 1 & 2, Hotel Lemon Tree",
        dressCode: "Traditional Auspicious Attire",
      },
    ],
  },
  // {
  //   day: "Day 4",
  //   date: "27th November 2026",
  //   title: "शुभ विवाह मुहूर्त",
  //   tagline: "The Auspicious Muhurtam (Pre-Dawn)",
  //   venue: "Tangerine Grand Hall 1 & 2, Hotel Lemon Tree, Bharatpur, Bhubaneswar",
  //   venueKey: "lemon-tree",
  //   googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
  //   image: TOAST_BG,
  //   accent: "#6B0F1A",
  //   items: [
  //     {
  //       name: "शुभ विवाह मुहूर्त (Wedding Muhurtam)",
  //       time: "5:02 AM (27 Nov, pre-dawn)",
  //       location: "Tangerine Grand Hall 1 & 2, Hotel Lemon Tree",
  //       dressCode: "Traditional Auspicious Attire",
  //     },
  //   ],
  // },
];

/* ═══════════════════════════════════════════════════════
   EVENT TIMELINE — Interactive Story / Glassmorphism Slider
   ═══════════════════════════════════════════════════════ */
const EventTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 5000); // 7 seconds per slide
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const currentEvent = events[activeIndex];

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      data-testid={WEDDING.eventTimeline}
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[var(--clr-maroon-deep)]"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={stopAutoplay}
      onTouchEnd={startAutoplay}
    >
      {/* Background Image Crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            src={currentEvent.image}
            alt="Event Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-maroon-deep)] via-transparent to-[var(--clr-maroon-deep)] opacity-80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 h-full flex flex-col">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.25em] font-bold mb-2"
            style={{ color: "var(--clr-gold)", fontSize: "var(--fs-xs, 0.7rem)" }}
          >
            Wedding Celebrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "var(--clr-ivory)",
              fontSize: "var(--fs-3xl, 2.5rem)",
            }}
          >
            Our Journey of Celebrations
          </motion.h2>
        </div>

        {/* Main Content Area - Glassmorphism Card */}
        <div className="flex-1 flex items-center justify-center relative min-h-[450px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -40) {
                  handleNext();
                } else if (swipe > 40) {
                  handlePrev();
                }
              }}
              className="w-full max-w-4xl bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-[rgba(201,168,76,0.2)] rounded-3xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-8 items-center cursor-grab active:cursor-grabbing"
            >
              {/* Left side: Image Focus */}
              <div className="w-full md:w-1/2 relative group rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video md:aspect-square shadow-2xl">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.day}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-[var(--clr-gold)] text-[var(--clr-maroon-deep)] text-xs font-bold uppercase tracking-widest rounded-full mb-2">
                    {currentEvent.day}
                  </span>
                  <h3 className="text-white font-serif text-2xl sm:text-3xl font-bold drop-shadow-md">
                    {currentEvent.date}
                  </h3>
                </div>
              </div>

              {/* Right side: Event Details */}
              <div className="w-full md:w-1/2 flex flex-col text-[var(--clr-ivory)]">

                <div className="flex items-start gap-3 mb-6 bg-[rgba(255,255,255,0.1)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                  <MapPin className="text-[var(--clr-gold)] mt-1 flex-shrink-0" size={20} />
                  <p className="font-sans text-sm sm:text-base leading-relaxed">
                    {currentEvent.venue}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentEvent.items.map((item, i) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-[var(--clr-gold)]"
                    >
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--clr-gold)]" />
                      <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--clr-gold-bright)] mb-2">
                        {item.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Clock size={16} className="text-[var(--clr-gold)]" />
                          <span className="font-sans text-sm font-medium">{item.time}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1.5 bg-[rgba(201,168,76,0.15)] px-3 py-1 rounded-full border border-[rgba(201,168,76,0.3)]">
                            <MapPin size={13} className="text-[var(--clr-gold-bright)]" />
                            <span className="font-sans text-xs font-semibold text-[var(--clr-gold-bright)]">
                              {item.location}
                            </span>
                          </div>
                        )}
                        {/* {item.dressCode && (
                          <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.2)]">
                            <Shirt size={14} className="text-gray-300" />
                            <span className="font-sans text-xs font-medium text-gray-200">
                              Dress: <strong className="text-white">{item.dressCode}</strong>
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Actions */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)] flex flex-wrap justify-center gap-2.5 w-full">
                  {/* Direct Google Maps link */}
                  {currentEvent.googleMapsUrl && (
                    <a
                      href={currentEvent.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--clr-maroon-deep)] bg-[var(--clr-gold)] hover:bg-[var(--clr-gold-bright)] shadow-[0_4px_16px_rgba(201,168,76,0.3)] transition-all duration-300 hover:scale-105 no-underline text-center"
                    >
                      <Navigation size={14} />
                      <span>Open in Google Maps</span>
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 z-20 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[var(--clr-gold)] hover:text-[var(--clr-maroon-deep)] border border-[rgba(255,255,255,0.2)] items-center justify-center text-white transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-0 z-20 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[var(--clr-gold)] hover:text-[var(--clr-maroon-deep)] border border-[rgba(255,255,255,0.2)] items-center justify-center text-white transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bottom Navigation Tabs / Dots */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 z-20">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 uppercase tracking-wider ${activeIndex === idx
                ? "bg-[var(--clr-gold)] text-[var(--clr-maroon-deep)] shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                : "bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)]"
                }`}
            >
              Day {idx + 1}
              {activeIndex === idx && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full border-2 border-[var(--clr-gold-bright)] -m-1"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventTimeline;
