import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Loader2, UploadCloud, Github, Play, Download } from "lucide-react";

export const Route = createFileRoute("/command")({
  head: () => ({
    meta: [
      { title: "Command Center — Kanto Studio" },
      {
        name: "description",
        content: "Configure API keys, inject skills and styles, and browse your rendered video vault in Kanto Studio.",
      },
      { property: "og:title", content: "Command Center — Kanto Studio" },
      { property: "og:description", content: "Configure keys, inject skills, and browse your rendered video vault." },
    ],
  }),
  component: CommandView,
});

const VAULT = [
  { title: "Desert Monologue", ratio: "9:16", date: "Aug 12" },
  { title: "Neon Interchange", ratio: "16:9", date: "Aug 09" },
  { title: "Studio Portrait", ratio: "1:1", date: "Aug 04" },
  { title: "Coastal Drift", ratio: "21:9", date: "Jul 28" },
  { title: "Archive No. 07", ratio: "4:5", date: "Jul 21" },
  { title: "Midnight Transit", ratio: "16:9", date: "Jul 14" },
];

function CommandView() {
  const [key, setKey] = useState("");
  const [ping, setPing] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [repo, setRepo] = useState("");
  const [dragging, setDragging] = useState(false);
  const [skills, setSkills] = useState(["Audio Engine Active", "Arabic Typography Loaded"]);

  const verify = () => {
    setPing("checking");
    setTimeout(() => setPing(key.trim().length > 12 ? "valid" : "invalid"), 1100);
  };

  const fetchSkills = () => {
    if (!repo.trim()) return;
    const name = repo.split("/").filter(Boolean).pop() ?? "Repo";
    setSkills((s) => Array.from(new Set([...s, `${name} Skillset`])));
    setRepo("");
  };

  return (
    <div className="px-6 py-12 lg:px-12">
      <div className="rise mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Command Center</p>
        <h1 className="mt-2 text-5xl">Engine configuration</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Credentials, injected skills, and the archive of every sequence the engine has rendered.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Module 1 */}
        <section
          className="rise rounded-lg border border-black/5 bg-card p-7 shadow-crisp lg:col-span-1"
          style={{ animationDelay: "60ms" }}
        >
          <h2 className="text-2xl">API Engine Auth</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Connect the generation backend.</p>

          <div className="mt-6 flex items-center gap-3">
            <input
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setPing("idle");
              }}
              placeholder="Gemini API Key"
              className="field focus:ring-2 focus:ring-ring/80"
            />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
              {ping === "checking" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              {ping === "valid" && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/10 shadow-[0_0_0_4px_rgba(22,163,74,0.08)]">
                  <Check className="h-4 w-4 text-green-600" />
                </span>
              )}
              {ping === "invalid" && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/10 shadow-[0_0_0_4px_rgba(220,38,38,0.08)]">
                  <X className="h-4 w-4 text-red-600" />
                </span>
              )}
            </span>
          </div>

          <button
            onClick={verify}
            className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 ease-in-out hover:opacity-90 active:scale-95"
          >
            Verify & Save
          </button>

          {ping === "valid" && <p className="mt-3 text-sm text-green-600">Key verified — engine online.</p>}
          {ping === "invalid" && <p className="mt-3 text-sm text-red-600">Invalid key — ping rejected.</p>}
        </section>

        {/* Module 2 */}
        <section
          className="rise rounded-lg border border-black/5 bg-card p-7 shadow-crisp lg:col-span-2"
          style={{ animationDelay: "140ms" }}
        >
          <h2 className="text-2xl">Skill & Style Injector</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Upload assets or pull a skill repository.</p>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const names = Array.from(e.dataTransfer.files).map((f) => f.name);
              if (names.length) setSkills((s) => Array.from(new Set([...s, ...names])));
            }}
            className={`mt-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center transition-all duration-300 ease-in-out ${
              dragging ? "border-black bg-secondary" : "border-black/20"
            }`}
          >
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm">Drag & drop skill files, fonts, or LUTs</p>
            <p className="text-xs text-muted-foreground">.zip · .json · .ttf · .cube</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">GitHub Repository URL</span>
              <div className="mt-1 flex items-center gap-2">
                <Github className="h-4 w-4 text-muted-foreground" />
                <input
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="https://github.com/kanto/skills-audio"
                  className="field focus:ring-2 focus:ring-ring/80"
                />
              </div>
            </label>
            <button
              onClick={fetchSkills}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 ease-in-out hover:opacity-90 active:scale-95"
            >
              Fetch Skills
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rise rounded-full border border-black/10 px-3 py-1.5 text-xs transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Module 3 */}
        <section
          className="rise rounded-lg border border-black/5 bg-card p-7 shadow-crisp lg:col-span-3"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl">The Vault</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Every sequence rendered by the engine.</p>
            </div>
            <span className="text-xs text-muted-foreground">{VAULT.length} items</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VAULT.map((v, i) => (
              <figure key={v.title} className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-black/5 bg-secondary">
                  <div
                    className="absolute inset-0 transition-all duration-300 ease-in-out group-hover:scale-105"
                    style={{
                      background: `linear-gradient(${130 + i * 25}deg, rgba(0,0,0,0.85), rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7))`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                    <button
                      aria-label="Watch again"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/15 active:scale-95"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Download"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/15 active:scale-95"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-sm">
                  <span>{v.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {v.ratio} · {v.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
