import { useState } from 'react';
import type { TriageQuestion, TriageAnswerValue } from '../../engine/types';
import type { UITranslations } from '../../i18n/translations';

interface QuestionCardProps {
  question: TriageQuestion;
  locale: string;
  t: UITranslations;
  onAnswer: (answer: TriageAnswerValue) => void;
  progress: { current: number; total: number };
}

// ── Progress bar shared by all input types ────────────────────────────────────
function ProgressHeader({
  progress,
  t,
}: {
  progress: { current: number; total: number };
  t: UITranslations;
}) {
  const progressPercent = Math.round((progress.current / progress.total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span>{t.questionOf(progress.current, progress.total)}</span>
        <span>{progressPercent}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

// ── Question text card ────────────────────────────────────────────────────────
function QuestionText({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <p className="text-slate-900 text-2xl font-semibold leading-snug">{text}</p>
    </div>
  );
}

// ── Boolean input (YES / NO) ──────────────────────────────────────────────────
function BooleanInput({
  t,
  onAnswer,
}: {
  t: UITranslations;
  onAnswer: (answer: TriageAnswerValue) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => { onAnswer('YES'); }}
        className="w-full min-h-[64px] rounded-2xl bg-yes text-white text-lg font-bold tracking-wide active:scale-95 transition-all duration-150 flex items-center justify-between px-6"
      >
        <span>{t.yes}</span>
        <span className="text-sm font-normal opacity-80">{t.yesSubtitle}</span>
      </button>
      <button
        onClick={() => { onAnswer('NO'); }}
        className="w-full min-h-[64px] rounded-2xl bg-slate-800 text-white text-lg font-bold tracking-wide active:scale-95 transition-all duration-150 flex items-center justify-between px-6"
      >
        <span>{t.no}</span>
        <span className="text-sm font-normal opacity-60">{t.noSubtitle}</span>
      </button>
    </div>
  );
}

// ── Sex radio input (M / F) ───────────────────────────────────────────────────
function SexRadioInput({
  t,
  onAnswer,
}: {
  t: UITranslations;
  onAnswer: (answer: TriageAnswerValue) => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => { onAnswer('M'); }}
        className="flex-1 min-h-[80px] rounded-2xl bg-primary text-white text-xl font-bold active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-1"
      >
        <span className="text-3xl">♂</span>
        <span>{t.male}</span>
      </button>
      <button
        onClick={() => { onAnswer('F'); }}
        className="flex-1 min-h-[80px] rounded-2xl bg-slate-700 text-white text-xl font-bold active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-1"
      >
        <span className="text-3xl">♀</span>
        <span>{t.female}</span>
      </button>
    </div>
  );
}

// ── Pain slider input (0–10) ──────────────────────────────────────────────────
function PainSliderInput({
  t,
  onAnswer,
}: {
  t: UITranslations;
  onAnswer: (answer: TriageAnswerValue) => void;
}) {
  const [value, setValue] = useState<number>(0);

  const painColor =
    value === 0
      ? '#22c55e'
      : value <= 3
        ? '#84cc16'
        : value <= 6
          ? '#f59e0b'
          : '#dc2626';

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {t.painLevel}
        </span>
        <span className="text-7xl font-bold" style={{ color: painColor }}>
          {value}
        </span>
        <div className="w-full flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={value}
            onChange={(e) => { setValue(Number(e.target.value)); }}
            className="w-full accent-primary h-2"
          />
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>{t.painNone}</span>
            <span>{t.painWorst}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => { onAnswer(value); }}
        className="w-full min-h-[64px] rounded-2xl bg-primary text-white text-lg font-bold active:scale-95 transition-all duration-150"
      >
        {t.confirm} — {value}/10
      </button>
    </div>
  );
}

// ── Main QuestionCard ─────────────────────────────────────────────────────────
export function QuestionCard({ question, locale, t, onAnswer, progress }: QuestionCardProps) {
  const text = question.translations[locale] ?? question.translations['en'];
  const inputType = question.inputType ?? 'boolean';

  return (
    <div className="flex flex-col gap-5">
      <ProgressHeader progress={progress} t={t} />
      {inputType !== 'pain_slider' && <QuestionText text={text} />}
      {inputType === 'pain_slider' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <p className="text-slate-900 text-xl font-semibold leading-snug mb-4">{text}</p>
          <PainSliderInput t={t} onAnswer={onAnswer} />
        </div>
      )}
      {inputType === 'boolean' && <BooleanInput t={t} onAnswer={onAnswer} />}
      {inputType === 'sex_radio' && <SexRadioInput t={t} onAnswer={onAnswer} />}
    </div>
  );
}
