# IQONIC feature coverage — source audit

Baseline: `/Users/edorfanini/Projects/iqon-app-scan-release/mobile`, git `b99a5aeaef80dd8be2756f38f036c4c6f0f6729c`. This identifies the supplied release-source checkout, not independently verified App Store binary parity.

## Lifestyle captures delivered
Paths below are relative to mobile. All PNGs in `/Users/edorfanini/Projects/IQONICWEBSITE/public/screens/v2/` are real unmodified source components mounted in React Native Web, not native/signed-in screenshots. Visible strip: OFFLINE DEMO · SYNTHETIC DATA · WEB RENDER. The harness uses no private health data or account credentials.

| Feature | Source | Capture and limits |
|---|---|---|
| Nutrition dashboard, calories/protein/carbs/fat/fiber goal rings, meals, editable goals | `app/nutrition.tsx`, `utils/lifestyle.ts` | `nutrition.png`: synthetic meals and actual rings/meal list |
| Food entry: common foods, text search, barcode lookup, manual macros | `app/log-food.tsx`, `utils/nutritionApi.ts` | `meal-scan-input.png`: common-food list and scan/barcode entry controls. Search/lookup transport disabled; manual entry exists in source but modal not captured |
| Meal-photo input and review-before-log | `app/log-food.tsx`, also `app/nutrition.tsx` | `meal-scan.png`: actual review modal, entered via actual Meal scan handler. Camera/manipulation/API return synthetic fixtures; no photograph analyzed and no AI/API request made. Native camera UI not captured |
| Water tracking, quick protein/calorie adds, weight sparkline | `app/(tabs)/lifestyle.tsx`, `utils/lifestyle.ts` | `lifestyle.png`; synthetic values |
| Weight logs, goal, graph ranges, monthly/all history | `app/weight-tracking.tsx`, `utils/lifestyle.ts` | `weight.png`; synthetic dated weights, not an efficacy/result claim |
| Sleep logs, weekly graph, manual fallback | `app/(tabs)/lifestyle.tsx`, `utils/lifestyle.ts`, `utils/health.ts` | `health.png`: scrolled actual lifestyle screen showing sleep and Health connector; manual synthetic sleep |
| Apple Health steps, active energy, sleep permission/import support | `utils/health.ts`, `app/(tabs)/lifestyle.tsx` | `health.png` and `lifestyle.png`: disconnected invitation, dashes for steps/energy. No Apple Health connection or permission success claimed. This release has NO Apple Health integration row in `app/profile.tsx`; integration lives on Lifestyle |
| Progress photo capture/import/gallery | `app/progress-photos.tsx`, `utils/lifestyle.ts` | `progress.png`: actual empty state, no personal photos |
| Menstrual cycle range/confidence, phase/current cycle, history, symptoms, body-metric overlays, protocol timeline, observations, clinician report | `app/cycle.tsx`, `components/cycle/*`, `utils/cycleEngine.ts`, `utils/cycleCopy.ts`, `utils/cycleReport.ts` | `cycle.png`: actual cycle screen with synthetic period logs processed by unmodified real engine. Shows current day, estimate window/confidence, history. Lower sections are in source, not all visible in this viewport. No medical/pregnancy/birth-control claims |
| Cycle logging, goals, local privacy/lock, auto-delete and export | `components/cycle/CycleLogSheet.tsx`, `app/cycle-settings.tsx`, `components/cycle/CycleDataActions.tsx`, `utils/cycleStore.ts`, `utils/cycleAccess.ts`, `utils/cycleNotifications.ts` | Source audited. Cycle is normally offered to Female profiles. Only capture-build profile/access and persistence are fixtures; no production gate changed. Keychain/biometric/export not exercised |

## Other major acquisition capabilities — coordinate captures with research worker

| Feature | Source | Capture coverage in this worker |
|---|---|---|
| Daily home: next-dose timer, weekly strip, dose completion, streak/adherence and per-compound counts | `app/(tabs)/index.tsx`, `utils/doses.ts`, `utils/scheduling.ts` | Research worker / not captured here |
| Dose calendar and day details | `app/calendar.tsx`, `components/CalendarGrid.tsx` | Research worker |
| Multi-compound schedules, daily/weekly/every-X-days, start/time, edit and restart | `app/protocol-wizard.tsx`, `app/(tabs)/protocols.tsx`, `utils/scheduling.ts` | Research worker |
| Protocol templates and suggested schedules | `app/protocol-templates.tsx`, `data/protocolTemplates.ts`, `app/protocol-wizard.tsx` | Research worker |
| Vial inventory, remaining mL/doses, stock and low-vial state | `app/(tabs)/protocols.tsx`, `utils/storage.js`, `utils/doses.ts` | Research worker |
| Reconstitution/concentration/draw-unit calculator, dose tiers and supply estimator | `app/(tabs)/calculator.tsx`, `components/DoseSelector.tsx`, `components/SyringeGuide.tsx`, `utils/doseFormat.js`, `data/peptides.js` | Research worker; educational research math, not personalized medical advice |
| Spending: entered vial prices, monthly trend, per-peptide cost, cost/day, supply and annual projections | `app/spending.tsx`, `app/protocol-wizard.tsx`, `app/(tabs)/protocols.tsx` | Research worker; user-entered/estimated, not bank/account integration |
| Searchable/filterable research library, compound detail, risk/source/dose/timing/reconstitution | `app/(tabs)/library.tsx`, `data/peptides.js` | Research worker |
| Pep Learn course, chapters, progress/completion | `app/learn.tsx`, `data/learnLessons.ts` | Research worker |
| Interaction warnings/timing/synergies | `app/(tabs)/index.tsx` interactions modal | Static curated rules in source; not comprehensive medication-interaction clearance |
| Dose notifications | `utils/notifications.js`, `app/_layout.tsx`, schedule flows | Source-supported; native delivery not exercised |
| Account/profile/name/sex, appearance palette, sign-out/delete, help/legal | `app/profile.tsx`, `utils/appearance.ts`, `contexts/auth.tsx`, auth routes | Isolated profile route is runnable but no public screenshot requested. Not captured/authenticated |
| Subscription purchase/restore/paywall, affiliate/referral support | `app/paywall.tsx`, `utils/purchases.ts`, `utils/affiliates.ts` | Source presence only; no transactions attempted |
| Supplier outbound link | `components/VialSourceLink.tsx` in schedule/editor/onboarding | Source link exists; not an integrated checkout proof |

## Do NOT market as currently working

- Progress video: `app/progress-photos.tsx` `openVideoBuilder` displays **Coming soon**. The card exists, but do not claim shipped video generation.
- General profile Export Data: `app/profile.tsx` shows **Coming Soon**. Distinguish it from cycle-specific export/report code.
- AI Insights: home handler explicitly says **Coming Soon**. Meal photo scanning is separate.
- `app/shop.tsx` contains hardcoded named stacks/cart/prices. Do not call this functioning personalized commerce without a separate implementation audit.
- Profile privacy alert claims no health data goes externally, but meal scanning calls a server proxy in real source; avoid repeating an absolute no-health-data-leaves-device claim. Cycle store is explicitly local encrypted storage; scope that claim to cycle data and verify platform specifics.
- A source implementation and an offline fixture screenshot are NOT proof of live backend functionality, native permissions, clinical validity, store approval, or an actual user's outcomes.
