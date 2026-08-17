# Kanto Studio AI

You are an Elite Staff UX/UI Engineer and Frontend Architect. Your task is to build a production-ready, highly interactive React/Tailwind frontend for "Kanto Studio", an advanced AI Video Rendering Engine.

### 1. DESIGN SYSTEM & TOKENS (STRICT ADHERENCE)

- Design Language: "Editorial Minimalism meets Technical Precision".

- Colors:

  - Background: Premium Cream (`bg-[#F7F5F0]`).

  - Surface/Cards: Pure White (`bg-white`) with an ultra-subtle border (`border-black/5`) and sharp, crisp drop shadows (`shadow-sm` or `shadow-[0_4px_20px_rgba(0,0,0,0.04)]`).

  - Text & Accents: True Black (`text-black`, `bg-black`).

  - Feedback Colors: Emerald (`text-green-600` for success), Rose (`text-red-600` for errors).

- Typography: Use a sharp sans-serif (like Inter or Geist) for UI controls, and a sophisticated Serif for main headings to give an editorial, cinematic feel.

- Radius: Use slight rounding (`rounded-lg`) for a modern, approachable yet professional feel.

### 2. CORE LAYOUT ARCHITECTURE

Implement a sleek sidebar (or top navbar) with a minimalist Kanto Studio logo and clear navigation icons for: [Auth], [Studio], and [Command Center]. Smooth fade transitions between views.

### 3. VIEWS SPECIFICATION

#### VIEW A: THE AUTHENTICATION (Login)

- A full-screen Cream background.

- Centerpiece: A pristine White card.

- Inputs: Email and Password fields with floating labels or very minimal black bottom-borders. Focus state must have a sharp black outline.

- CTA: A solid Black button with White text, scaling down slightly on click (`active:scale-95`).

#### VIEW B: THE STUDIO (Production Workspace)

- Layout: Flawless 50/50 split screen. Full height.

- LEFT PANE (Director's Input):

  - A massive, distraction-free textarea for the scenario prompt.

  - Controls Row: Elegant dropdowns for Aspect Ratio (9:16, 16:9, 1:1, 4:5, 4:3, 21:9).

  - The CTA: A large Black "Generate Sequence" button.

  - Progress HUD: Below the button, build a mock "Terminal/Status" log area. It should show a staged checklist (e.g., "Fetching Skills...", "Parsing Scenario...", "Rendering Audio...", "Exporting MP4") using fade-in animations and a loading spinner.

- RIGHT PANE (Canvas & Output):

  - A pristine White container acting as the video player sandbox.

  - Below it: A highly visible "Download MP4" button that appears only when rendering is complete.

#### VIEW C: COMMAND CENTER (Profile & Config)

- Layout: A scrollable Cream view with a masonry or neat grid of White modular cards.

- MODULE 1 - API Engine Auth:

  - Input field for "Gemini API Key".

  - A "Verify & Save" button. Include a dynamic UI state: visually simulate a ping showing a glowing Green Checkmark (Valid) or Red Cross (Invalid) next to the input.

- MODULE 2 - Skill & Style Injector:

  - A dashed-border Drag & Drop zone for files.

  - A distinct text input for "GitHub Repository URL" with a "Fetch Skills" button.

  - Below it, small sleek tags or chips representing loaded skills (e.g., [Audio Engine Active], [Arabic Typography Loaded]).

- MODULE 3 - The Vault (Video History):

  - A rich grid displaying thumbnails of past generations.

  - Hover states on thumbnails must reveal a dark overlay with two crisp white icons: "Watch Again" (Play) and "Download". Ensure the grid feels like a premium portfolio.

### 4. MICRO-INTERACTIONS & POLISH

- Add `transition-all duration-300 ease-in-out` to all buttons and hoverable elements.

- Use staggered entry animations (Framer Motion or Tailwind animate) when the Command Center or Studio views mount.

- Keep the UI uncluttered. Let the whitespace breathe.

Generate the complete, functional React UI based on this exact architecture.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ce2255d-1d08-4f4a-a16a-ca01abee6e8c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
