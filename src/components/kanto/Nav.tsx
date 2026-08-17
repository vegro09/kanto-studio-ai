import { Link } from "@tanstack/react-router";
import { LogIn, Clapperboard, SlidersHorizontal } from "lucide-react";

const items = [
  { to: "/auth", label: "Auth", icon: LogIn },
  { to: "/", label: "Studio", icon: Clapperboard },
  { to: "/command", label: "Command Center", icon: SlidersHorizontal },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="block h-5 w-5 rounded-sm bg-primary" />
          <span className="serif text-xl leading-none">Kanto Studio</span>
        </Link>

        <nav className="flex items-center gap-1">
          {items.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 ease-in-out hover:bg-white hover:text-foreground"
              activeProps={{
                className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
