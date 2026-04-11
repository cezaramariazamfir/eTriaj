import { useNavigate } from 'react-router-dom';
import { useTriageContext } from '../context/TriageContext';

export function EmergencyPage() {
  const { session, t } = useTriageContext();
  const navigate = useNavigate();

  function handleStartOver() {
    void navigate('/');
  }

  return (
    <div className="-mx-4 -my-6 min-h-svh bg-emergency flex flex-col px-6 py-10 gap-8">
      <div className="flex flex-col gap-2 pt-4">
        <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
          {t.esiLevel}
        </span>
        <h1 className="text-white text-4xl font-bold leading-tight">
          {t.callEmergency}
        </h1>
        <p className="text-white/80 text-base">
          {t.symptomsRequire}
        </p>
      </div>

      <a
        href="tel:112"
        className="flex items-center justify-center w-full min-h-[64px] rounded-3xl bg-white text-emergency text-2xl font-bold shadow-lg active:scale-95 transition-transform"
      >
        {t.call112}
      </a>

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

      <button
        onClick={handleStartOver}
        className="w-full min-h-[52px] rounded-2xl border-2 border-white/40 text-white font-semibold text-base active:scale-95 transition-transform"
      >
        {t.startOver}
      </button>
    </div>
  );
}
