export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute -top-[20%] -left-[10%] h-[60vmax] w-[60vmax] rounded-full bg-lavender/15 lumina-breathe" />
      <div className="absolute top-[35%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-teal-glow/10 lumina-breathe [animation-delay:-3s]" />
      <div className="absolute bottom-[-20%] left-[20%] h-[45vmax] w-[45vmax] rounded-full bg-magic-pink/10 lumina-breathe [animation-delay:-5s]" />
      {/* faint star sparkles */}
      <div className="absolute top-[12%] left-[30%] size-1 rounded-full bg-warm-mist/70 lumina-sparkle" />
      <div className="absolute top-[28%] right-[22%] size-1 rounded-full bg-lavender lumina-sparkle [animation-delay:-1s]" />
      <div className="absolute top-[60%] left-[12%] size-1 rounded-full bg-teal-glow lumina-sparkle [animation-delay:-1.6s]" />
      <div className="absolute bottom-[18%] right-[30%] size-1 rounded-full bg-sunset lumina-sparkle [animation-delay:-0.7s]" />
    </div>
  );
}