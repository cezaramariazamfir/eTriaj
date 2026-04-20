import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserPersona } from '../engine/types';
import { useTriageContext } from '../context/TriageContext';
import type { Locale } from '../i18n/translations';

type AgeUnit = 'years' | 'months';

export function InitPage() {
  const [age, setAge] = useState<string>('');
  const [ageUnit, setAgeUnit] = useState<AgeUnit>('years');
  const [persona, setPersona] = useState<UserPersona>('PATIENT');
  const [submitted, setSubmitted] = useState(false);
  const { session, startSession, t, locale, setLocale } = useTriageContext();
  const navigate = useNavigate();

  const parsedAge = parseInt(age, 10);
  const maxAge = ageUnit === 'years' ? 120 : 23;
  const isValid = age !== '' && !isNaN(parsedAge) && parsedAge >= 0 && parsedAge <= maxAge;
  const ageInYears = ageUnit === 'years' ? parsedAge : parsedAge / 12;

  useEffect(() => {
    if (submitted && session !== null) {
      void navigate('/triage');
      setSubmitted(false);
    }
  }, [submitted, session, navigate]);

  function handleSubmit() {
    if (!isValid) return;
    startSession(ageInYears, persona);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-svh">
      <div className="flex items-center justify-between pt-10 pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t.appSubtitle}
          </span>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            eTriaj
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            {t.appTagline}
          </p>
        </div>

        <div className="flex gap-1 self-start mt-2">
          {(['en', 'ro'] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); }}
              className={[
                'px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150',
                locale === l
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-500',
              ].join(' ')}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="age">
            {t.patientAge}
          </label>
          <div className="flex gap-2">
            <input
              id="age"
              type="number"
              min={0}
              max={maxAge}
              value={age}
              onChange={(e) => { setAge(e.target.value); }}
              placeholder={t.agePlaceholder}
              className="flex-1 h-[56px] rounded-2xl border-2 border-slate-200 px-4 text-xl font-medium text-slate-900 outline-none focus:border-primary transition-colors bg-white"
            />
            <div className="flex rounded-2xl border-2 border-slate-200 overflow-hidden">
              {(['years', 'months'] as AgeUnit[]).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => { setAgeUnit(unit); setAge(''); }}
                  className={[
                    'px-4 text-sm font-semibold transition-all duration-150',
                    ageUnit === unit
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-500',
                  ].join(' ')}
                >
                  {unit === 'years' ? t.ageUnitYears : t.ageUnitMonths}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t.whoFillingOut}
          </span>
          <div className="grid grid-cols-2 gap-3">
            {(['PATIENT', 'CAREGIVER'] as UserPersona[]).map((p) => (
              <button
                key={p}
                onClick={() => { setPersona(p); }}
                className={[
                  'h-[56px] rounded-2xl text-sm font-semibold border-2 transition-all duration-150',
                  persona === p
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600',
                ].join(' ')}
              >
                {p === 'PATIENT' ? t.patient : t.caregiver}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={[
            'w-full h-[56px] rounded-2xl text-base font-bold transition-all duration-150',
            'flex items-center justify-between px-6',
            isValid
              ? 'bg-primary text-white active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed',
          ].join(' ')}
        >
          <span>{t.startTriage}</span>
          <span className="text-lg font-light">→</span>
        </button>
      </div>

      <p className="mt-auto pt-8 text-xs text-slate-400 text-center leading-relaxed">
        {t.disclaimer}
      </p>
    </div>
  );
}
