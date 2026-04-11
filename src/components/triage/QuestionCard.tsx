import type { TriageQuestion } from '../../engine/types';
import type { UITranslations } from '../../i18n/translations';

interface QuestionCardProps {
  question: TriageQuestion;
  locale: string;
  t: UITranslations;
  onAnswer: (answer: 'YES' | 'NO') => void;
  progress: { current: number; total: number };
}

export function QuestionCard({ question, locale, t, onAnswer, progress }: QuestionCardProps) {
  const text = question.translations[locale] ?? question.translations['en'];
  const progressPercent = Math.round((progress.current / progress.total) * 100);

  return (
    <div className="flex flex-col gap-5">
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

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <p className="text-slate-900 text-2xl font-semibold leading-snug">
          {text}
        </p>
      </div>

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
    </div>
  );
}
