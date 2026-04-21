import { useNavigate } from 'react-router-dom';
import { useTriageContext } from '../context/TriageContext';
import type { TriageFlags } from '../engine/types';

// ── Individual flag row ───────────────────────────────────────────────────────
function FlagRow({
  name,
  value,
  source,
  highlight,
}: {
  name: string;
  value: string;
  source: string;
  highlight?: 'alert' | 'normal';
}) {
  const isAlert = highlight === 'alert';
  return (
    <div
      className={[
        'flex items-start justify-between gap-3 py-3 border-b border-slate-100 last:border-0',
      ].join(' ')}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-xs font-bold text-slate-700 break-all">{name}</span>
        <span className="text-xs text-slate-400">{source}</span>
      </div>
      <span
        className={[
          'font-mono text-sm font-bold px-2 py-0.5 rounded-lg shrink-0',
          isAlert
            ? 'bg-amber-100 text-amber-700'
            : value === 'null'
              ? 'bg-slate-100 text-slate-400'
              : value === 'true' || value === 'false'
                ? value === 'true'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-700'
                : 'bg-primary/10 text-primary',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

// ── Build a human-readable value string for each flag ─────────────────────────
function buildRows(flags: TriageFlags, t: {
  flagAge: string; flagSex: string; flagConfused: string; flagSuicidal: string;
  flagPainLevel: string; flagPainAlert: string; flagImmuno: string;
  flagBloodThinner: string; flagObstetric: string;
  flagTrue: string; flagFalse: string; flagNull: string;
}) {
  const b = (v: boolean) => (v ? t.flagTrue : t.flagFalse);
  const n = (v: number | null) => (v === null ? t.flagNull : String(v));

  return [
    { name: t.flagAge,          value: String(flags.AGE_VALUE),              source: 'Init',   highlight: undefined },
    { name: t.flagSex,          value: flags.SEX_BIO ?? t.flagNull,          source: 'L2_Q1',  highlight: undefined },
    { name: t.flagConfused,     value: b(flags.IS_CONFUSED),                 source: 'L2_Q2',  highlight: flags.IS_CONFUSED ? 'alert' as const : undefined },
    { name: t.flagSuicidal,     value: b(flags.IS_SUICIDAL),                 source: 'L2_Q3',  highlight: flags.IS_SUICIDAL ? 'alert' as const : undefined },
    { name: t.flagPainLevel,    value: n(flags.PAIN_LEVEL),                  source: 'L2_Q4',  highlight: undefined },
    { name: t.flagPainAlert,    value: b(flags.PAIN_ALERT),                  source: 'L2_Q4',  highlight: flags.PAIN_ALERT ? 'alert' as const : undefined },
    { name: t.flagImmuno,       value: b(flags.IS_IMMUNO),                   source: 'L2_Q5',  highlight: undefined },
    { name: t.flagBloodThinner, value: b(flags.IS_BLOOD_THINNER),            source: 'L2_Q6',  highlight: undefined },
    { name: t.flagObstetric,    value: b(flags.IS_OBSTETRIC_RISK),           source: 'L2_Q7',  highlight: undefined },
  ] as const;
}

// ── Main FlagsPage ────────────────────────────────────────────────────────────
export function FlagsPage() {
  const { session, t } = useTriageContext();
  const navigate = useNavigate();

  if (session === null) {
    void navigate('/');
    return null;
  }

  const { flags } = session;
  const rows = buildRows(flags, t);

  // Raw JSON representation — this is exactly what the Rule Engine will receive.
  const jsonSnapshot = JSON.stringify(
    {
      AGE_VALUE: flags.AGE_VALUE,
      SEX_BIO: flags.SEX_BIO,
      IS_CONFUSED: flags.IS_CONFUSED,
      IS_SUICIDAL: flags.IS_SUICIDAL,
      PAIN_LEVEL: flags.PAIN_LEVEL,
      PAIN_ALERT: flags.PAIN_ALERT,
      IS_IMMUNO: flags.IS_IMMUNO,
      IS_BLOOD_THINNER: flags.IS_BLOOD_THINNER,
      IS_OBSTETRIC_RISK: flags.IS_OBSTETRIC_RISK,
    },
    null,
    2,
  );

  return (
    <div className="flex flex-col gap-6 pt-4 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-green-600">
          Stage A ✓
        </span>
        <h2 className="text-2xl font-bold text-slate-900">{t.flagsTitle}</h2>
        <p className="text-sm text-slate-500">{t.flagsSubtitle}</p>
      </div>

      {/* Status banner */}
      <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
        <p className="text-green-800 text-sm font-semibold">{t.flagsStageAComplete}</p>
      </div>

      {/* Flags table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 px-5 py-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-3 pb-2">
          Tabel 3 — Flags output
        </p>
        {rows.map((row) => (
          <FlagRow
            key={row.name}
            name={row.name}
            value={row.value}
            source={row.source}
            highlight={row.highlight}
          />
        ))}
      </div>

      {/* JSON snapshot */}
      <div className="bg-slate-900 rounded-3xl p-5 overflow-x-auto">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Rule Engine Input (JSON)
        </p>
        <pre className="text-xs text-green-400 leading-relaxed whitespace-pre-wrap break-all">
          {jsonSnapshot}
        </pre>
      </div>

      {/* Continue button (placeholder for Rule Engine / NLP module) */}
      <button
        onClick={() => { void navigate('/'); }}
        className="w-full min-h-[56px] rounded-2xl bg-primary text-white text-base font-bold active:scale-95 transition-all duration-150 flex items-center justify-between px-6"
      >
        <span>{t.continueToRuleEngine}</span>
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
