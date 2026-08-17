import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Kanto Studio" },
      { name: "description", content: "Access the Kanto Studio AI video rendering engine with your director account." },
      { property: "og:title", content: "Sign in — Kanto Studio" },
      { property: "og:description", content: "Access the Kanto Studio AI video rendering engine." },
    ],
  }),
  component: AuthView,
});

function AuthView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="rise w-full max-w-md rounded-lg border border-black/5 bg-card p-10 shadow-crisp">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Kanto Studio</p>
        <h1 className="mt-3 text-4xl">Enter the studio</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to render cinematic sequences with the engine.
        </p>

        <form
          className="mt-9 space-y-7"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("loading");
            setTimeout(() => setStatus("done"), 1200);
          }}
        >
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="director@kanto.studio"
              className="field mt-1 focus:ring-2 focus:ring-ring/80"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="field mt-1 focus:ring-2 focus:ring-ring/80"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 ease-in-out hover:opacity-90 active:scale-95 disabled:opacity-60"
          >
            {status === "loading" ? "Authenticating…" : "Sign in"}
          </button>

          {status === "done" && (
            <p className="rise text-center text-sm text-green-600">Authenticated. Welcome back, director.</p>
          )}
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          No account? Request studio access from your workspace admin.
        </p>
      </div>
    </div>
  );
}
