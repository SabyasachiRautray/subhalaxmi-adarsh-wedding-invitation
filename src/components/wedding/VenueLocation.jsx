import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Home, Share2, Clock, Heart } from "lucide-react";

/* ═══════════════════════════════════════════════════
   VENUES DATA
   ═══════════════════════════════════════════════════ */
const VENUES = {
  "lemon-tree": {
    id: "lemon-tree",
    name: "Hotel Lemon Tree",
    subtitle: "Bharatpur, Bhubaneswar",
    address: "Hotel Lemon Tree, Bharatpur, Bhubaneswar, Odisha — 751003",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar",
    embedUrl:
      "https://www.google.com/maps?q=Lemon+Tree+Hotel+Bharatpur+Bhubaneswar&output=embed",
    icon: "🍋",
    events: [
      { icon: "💛", label: "Haldi", time: "25 Nov · 10 AM", at: "Poolside" },
      {
        icon: "🍸",
        label: "Sangeet",
        time: "25 Nov · 6:30 PM",
        at: "Tangerine Hall 2",
      },
      {
        icon: "💍",
        label: "Reception & Vivah",
        time: "26 Nov · 7:30 PM",
        at: "Tangerine Hall 1 & 2",
      },
      {
        icon: "🙏",
        label: "Muhurtam",
        time: "27 Nov · 5:02 AM*",
        at: "Tangerine Hall 1 & 2",
      },
    ],
  },
  residence: {
    id: "residence",
    name: "Tamarind Terraces",
    subtitle: "Bhubaneswar, Odisha",
    address: "Tamarind Terraces, Bhubaneswar, Odisha",
    googleMapsUrl:
      "https://www.google.com/maps/place/Tamarind+Terraces/@20.3371696,85.7980118,17z/data=!4m6!3m5!1s0x3a1908fa68d81933:0xe70c42d21524710e!8m2!3d20.3374267!4d85.7979575!16s%2Fg%2F11bbrk_9z8",
    embedUrl:
      "https://www.google.com/maps?q=20.3374267,85.7979575&output=embed",
    icon: "🏡",
    events: [
      {
        icon: "🌿",
        label: "Mehendi",
        time: "24 Nov · 6 PM",
        at: "Tamarind Terraces",
      },
      {
        icon: "👑",
        label: "Baraat Flag-off",
        time: "26 Nov · 4 PM",
        at: "Tamarind Terraces",
      },
    ],
  },
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT: VenueLocation
   ═══════════════════════════════════════════════════ */
const VenueLocation = () => {
  const [selectedVenueKey, setSelectedVenueKey] = useState("lemon-tree");

  const venue = VENUES[selectedVenueKey];

  // Handle external selection events (e.g. from EventTimeline)
  useEffect(() => {
    const handleSelectVenue = (e) => {
      const key = e.detail?.venueKey;
      // Map baraat-route to residence since baraat tab is removed
      const resolvedKey = key === "baraat-route" ? "residence" : key;
      if (resolvedKey && VENUES[resolvedKey]) {
        setSelectedVenueKey(resolvedKey);
      }
    };
    window.addEventListener("select-wedding-venue", handleSelectVenue);
    return () =>
      window.removeEventListener("select-wedding-venue", handleSelectVenue);
  }, []);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Join us for Adarsh & Radhika's Wedding!\n\n📍 ${venue.name}\n📌 ${venue.address}\n🗺️ ${venue.googleMapsUrl}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const TABS = [
    { key: "residence", label: "Residence", icon: <MapPin size={14} /> },
    { key: "lemon-tree", label: "Lemon Tree", icon: <Home size={14} /> },
  ];

  return (
    <section
      id="venue-location"
      data-testid="venue-location"
      className="relative overflow-hidden ornate-border-top"
      style={{
        backgroundColor: "var(--clr-cream-dark, #F5ECDA)",
        padding: "var(--section-pad-y) var(--section-pad-x)",
      }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.35)] mb-3">
          <MapPin size={12} className="text-[var(--clr-maroon)]" />
          <span
            className="uppercase tracking-[0.2em] font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--clr-maroon, #6B0F1A)",
              fontSize: "0.62rem",
            }}
          >
            Celebration Venues
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--clr-maroon, #6B0F1A)",
            fontSize: "clamp(2rem, 1.8rem + 2vw, 2.75rem)",
          }}
        >
          Venues &amp; Location
        </h2>

        <p
          className="max-w-md mx-auto mt-2 text-xs sm:text-sm font-sans"
          style={{ color: "var(--clr-text-muted, #6B5C60)" }}
        >
          Find your way to each celebration with ease.
        </p>

        <div
          className="mx-auto mt-3"
          style={{
            width: "50px",
            height: "2px",
            background: "var(--grad-gold)",
            borderRadius: "999px",
          }}
        />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-1 sm:px-4">
        {/* Venue Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {TABS.map((tab) => {
            const isActive = selectedVenueKey === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedVenueKey(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--clr-maroon)] text-[var(--clr-gold-bright)] border-[var(--clr-gold)] shadow-md scale-105"
                    : "bg-[var(--clr-ivory)] text-[var(--clr-text)] border-[rgba(201,168,76,0.3)] hover:border-[var(--clr-gold)]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Venue Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="rounded-3xl overflow-hidden border border-[rgba(201,168,76,0.3)] shadow-[var(--shadow-card)] bg-[var(--clr-ivory)]"
          >
            {/* Map */}
            <div
              className="relative w-full"
              style={{ height: "min(55vw, 340px)" }}
            >
              <iframe
                title={`Map of ${venue.name}`}
                src={venue.embedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Floating venue name badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow border border-amber-200 pointer-events-none">
                <span className="text-base">{venue.icon}</span>
                <div>
                  <p className="font-serif text-xs font-bold text-[var(--clr-maroon)] leading-tight">
                    {venue.name}
                  </p>
                  <p className="text-[10px] text-gray-500 font-sans leading-tight">
                    {venue.subtitle}
                  </p>
                </div>
              </div>
              {/* Open Maps CTA — floating on map */}
              {/* <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold no-underline shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{ background: "var(--grad-maroon)", color: "var(--clr-gold-bright)" }}
              >
                <Navigation size={13} />
                <span>Open Maps</span>
                <ExternalLink size={11} />
              </a> */}
            </div>

            {/* Info Panel */}
            <div className="p-5 sm:p-6">
              {/* Address */}
              <div className="flex items-start gap-3 mb-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/70">
                <MapPin
                  className="text-[var(--clr-maroon)] flex-shrink-0 mt-0.5"
                  size={15}
                />
                <p className="font-sans text-sm text-[var(--clr-text)] leading-relaxed flex-1">
                  {venue.address}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  <Share2 size={12} />
                  <span>Share on WhatsApp</span>
                </button>
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold no-underline transition-transform hover:scale-105 active:scale-95 shadow"
                  style={{
                    background: "var(--grad-maroon)",
                    color: "var(--clr-gold-bright)",
                  }}
                >
                  <Navigation size={12} />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Events at this venue */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={13} className="text-[var(--clr-maroon)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--clr-maroon)]">
                    Events here
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {venue.events.map((ev, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.18)]"
                    >
                      <span className="text-xl flex-shrink-0">{ev.icon}</span>
                      <div className="min-w-0">
                        <p className="font-serif text-sm font-bold text-[var(--clr-maroon-deep)] truncate">
                          {ev.label}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 font-sans">
                          <Clock
                            size={10}
                            className="text-[var(--clr-gold)] flex-shrink-0"
                          />
                          <span className="truncate">{ev.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-sans truncate">
                          {ev.at}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {venue.id === "lemon-tree" && (
                  <p className="text-[10px] text-gray-400 font-sans mt-2 pl-1">
                    * Muhurtam is in the early hours of 27 Nov (starts 5:02 AM)
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VenueLocation;
