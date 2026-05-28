
# PrepWise 🚀
### *The Premium AI-Powered Mock Interview Simulator & Feedback Ecosystem*
  

PrepWise is a production-ready, highly polished, immersive AI interview coaching platform designed to elevate software engineering and HR candidates into elite-level communicators. Crafted with deep glassmorphic visuals, dynamic state orchestration, custom native audio synthesis, and a pure-frontend modular heuristic engine, PrepWise replicates the exact pressure, pacing, and analytical rigor of top-tier technology companies.

---

## 🎨 Core SaaS Features & Immersion Layers

### 1. Immersive Dual-Screen Interview Simulator
* **Staged Hologram Diagnostics:** Watch the AI Coach process your answers in real time through glowing scanning bars, mock neural analysis states, and progressive score reveals.
* **Audio Wave Visualizer:** A custom, canvas-free HTML/CSS-animated oscillator wave that contracts or expands dynamically based on the length, pace, and intensity of your input.
* **Adaptive Question Pacing:** Simulates real human-like dialogue with contextual transition commentaries based on coach personalities.

### 2. Behavioral Heuristic Evaluation Engine
* **STAR Storytelling Audit:** Detects whether you structured your response around *Situation*, *Action*, and *Result* anchors.
* **Conciseness Calibration:** Analyzes word count versus target lengths to grade responses as *Optimal*, *Too Verbose*, or *Too Brief*.
* **Hesitation & Crutch-Word Counters:** Tracks occurrences of filler words (*"um"*, *"uh"*, *"basically"*, *"literally"*, *"you know"*) and hesitant speech indicators.
* **Technical Keyword Matching:** Scans for standard domain concepts mapped to technical databases (e.g., *React Rendering*, *Memory Leaks*, *Concurrency*).

### 3. Career Command Center Analytics
* **Interactive Streaks Counter:** Keep motivated with session streaks tracked securely in browser caches.
* **SVG Progression Trends:** Beautiful, glowing inline SVG charts mapping session scores dynamically across histories.
* **Dream Company Calibration:** Sliding settings drawer allowing you to customize goals, targets, and ambient voice frequencies.

### 4. Cinematic Film Review Center
* **Dual-State Speech Scrubber:** Toggle instantly between the raw, unfiltered speech transcript and the polished, professionally revised version.
* **Coach Commentary Comparison:** Directly compare your answers alongside AI Benchmarks, complete with color-coded bullet lists for strengths, weaknesses, and improvement suggestions.

### 5. Multi-Theme Glassmorphism
* **Midnight (Default):** A deep-space cinematic backdrop with glowing neon cyber-sparks.
* **Titanium Graphite:** A sleek, minimal dark charcoal slate modeled after high-end developer interfaces.
* **Professional Light:** A high-contrast, clean slate style utilizing soft drop-shadow elevations and solid opaque overlays for optimal readability in bright environments.

---

## 📐 Mathematical Heuristics Scorer Formulation

The heuristics engine (`src/utils/evaluation.js`) executes complex multi-dimensional scoring equations without relying on expensive backend models, guaranteeing instant local analysis:

### 1. Technical Knowledge Score ($S_{tech}$)
$$\text{Keyword Coverage } (C) = \frac{\text{Matched Keywords}}{\text{Total Keywords}} \times 100$$
$$S_{tech} = \text{Min}\left(\frac{\text{Word Count}}{\text{Target Word Count}} \times 45, 45\right) + \left(\frac{C}{100} \times 55\right)$$
*Strict Coach Marcus applies a flat $-6$ point penalty. Friendly Coach Sophia adds a $+4$ safety-net boost.*

### 2. Communication Delivery Index ($S_{comm}$)
$$\text{STAR Coverage } (SC) = \frac{\text{STAR Steps Used}}{3} \times 40$$
$$\text{Transition Bonus } (TB) = \text{Min}(\text{Transitions Count} \times 8, 20)$$
$$\text{Conciseness Multiplier } (M) = 
\begin{cases} 
1.0 & \text{Optimal Length} \\
0.75 & \text{Too Verbose} \\
0.5 & \text{Too Brief} 
\end{cases}$$
$$S_{comm} = (40 + SC + TB) \times M$$

### 3. Confidence Indicator Score ($S_{conf}$)
$$\text{Crutch Word Penalty } (P_{crutch}) = \text{Filler Count} \times 4$$
$$\text{Hesitation Penalty } (P_{hes}) = \text{Hesitation Count} \times 6$$
$$S_{conf} = \text{Max}\left(100 - P_{crutch} - P_{hes}, 10\right)$$
*Adjusts dynamically based on duration thresholds, rewarding deliberate, concise delivery.*

---

## 🏛️ Modular Decoupled Architecture

PrepWise is organized using a strict decoupled architecture. The heuristics scoring core, synthetic sounds, and coach presets remain independent and can be swapped for live API connections (like Gemini, OpenAI, or speech analytics engines) with zero changes to the UI layer:

```
prepwise/
├── public/
│   └── favicon.svg          # Custom glowing overlapping cyber-spark logo
├── src/
│   ├── App.jsx              # Routing intercept, authentication & active theme injection
│   ├── index.css            # Custom Tailwind v4 CSS-first design variables & light theme contrast layers
│   ├── main.jsx             # React standard entry point
│   ├── components/          # Reusable UI components
│   │   ├── AnimatedButton.jsx
│   │   ├── Navbar.jsx       # Custom sliding settings drawer
│   │   ├── ScoreCircle.jsx  # SVG round progressive gauges
│   │   └── QuestionCard.jsx
│   ├── data/                # Presets
│   │   ├── personalities.js # Sophia, Marcus, Vikram, Sarah, Elon presets
│   │   └── idealAnswers.js  # Heuristic NLP comparison answers
│   ├── layouts/
│   │   └── MainLayout.jsx   # Header, active gradients, footer wrapper
│   ├── pages/               # Feature-rich page layouts
│   │   ├── AuthSplash.jsx   # Linear/Perplexity-grade onboarding registration
│   │   ├── LandingPage.jsx  # SaaS product presentation
│   │   ├── RoleSelectionPage.jsx
│   │   ├── InterviewInterface.jsx # Cinematic split-screen simulator
│   │   ├── FeedbackDashboard.jsx  # Command Center & Replay Film Review
│   │   └── NotFoundPage.jsx # Catch-all glassmorphic 404 viewport
│   └── utils/               # Decoupled Core Logic
│       ├── audio.js         # Web Audio API minimal sci-fi oscillators
│       └── evaluation.js    # Decoupled NLP Heuristic Evaluator
└── index.html               # Main page, SEO triggers, OpenGraph metadata
```

---

## ⚡ Quick Start & Deployment Guide

Follow these steps to run or compile PrepWise locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Clone the repository
git clone https://github.com/jiyathakur-30/prepwise.git
cd prepwise

# Install packages
npm install
```

### 3. Start Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open `http://localhost:5173` to explore the platform.

### 4. Build for Production
Create the optimized SaaS bundle:
```bash
npm run build
```
Vite will compile the code into `/dist`, ready for deployment on **Vercel**, **Netlify**, or standard web hosts.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

### *Made with 💜 for developers, by the PrepWise Team.*


