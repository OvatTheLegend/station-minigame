# 📡 SIGNAL//LOST // Research Station Control Desktop

An immersive, narrative-driven retro-futuristic research station OS simulator and mystery puzzle game built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

##  Features

- ** Simulated Station Operating System (`station@signal-03`)**:
  - Reusable, customizable window management system with normal, maximized, and minimized states.
  - Synchronized live station UTC clock hook and interactive taskbar navigation.
  - Persistent ambient server room background hum (`computer_lab.mp3`).

- ** Interactive Signal Receiver (`ReceiverWindow`)**:
  - Wideband frequency tuner ($88.0 - 108.0\text{ MHz}$) with digital LCD readout, stepped tuning buttons (`[-1.0]`, `[-0.1]`, `[+0.1]`, `[+1.0]`), and precision slider.
  - Dynamic 20-bar CSS equalizer visualizer and pulsing radar carrier lock beacon.
  - **Dynamic Audio Layering**: Crossfades between ambient radio static and eerie signal pulse when locked on `104.5 MHz`.
  - **Cross-App Data Extraction**: Clicking *"Record & Extract"* plays a notification chime and dynamically generates new intercept files in the Files app.

- ** Interactive Command Terminal (`TerminalWindow`)**:
  - Station command-line prompt supporting `/help`, `/status`, `/scan`, `/decode <KEY>`, and `/hack`.
  - Timed matrix decryption cascade with automated smooth auto-scrolling (`useRef` + `useEffect`).
  - Audio-synced character-by-character typewriter streaming effect on countermeasure activation.

- ** Persistent Files & Notes (`FilesWindow` & `NotesWindow`)**:
  - Station logs, previous operator notes (*Operator Logan* lore), and encrypted transmission files.
  - Live in-app file viewer with interactive text editing and persistent note scratchpad.

- ** Firewall Defense Minigame (`FirewallWindow`)**:
  - Fullscreen emergency lockdown overlay covering the fake desktop and taskbar.
  - **3-Stage Tactical Flow**: Critical Alarm ➔ System Briefing ➔ $3 \times 3$ Memory Node Grid minigame.
  - 3-2-1 central countdown overlay with asynchronous sequence broadcast.
  - Randomized 5-node security sequence, cyan/red instant color feedback, and anti-spam race-condition protection.

---

##  Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio:** Web Audio API & HTML5 Audio Engine

---

##  Project Architecture

```text
src/
├── app/
│   ├── game/
│   │   └── page.tsx              # Central game orchestrator & state manager
│   ├── globals.css               # Global styles, animations & custom scrollbars
│   ├── layout.tsx                # Root HTML layout
│   └── page.tsx                  # Landing / Home redirect
├── components/
│   ├── DekstopIcons/
│   │   ├── DekstopIcon.tsx       # Reusable desktop application shortcut
│   │   └── TaskBarItem.tsx       # Reusable taskbar item
│   ├── Layout/
│   │   ├── TopBar.tsx            # Top header with station status
│   │   └── BottomBar.tsx         # Bottom status & network bar
│   └── Windows/
│       ├── Window.tsx            # Generic reusable window shell wrapper
│       ├── FilesWindow.tsx       # File manager & live editor
│       ├── TerminalWindow.tsx    # Interactive terminal & decryption module
│       ├── ReceiverWindow.tsx    # Frequency tuner & radio stream analyzer
│       ├── NotesWindow.tsx       # Operator notes scratchpad
│       └── FirewallWindow.tsx    # Emergency 3x3 memory grid minigame overlay
└── hooks/
    ├── useAudioFX.ts             # Web Audio synthesizer & chime effects
    └── useStationTime.ts         # Synchronized live UTC station clock hook
```

---

##  Getting Started

### Prerequisites
Make sure you have **Node.js 18+** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/mini-game.git
   cd mini-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000/game
   ```

---
