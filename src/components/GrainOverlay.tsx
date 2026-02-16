"use client";

export default function GrainOverlay() {
  return (
    <>
      {/* SVG filter definition */}
      <svg className="fixed h-0 w-0">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.035]"
        style={{
          filter: "url(#grain-filter)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Animated dither layer */}
      <div
        className="pointer-events-none fixed inset-0 z-[9989] grain-animate opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
