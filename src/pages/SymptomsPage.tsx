import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTriageContext } from '../context/TriageContext';
import { runRuleEngine } from '../engine/ruleEngine/engine';
import type { RuleEngineResult } from '../engine/ruleEngine/engine';
import type { TriageFlags } from '../engine/types';

const LEVEL_STYLES: Record<2 | 3 | 4 | 5, { bg: string; text: string }> = {
  2: { bg: 'bg-red-50 border-red-200',       text: 'text-red-700'    },
  3: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
  4: { bg: 'bg-amber-50 border-amber-200',   text: 'text-amber-700'  },
  5: { bg: 'bg-green-50 border-green-200',   text: 'text-green-700'  },
};

function FlagRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function buildFlagRows(flags: TriageFlags, t: ReturnType<typeof useTriageContext>['t']) {
  const bool = (v: boolean) => v ? '✓' : '—';
  return [
    { label: t.resultFlagAge,          value: String(flags.AGE_VALUE) },
    { label: t.resultFlagSex,          value: flags.SEX_BIO === 'M' ? t.male : flags.SEX_BIO === 'F' ? t.female : '—' },
    { label: t.resultFlagPain,         value: flags.PAIN_LEVEL !== null ? `${flags.PAIN_LEVEL}/10` : '—' },
    { label: t.resultFlagConfused,     value: bool(flags.IS_CONFUSED) },
    { label: t.resultFlagSuicidal,     value: bool(flags.IS_SUICIDAL) },
    { label: t.resultFlagImmuno,       value: bool(flags.IS_IMMUNO) },
    { label: t.resultFlagBloodThinner, value: bool(flags.IS_BLOOD_THINNER) },
    { label: t.resultFlagObstetric,    value: bool(flags.IS_OBSTETRIC_RISK) },
  ];
}

export function SymptomsPage() {
  const { session, t, locale } = useTriageContext();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ruleResult, setRuleResult] = useState<RuleEngineResult | null>(null);
  const [extractedTokens, setExtractedTokens] = useState<string[]>([]);

  if (session === null) {
    void navigate('/');
    return null;
  }

  const handleSubmit = async () => {
    if (!symptoms.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/extract-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) throw new Error('Server error');

      const { tokens } = await response.json() as { tokens: string[] };
      setExtractedTokens(tokens);

      const result = runRuleEngine(tokens, session.flags);
      setRuleResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not reach the analysis server.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = symptoms.trim().length;

  // ── Result view ───────────────────────────────────────────────────────────────
  if (ruleResult !== null) {
    const style = LEVEL_STYLES[ruleResult.level];
    const levelLabels: Record<2 | 3 | 4 | 5, string> = {
      2: t.resultLevel2Label,
      3: t.resultLevel3Label,
      4: t.resultLevel4Label,
      5: t.resultLevel5Label,
    };
    const flagRows = buildFlagRows(session.flags, t);

    return (
      <div className="flex flex-col gap-6 pt-4 pb-10">

        {/* ESI Level card */}
        <div className={`border rounded-3xl px-6 py-5 flex flex-col gap-2 ${style.bg}`}>
          <span className={`text-xs font-bold uppercase tracking-widest ${style.text}`}>
            {t.resultTitle}
          </span>
          <div className="flex items-end gap-3">
            <span className={`text-7xl font-black leading-none ${style.text}`}>
              {ruleResult.level}
            </span>
            <span className={`text-sm font-semibold pb-1 ${style.text}`}>ESI</span>
          </div>
          <p className={`text-sm font-medium ${style.text}`}>{levelLabels[ruleResult.level]}</p>
          <p className={`text-xs mt-1 opacity-70 ${style.text}`}>
            {locale === 'ro' ? ruleResult.reason.ro : ruleResult.reason.en}
          </p>
        </div>

        {/* Risk alerts */}
        {ruleResult.highRiskAlerts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {t.resultAlertsLabel}
            </p>
            {ruleResult.highRiskAlerts.map((alert, i) => (
              <p key={i} className="text-xs text-amber-800">
                {locale === 'ro' ? alert.reason.ro : alert.reason.en}
              </p>
            ))}
          </div>
        )}

        {/* Detected symptom tokens */}
        <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.resultTokensLabel}
          </p>
          {extractedTokens.length > 0
            ? extractedTokens.map((id) => (
                <span key={id} className="font-mono text-xs text-slate-600 bg-slate-50 rounded-lg px-2 py-1">
                  {id}
                </span>
              ))
            : <p className="text-xs text-slate-400">{t.resultNoTokens}</p>
          }
        </div>

        {/* Required resources */}
        {ruleResult.resourceTypes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.resultResourcesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {ruleResult.resourceTypes.map((type) => (
                <span key={type} className="text-xs font-medium bg-primary/10 text-primary rounded-lg px-3 py-1">
                  {t.resourceTypeLabels[type] ?? type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stage A flags */}
        <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.resultFlagsLabel}
          </p>
          {flagRows.map((row) => (
            <FlagRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        <button
          onClick={() => { void navigate('/'); }}
          className="w-full min-h-[48px] rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm active:scale-95 transition-all duration-150"
        >
          {t.startOver}
        </button>
      </div>
    );
  }

  // ── Input view ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 pt-4 pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-900">{t.symptomsTitle}</h2>
        <p className="text-sm text-slate-500">{t.symptomsSubtitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={t.symptomsPlaceholder}
          rows={7}
          className="w-full rounded-2xl border-2 border-slate-200 focus:border-primary focus:outline-none px-4 py-3 text-sm text-slate-800 resize-none placeholder:text-slate-400 leading-relaxed"
        />
        <p className="text-xs text-slate-400 text-right">
          {charCount} {charCount === 1 ? 'char' : 'chars'}
        </p>
      </div>

      {error !== null && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={() => { void handleSubmit(); }}
        disabled={charCount === 0 || isSubmitting}
        className="w-full min-h-[56px] rounded-2xl bg-primary text-white text-base font-bold active:scale-95 transition-all duration-150 flex items-center justify-between px-6 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? t.symptomsAnalyzing : t.symptomsSubmit}</span>
        <span className="text-lg font-light">→</span>
      </button>

      <button
        onClick={() => { void navigate('/'); }}
        className="w-full min-h-[48px] rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm active:scale-95 transition-all duration-150"
      >
        {t.startOver}
      </button>
    </div>
  );
}
