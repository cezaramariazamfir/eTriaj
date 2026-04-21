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
  // TriagePage — Level 1
  level1Title: string;
  level1Subtitle: string;
  // TriagePage — Level 2
  level2Title: string;
  level2Subtitle: string;
  // QuestionCard shared
  questionOf: (current: number, total: number) => string;
  yes: string;
  yesSubtitle: string;
  no: string;
  noSubtitle: string;
  // QuestionCard — sex_radio
  male: string;
  female: string;
  // QuestionCard — pain_slider
  painLevel: string;
  painNone: string;
  painWorst: string;
  confirm: string;
  // EmergencyPage — ESI 1
  esiLevel1: string;
  callEmergency: string;
  symptomsRequire: string;
  whatToTell: string;
  tellLocation: string;
  tellAge: (age: number | undefined) => string;
  tellSymptom: string;
  tellConsciousness: string;
  call112: string;
  startOver: string;
  // EmergencyPage — ESI 2
  esiLevel2: string;
  esi2Heading: string;
  esi2Body: string;
  goToHospital: string;
  // AppShell
  offlineBanner: string;
  // ResultPage (obsolete placeholder)
  level1Cleared: string;
  module2Soon: string;
  // EmergencyPage — trigger info
  triggeredByLabel: string;
  contextFlagsLabel: string;
  // FlagsPage
  flagsTitle: string;
  flagsSubtitle: string;
  flagsStageAComplete: string;
  continueToRuleEngine: string;
  flagAge: string;
  flagSex: string;
  flagConfused: string;
  flagSuicidal: string;
  flagPainLevel: string;
  flagPainAlert: string;
  flagImmuno: string;
  flagBloodThinner: string;
  flagObstetric: string;
  flagTrue: string;
  flagFalse: string;
  flagNull: string;
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
    level2Title: 'Level 2 — Risk Factors',
    level2Subtitle: 'These answers help identify high-risk situations',
    questionOf: (current, total) => `Question ${current} of ${total}`,
    yes: 'YES',
    yesSubtitle: 'this applies',
    no: 'NO',
    noSubtitle: 'not the case',
    male: 'Male',
    female: 'Female',
    painLevel: 'Pain level',
    painNone: 'No pain',
    painWorst: 'Worst',
    confirm: 'Confirm',
    esiLevel1: 'ESI Level 1',
    callEmergency: 'Call emergency services immediately',
    symptomsRequire: 'The symptoms described require immediate medical intervention.',
    whatToTell: 'What to tell the operator',
    tellLocation: 'Your exact location or address',
    tellAge: (age) => `Patient age: ${age ?? '—'}`,
    tellSymptom: 'The symptom that triggered this alert',
    tellConsciousness: 'Whether the patient is conscious',
    call112: 'Call 112',
    startOver: 'Start over',
    esiLevel2: 'ESI Level 2',
    esi2Heading: 'Go to emergency immediately',
    esi2Body: 'The patient has a high-risk condition that requires urgent evaluation. Do not wait.',
    goToHospital: 'Go to hospital now',
    offlineBanner: 'No internet connection — Module 1 works offline',
    level1Cleared: 'Level 1 cleared',
    module2Soon: 'No immediate life threat detected. Module 2 coming soon.',
    triggeredByLabel: 'Triggered by',
    contextFlagsLabel: 'Risk flags collected',
    flagsTitle: 'Stage A complete',
    flagsSubtitle: 'All collected flags — input for the Rule Engine',
    flagsStageAComplete: 'No immediate life threat detected in Stage A.',
    continueToRuleEngine: 'Continue to Rule Engine',
    flagAge: 'AGE_VALUE',
    flagSex: 'SEX_BIO',
    flagConfused: 'IS_CONFUSED',
    flagSuicidal: 'IS_SUICIDAL',
    flagPainLevel: 'PAIN_LEVEL',
    flagPainAlert: 'PAIN_ALERT',
    flagImmuno: 'IS_IMMUNO',
    flagBloodThinner: 'IS_BLOOD_THINNER',
    flagObstetric: 'IS_OBSTETRIC_RISK',
    flagTrue: 'true',
    flagFalse: 'false',
    flagNull: 'null',
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
    level2Title: 'Nivel 2 — Factori de Risc',
    level2Subtitle: 'Aceste răspunsuri ajută la identificarea situațiilor cu risc ridicat',
    questionOf: (current, total) => `Întrebarea ${current} din ${total}`,
    yes: 'DA',
    yesSubtitle: 'se aplică',
    no: 'NU',
    noSubtitle: 'nu este cazul',
    male: 'Masculin',
    female: 'Feminin',
    painLevel: 'Nivel durere',
    painNone: 'Fără durere',
    painWorst: 'Maximum',
    confirm: 'Confirmă',
    esiLevel1: 'ESI Nivel 1',
    callEmergency: 'Sunați imediat la serviciile de urgență',
    symptomsRequire: 'Simptomele descrise necesită intervenție medicală imediată.',
    whatToTell: 'Ce să spuneți operatorului',
    tellLocation: 'Locația exactă sau adresa dumneavoastră',
    tellAge: (age) => `Vârsta pacientului: ${age ?? '—'}`,
    tellSymptom: 'Simptomul care a declanșat această alertă',
    tellConsciousness: 'Dacă pacientul este conștient',
    call112: 'Sună 112',
    startOver: 'Începe din nou',
    esiLevel2: 'ESI Nivel 2',
    esi2Heading: 'Mergeți imediat la urgențe',
    esi2Body: 'Pacientul are o condiție cu risc ridicat care necesită evaluare urgentă. Nu așteptați.',
    goToHospital: 'Mergeți la spital acum',
    offlineBanner: 'Fără conexiune — Modulul 1 funcționează offline',
    level1Cleared: 'Nivelul 1 exclus',
    module2Soon: 'Nicio amenințare imediată detectată. Modulul 2 în curând.',
    triggeredByLabel: 'Declanșat de',
    contextFlagsLabel: 'Flag-uri de risc colectate',
    flagsTitle: 'Etapa A completă',
    flagsSubtitle: 'Toate flag-urile colectate — input pentru Rule Engine',
    flagsStageAComplete: 'Nicio amenințare vitală imediată detectată în Etapa A.',
    continueToRuleEngine: 'Continuă spre Rule Engine',
    flagAge: 'AGE_VALUE',
    flagSex: 'SEX_BIO',
    flagConfused: 'IS_CONFUSED',
    flagSuicidal: 'IS_SUICIDAL',
    flagPainLevel: 'PAIN_LEVEL',
    flagPainAlert: 'PAIN_ALERT',
    flagImmuno: 'IS_IMMUNO',
    flagBloodThinner: 'IS_BLOOD_THINNER',
    flagObstetric: 'IS_OBSTETRIC_RISK',
    flagTrue: 'true',
    flagFalse: 'false',
    flagNull: 'null',
  },
};
