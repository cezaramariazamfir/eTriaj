export type Locale = 'en' | 'ro';

export interface UITranslations {
  // InitPage
  appSubtitle: string;
  appTagline: string;
  patientAge: string;
  agePlaceholder: string;
  ageUnitYears: string;
  ageUnitMonths: string;
  whoFillingOut: string;
  patient: string;
  caregiver: string;
  startTriage: string;
  disclaimer: string;
  // TriagePage
  level1Title: string;
  level1Subtitle: string;
  questionOf: (current: number, total: number) => string;
  // QuestionCard
  yes: string;
  yesSubtitle: string;
  no: string;
  noSubtitle: string;
  // EmergencyPage
  esiLevel: string;
  callEmergency: string;
  symptomsRequire: string;
  whatToTell: string;
  tellLocation: string;
  tellAge: (age: number | undefined) => string;
  tellSymptom: string;
  tellConsciousness: string;
  call112: string;
  startOver: string;
  // AppShell
  offlineBanner: string;
  // ResultPage
  level1Cleared: string;
  module2Soon: string;
}

export const UI: Record<Locale, UITranslations> = {
  en: {
    appSubtitle: 'Emergency Triage',
    appTagline: 'Quick emergency screening',
    patientAge: 'Patient age',
    agePlaceholder: 'Enter age',
    ageUnitYears: 'years',
    ageUnitMonths: 'months',
    whoFillingOut: 'Who is filling this out?',
    patient: 'Patient',
    caregiver: 'Caregiver',
    startTriage: 'Start triage',
    disclaimer:
      'This tool does not replace professional medical advice. Always call emergency services in a life-threatening situation.',
    level1Title: 'Level 1 — Resuscitation',
    level1Subtitle: 'Answer honestly based on what you observe',
    questionOf: (current, total) => `Question ${current} of ${total}`,
    yes: 'YES',
    yesSubtitle: 'this applies',
    no: 'NO',
    noSubtitle: 'not the case',
    esiLevel: 'ESI Level 1',
    callEmergency: 'Call emergency services immediately',
    symptomsRequire: 'The symptoms described require immediate medical intervention.',
    whatToTell: 'What to tell the operator',
    tellLocation: 'Your exact location or address',
    tellAge: (age) => `Patient age: ${age ?? '—'}`,
    tellSymptom: 'The symptom that triggered this alert',
    tellConsciousness: 'Whether the patient is conscious',
    call112: 'Call 112',
    startOver: 'Start over',
    offlineBanner: 'No internet connection — Module 1 works offline',
    level1Cleared: 'Level 1 cleared',
    module2Soon: 'No immediate life threat detected. Module 2 coming soon.',
  },
  ro: {
    appSubtitle: 'Triaj de Urgență',
    appTagline: 'Evaluare rapidă a situației',
    patientAge: 'Vârsta pacientului',
    agePlaceholder: 'Introdu vârsta',
    ageUnitYears: 'ani',
    ageUnitMonths: 'luni',
    whoFillingOut: 'Cine completează?',
    patient: 'Pacient',
    caregiver: 'Aparținător',
    startTriage: 'Începe triajul',
    disclaimer:
      'Acest instrument nu înlocuiește sfatul medical profesionist. Sunați la serviciile de urgență în orice situație cu risc vital.',
    level1Title: 'Nivel 1 — Resuscitare',
    level1Subtitle: 'Răspunde sincer bazat pe ce observi',
    questionOf: (current, total) => `Întrebarea ${current} din ${total}`,
    yes: 'DA',
    yesSubtitle: 'se aplică',
    no: 'NU',
    noSubtitle: 'nu este cazul',
    esiLevel: 'ESI Nivel 1',
    callEmergency: 'Sunați imediat la serviciile de urgență',
    symptomsRequire: 'Simptomele descrise necesită intervenție medicală imediată.',
    whatToTell: 'Ce să spuneți operatorului',
    tellLocation: 'Locația exactă sau adresa dumneavoastră',
    tellAge: (age) => `Vârsta pacientului: ${age ?? '—'}`,
    tellSymptom: 'Simptomul care a declanșat această alertă',
    tellConsciousness: 'Dacă pacientul este conștient',
    call112: 'Sună 112',
    startOver: 'Începe din nou',
    offlineBanner: 'Fără conexiune — Modulul 1 funcționează offline',
    level1Cleared: 'Nivelul 1 exclus',
    module2Soon: 'Nicio amenințare imediată detectată. Modulul 2 în curând.',
  },
};
