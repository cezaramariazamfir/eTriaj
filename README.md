# eTriaj

A neuro-symbolic emergency triage support tool based on the ESI-5 protocol. Combines an LLM for clinical token extraction from free-text patient input with a rule engine formally specified in alethic modal logic and verified using LoTREC 2.0. Built as a bilingual (RO/EN) Progressive Web App.

> **Bachelor's thesis** — University of Bucharest, Faculty of Mathematics and Computer Science, June 2026.

---

## Problem

Emergency departments worldwide face overcrowding: patients with non-urgent conditions occupy critical slots, wait times grow, and triage errors lead to preventable deaths. The ESI-5 (Emergency Severity Index version 5) protocol classifies patients across five urgency levels, but its decision logic is written in natural language and relies entirely on clinical judgment. eTriaj digitalizes this protocol for mobile use, preserving the nuance of the original while making it formally verifiable.

## Architecture

eTriaj uses a neuro-symbolic design that separates two concerns:

**Neural component** — Gemini 2.5 Flash performs semantic normalization only: it maps free-text patient descriptions to a controlled vocabulary of clinical symptom tokens. It never makes triage decisions.

**Symbolic component** — A deterministic rule engine evaluates the extracted tokens against a knowledge base of classification rules formally specified in alethic modal logic. The engine guarantees protocol compliance with no hallucination risk.

```
Free text ──→ /api/extract-tokens (Gemini) ──→ tokenIds[]
                                                    │
Context questions ──→ TriageFlags                   │
                          │                         │
                          └────────→ Rule Engine ──→ ESI Result
                                     + KB
```

### Triage flow

A session runs in two stages:

**Stage A** — `Level1Module` screens for immediate life threats through up to six boolean questions. A single affirmative answer assigns ESI 1 and ends the session.

**Stage B** — `Level2Module` collects context (biological sex, pain level, immune status, blood thinners, obstetric risk) and builds `TriageFlags`. The patient then describes their symptoms in free text, which the LLM processes into a `tokenIds[]` array. The rule engine receives both the token array and the context flags and returns an `ESI Result` containing the classification level, reasoning, high-risk alerts, and required resource types.

The `Orchestrator` manages the transition between modules: each module is unaware of what comes before or after it.

### Knowledge base

The knowledge base consists of two token lists (`criticalTokens.ts` and `generalTokens.ts`), combined at module load into a single KB map. This map is the shared vocabulary between the LLM and the rule engine: any token ID the LLM returns that is not in the map is silently discarded.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, TypeScript, Tailwind CSS 4, Vite 7 |
| Backend | Express 5, `@google/generative-ai` (Gemini 2.5 Flash) |
| PWA | `vite-plugin-pwa`, Workbox |
| Deployment | Vercel (serverless function at `api/extract-tokens.js`) |

## Project structure

```
src/
├── components/     UI components (questions, results, layout)
├── context/        React context providers (language, connectivity)
├── engine/
│   ├── knowledgeBase/   Clinical token definitions (critical + general)
│   ├── ruleEngine/      Deterministic ESI classification engine
│   ├── orchestrator.ts  Session management (Level1 → Level2)
│   └── modules/         Level1Module, Level2Module
├── hooks/          Custom hooks (useTriageFlow, useConnectivity)
├── i18n/           RO/EN translations
└── pages/          React pages
```

## Prerequisites

- Node.js ≥ 22
- A Gemini API key ([get one here](https://aistudio.google.com/apikey))

## Setup

```bash
git clone https://github.com/cezaramariazamfir/eTriaj.git
cd eTriaj
npm install
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_api_key_here
```

## Running locally

Both the frontend and backend need to run concurrently:

```bash
# Terminal 1 — backend (Express on port 3001)
npm run server

# Terminal 2 — frontend (Vite on port 5173, proxies /api → localhost:3001)
npm run dev
```

The Vite dev server proxies `/api` requests to the Express backend automatically.

## Offline behavior

The PWA caches static assets via Workbox for offline use. Stage A (life-threat screening) works fully offline since it uses only the local rule engine. Stage B requires an internet connection for the LLM token extraction step (Gemini API call).

## Internationalization

The app supports Romanian and English, with all UI strings in `src/i18n/translations.ts`. The architecture is extensible to additional languages.


## Deployment

The project is configured for Vercel deployment. `api/extract-tokens.js` is structured as a Vercel serverless function that mirrors the Express endpoint in `server.js`. Set the `GEMINI_API_KEY` environment variable in your Vercel project settings.

## Disclaimer

This is a research prototype developed as a Bachelor's thesis project. It is **not** a certified medical device and must **not** be used for real clinical decision-making. 
