import { useNavigate } from 'react-router-dom';
import { useTriageContext } from '../context/TriageContext';
import { LEVEL1_QUESTIONS } from '../engine/modules/level1/questions';
import { LEVEL2_QUESTIONS } from '../engine/modules/level2/questions';
import type { TriageFlags } from '../engine/types';

const ALL_QUESTIONS = [...LEVEL1_QUESTIONS, ...LEVEL2_QUESTIONS];

// Returns only the flags that differ from their default/null value — these are
// the contextual risk factors collected before the trigger fired.
function getActiveFlags(flags: TriageFlags): { key: string; value: string }[] {
  const result: { key: string; value: string }[] = [];

  if (flags.SEX_BIO !== null) {
    result.push({ key: 'SEX_BIO', value: flags.SEX_BIO });
  }
  if (flags.PAIN_LEVEL !== null) {
    result.push({ key: 'PAIN_LEVEL', value: `${flags.PAIN_LEVEL}/10` });
  }
  if (flags.PAIN_ALERT) {
    result.push({ key: 'PAIN_ALERT', value: '≥ 7' });
  }
  if (flags.IS_IMMUNO) {
    result.push({ key: 'IS_IMMUNO', value: 'true' });
  }
  if (flags.IS_BLOOD_THINNER) {
    result.push({ key: 'IS_BLOOD_THINNER', value: 'true' });
  }
  if (flags.IS_OBSTETRIC_RISK) {
    result.push({ key: 'IS_OBSTETRIC_RISK', value: 'true' });
  }

  return result;
}

export function EmergencyPage() {
  const { session, locale, t } = useTriageContext();
  const navigate = useNavigate();

  const level = session?.result ?? 1;
  const isLevel1 = level === 1;

  // Find the question whose ID matches session.triggeredBy and get its text.
  const triggeringQuestion = session?.triggeredBy
    ? ALL_QUESTIONS.find((q) => q.id === session.triggeredBy)
    : null;
  const triggerText = triggeringQuestion
    ? (triggeringQuestion.translations[locale] ?? triggeringQuestion.translations['en'])
    : null;

  // For ESI 2, show any flags that were collected before the trigger question.
  const activeFlags = !isLevel1 && session?.flags ? getActiveFlags(session.flags) : [];

  function handleStartOver() {
    void navigate('/');
  }

  return (
    <div className="-mx-4 -my-6 min-h-svh bg-emergency flex flex-col px-6 py-10 gap-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-2 pt-4">
        <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
          {isLevel1 ? t.esiLevel1 : t.esiLevel2}
        </span>
        <h1 className="text-white text-4xl font-bold leading-tight">
          {isLevel1 ? t.callEmergency : t.esi2Heading}
        </h1>
        <p className="text-white/80 text-base">
          {isLevel1 ? t.symptomsRequire : t.esi2Body}
        </p>
      </div>

      {/* ── Primary action ── */}
      {isLevel1 ? (
        <a
          href="tel:112"
          className="flex items-center justify-center w-full min-h-[64px] rounded-3xl bg-white text-emergency text-2xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          {t.call112}
        </a>
      ) : (
        <button
          onClick={handleStartOver}
          className="flex items-center justify-center w-full min-h-[64px] rounded-3xl bg-white text-emergency text-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          {t.goToHospital}
        </button>
      )}

      {/* ── Triggering symptom ── */}
      {triggerText !== null && (
        <div className="bg-white/15 rounded-3xl p-5 flex flex-col gap-2">
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider">
            {t.triggeredByLabel}
          </p>
          <p className="text-white text-base font-semibold leading-snug">
            {triggerText}
          </p>
          <p className="text-white/50 text-xs font-mono">{session?.triggeredBy}</p>
        </div>
      )}

      {/* ── Risk flags collected before trigger (ESI 2 only) ── */}
      {activeFlags.length > 0 && (
        <div className="bg-white/15 rounded-3xl p-5 flex flex-col gap-3">
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider">
            {t.contextFlagsLabel}
          </p>
          <div className="flex flex-col gap-2">
            {activeFlags.map(({ key, value }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="font-mono text-white/80 text-xs">{key}</span>
                <span className="font-mono text-white text-sm font-bold bg-white/20 px-2 py-0.5 rounded-lg">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── What to tell operator (ESI 1 only) ── */}
      {isLevel1 && (
        <div className="bg-white/15 rounded-3xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-sm uppercase tracking-wide">
            {t.whatToTell}
          </p>
          <ul className="flex flex-col gap-2 text-white/90 text-sm">
            <li>• {t.tellLocation}</li>
            <li>• {t.tellAge(session?.patientAge)}</li>
            <li>• {t.tellSymptom}</li>
            <li>• {t.tellConsciousness}</li>
          </ul>
        </div>
      )}

      <button
        onClick={handleStartOver}
        className="w-full min-h-[52px] rounded-2xl border-2 border-white/40 text-white font-semibold text-base active:scale-95 transition-transform"
      >
        {t.startOver}
      </button>
    </div>
  );
}
