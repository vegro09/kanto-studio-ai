import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, Film, Loader2, Check, Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanto Studio — AI Video Rendering Engine" },
      {
        name: "description",
        content:
          "Write a scenario, pick an aspect ratio, and render cinematic AI video sequences in the Kanto Studio workspace.",
      },
      { property: "og:title", content: "Kanto Studio — AI Video Rendering Engine" },
      {
        property: "og:description",
        content: "Write a scenario and render cinematic AI video sequences in Kanto Studio.",
      },
    ],
  }),
  component: StudioView,
});

const RATIOS = ["9:16", "16:9", "1:1", "4:5", "4:3", "21:9"] as const;
const STAGES = [
  "Fetching Skills…",
  "Parsing Scenario…",
  "Composing Shot List…",
  "Rendering Audio…",
  "Exporting MP4",
];

const ASPECT: Record<string, string> = {
  "9:16": "9 / 16",
  "16:9": "16 / 9",
  "1:1": "1 / 1",
  "4:5": "4 / 5",
  "4:3": "4 / 3",
  "21:9": "21 / 9",
};

function StudioView() {
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<string>("16:9");
  const [quality, setQuality] = useState("Cinematic 4K");
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const running = step >= 0 && step < STAGES.length;
  const complete = step === STAGES.length;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), (i + 1) * 1100));
    });
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      {/* LEFT — Director's input */}
      <section className="rise flex flex-col gap-6 border-b border-black/5 p-8 lg:border-b-0 lg:border-r lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Director's Input</p>
          <h1 className="mt-2 text-4xl">Compose the sequence</h1>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the scenario. Camera, mood, pacing, narration…"
          className="min-h-[240px] flex-1 resize-none rounded-lg border border-black/5 bg-card p-6 text-base leading-relaxed shadow-crisp outline-none transition-all duration-300 ease-in-out placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Aspect Ratio</span>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-black/5 bg-card px-4 py-3 text-sm shadow-crisp outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-ring"
            >
              {RATIOS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Render Profile</span>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-black/5 bg-card px-4 py-3 text-sm shadow-crisp outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-ring"
            >
              {["Cinematic 4K", "Standard 1080p", "Draft Preview"].map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={generate}
          disabled={running}
          className="w-full rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 ease-in-out hover:opacity-90 active:scale-95 disabled:opacity-60"
        >
          {running ? "Rendering…" : "Generate Sequence"}
        </button>

        {step >= 0 && (
          <div className="rise rounded-lg border border-black/5 bg-card p-5 font-mono text-xs shadow-crisp">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Render Log</span>
              <span>{complete ? "complete" : "active"}</span>
            </div>
            <ul className="space-y-2">
              {STAGES.map((s, i) => {
                const done = i < step;
                const active = i === step;
                if (i > step) return null;
                return (
                  <li key={s} className="rise flex items-center gap-2.5">
                    {done ? (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    )}
                    <span className={done ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                    {active && <span className="ml-auto text-muted-foreground">…</span>}
                  </li>
                );
              })}
            </ul>
            {complete && (
              <p className="mt-3 border-t border-black/5 pt-3 text-green-600">
                ✓ Sequence exported · {ratio} · {quality}
              </p>
            )}
          </div>
        )}
      </section>

      {/* RIGHT — Canvas */}
      <section className="rise flex flex-col items-center justify-center gap-6 p-8 lg:p-12">
        <div className="w-full max-w-xl">
          <div
            className="flex w-full items-center justify-center overflow-hidden rounded-lg border border-black/5 bg-card shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            style={{ aspectRatio: ASPECT[ratio] }}
          >
            {complete ? (
              <button className="group flex flex-col items-center gap-3 text-sm text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 ease-in-out group-hover:scale-105">
                  <Play className="h-6 w-6" />
                </span>
                Play sequence
              </button>
            ) : running ? (
              <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                Rendering frames…
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                <Film className="h-6 w-6" />
                Canvas idle — generate to preview
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {ratio} · {quality}
            </span>
            <span>{complete ? "00:24 · 38 MB" : "—"}</span>
          </div>

          {complete && (
            <button className="rise mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 ease-in-out hover:opacity-90 active:scale-95">
              <Download className="h-4 w-4" />
              Download MP4
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
