import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Сегодня" },
  { to: "/world", label: "Мир Мартина" },
  { to: "/routines", label: "Ритуалы" },
  { to: "/lessons", label: "Уроки" },
  { to: "/method", label: "Метод" },
  { to: "/coach", label: "Коуч" },
  { to: "/progress", label: "Прогресс" },
] as const;

export function TopNav() {
  return (
    <nav className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12 md:py-8">
      <Link to="/" className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-magic-pink to-sunset shadow-lg shadow-magic-pink/30">
          <div className="size-6 rounded-full border-2 border-warm-mist/70" />
        </div>
        <div className="leading-tight">
          <span className="text-display block text-2xl font-bold tracking-tight text-warm-mist">
            Lumina
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-warm-mist/50">
            Чтобы говорить, нужны двое
          </span>
        </div>
      </Link>

      <div className="lumina-glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-warm-mist/70 transition-colors hover:text-warm-mist"
            activeProps={{
              className:
                "rounded-full px-4 py-1.5 text-sm font-semibold bg-warm-mist text-deep-space hover:!text-deep-space",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="lumina-glass flex items-center gap-4 rounded-full px-5 py-2.5">
        <div className="flex -space-x-2">
          <div className="grid size-8 place-items-center rounded-full border-2 border-deep-space bg-teal-glow text-[10px] font-bold text-deep-space">
            JD
          </div>
          <div className="grid size-8 place-items-center rounded-full border-2 border-deep-space bg-lavender text-[10px] font-bold text-deep-space">
            LEO
          </div>
        </div>
        <div className="h-4 w-px bg-warm-mist/20" />
        <span className="text-xs font-medium text-warm-mist/80">
          Мартин · <span className="text-teal-glow">Первооткрыватель</span>
        </span>
      </div>
    </nav>
  );
}