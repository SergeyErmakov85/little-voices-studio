import { Link } from "@tanstack/react-router";

export function MagicBar() {
  return (
    <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-warm-mist/10 bg-deep-space/80 px-4 py-3 shadow-2xl backdrop-blur-2xl md:gap-4 md:px-6">
      <div className="flex items-center gap-2 pl-2 pr-1">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-glow opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-teal-glow shadow-[0_0_12px_var(--teal-glow)]" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-glow">
          Игрушка на связи
        </span>
      </div>
      <div className="h-5 w-px bg-warm-mist/15" />
      <Link
        to="/world"
        className="rounded-full bg-warm-mist px-5 py-2 text-sm font-bold text-deep-space transition-transform hover:scale-[1.03]"
      >
        Войти в мир Лёвы
      </Link>
      <Link
        to="/coach"
        className="hidden rounded-full border border-warm-mist/20 px-5 py-2 text-sm font-medium text-warm-mist transition-colors hover:bg-warm-mist/10 sm:inline-flex"
      >
        Спросить Элару
      </Link>
    </div>
  );
}