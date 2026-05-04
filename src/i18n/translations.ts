export type Locale = 'en' | 'ro';

export interface UITranslations {
  // InitPage
  appSubtitle: string;
  appTagline: string;
  patientAge: string;
  agePlaceholder: string;
  ageUnitYears: string;
  ageUnitMonths: string;
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
  // FlagsPage / SymptomsPage — input
  flagsStageAComplete: string;
  symptomsTitle: string;
  symptomsSubtitle: string;
  symptomsPlaceholder: string;
  symptomsSubmit: string;
  symptomsAnalyzing: string;
  // SymptomsPage — result
  resultTitle: string;
  resultLevel2Label: string;
  resultLevel3Label: string;
  resultLevel4Label: string;
  resultLevel5Label: string;
  resultTokensLabel: string;
  resultNoTokens: string;
  resultAlertsLabel: string;
  resultFlagsLabel: string;
  resultFlagAge: string;
  resultFlagSex: string;
  resultFlagPain: string;
  resultFlagConfused: string;
  resultFlagSuicidal: string;
  resultFlagImmuno: string;
  resultFlagBloodThinner: string;
  resultFlagObstetric: string;
  resultResourcesLabel: string;
  resourceTypeLabels: Record<string, string>;
}

export const UI: Record<Locale, UITranslations> = {
  en: {
    appSubtitle: 'Emergency Triage',
    appTagline: 'Quick emergency screening',
    patientAge: 'Patient age',
    agePlaceholder: 'Enter age',
    ageUnitYears: 'years',
    ageUnitMonths: 'months',
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
    flagsStageAComplete: 'No immediate life threat detected in Stage A.',
    symptomsTitle: 'Describe your symptoms',
    symptomsSubtitle: 'Write what you or the patient is experiencing, in your own words.',
    symptomsPlaceholder: 'e.g. chest pain since this morning, shortness of breath, slight dizziness...',
    symptomsSubmit: 'Analyze symptoms',
    symptomsAnalyzing: 'Analyzing...',
    resultTitle: 'Triage result',
    resultLevel2Label: 'Go to emergency immediately',
    resultLevel3Label: 'Moderate urgency — go to emergency',
    resultLevel4Label: 'Less urgent — can wait',
    resultLevel5Label: 'Non-urgent',
    resultTokensLabel: 'Detected symptoms',
    resultNoTokens: 'No specific symptoms matched the knowledge base.',
    resultAlertsLabel: 'Risk alerts',
    resultFlagsLabel: 'Risk factors collected (Stage A)',
    resultFlagAge: 'Age',
    resultFlagSex: 'Biological sex',
    resultFlagPain: 'Pain level',
    resultFlagConfused: 'Confusion',
    resultFlagSuicidal: 'Suicidal risk',
    resultFlagImmuno: 'Immunocompromised',
    resultFlagBloodThinner: 'Blood thinners',
    resultFlagObstetric: 'Obstetric risk',
    resultResourcesLabel: 'Required resources',
    resourceTypeLabels: {
      labs: 'Blood tests', imaging: 'Imaging', ekg: 'EKG', rx: 'X-ray',
      ct: 'CT scan', iv_fluids: 'IV fluids', urine: 'Urinalysis', echo: 'Ultrasound',
      meds_iv: 'IV medication', consult: 'Specialist consult',
      procedure: 'Procedure', suture: 'Suture', abx: 'IV antibiotics',
    },
  },
  ro: {
    appSubtitle: 'Triaj de Urgență',
    appTagline: 'Evaluare rapidă a situației',
    patientAge: 'Vârsta pacientului',
    agePlaceholder: 'Introdu vârsta',
    ageUnitYears: 'ani',
    ageUnitMonths: 'luni',
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
    flagsStageAComplete: 'Nicio amenințare vitală imediată detectată în Etapa A.',
    symptomsTitle: 'Descrieți simptomele',
    symptomsSubtitle: 'Scrieți ce experimentați dumneavoastră sau pacientul, cu propriile cuvinte.',
    symptomsPlaceholder: 'ex. durere în piept de dimineață, dificultăți de respirație, amețeală ușoară...',
    symptomsSubmit: 'Analizează simptomele',
    symptomsAnalyzing: 'Se analizează...',
    resultTitle: 'Rezultat triaj',
    resultLevel2Label: 'Mergeți imediat la urgențe',
    resultLevel3Label: 'Urgență moderată — mergeți la urgențe',
    resultLevel4Label: 'Mai puțin urgent — poate aștepta',
    resultLevel5Label: 'Non-urgent',
    resultTokensLabel: 'Simptome detectate',
    resultNoTokens: 'Niciun simptom specific detectat în baza de cunoștințe.',
    resultAlertsLabel: 'Alerte de risc',
    resultFlagsLabel: 'Factori de risc colectați (Etapa A)',
    resultFlagAge: 'Vârstă',
    resultFlagSex: 'Sex biologic',
    resultFlagPain: 'Nivel durere',
    resultFlagConfused: 'Confuzie',
    resultFlagSuicidal: 'Risc suicidar',
    resultFlagImmuno: 'Imunocompromis',
    resultFlagBloodThinner: 'Anticoagulante',
    resultFlagObstetric: 'Risc obstetrical',
    resultResourcesLabel: 'Resurse necesare',
    resourceTypeLabels: {
      labs: 'Analize sânge', imaging: 'Imagistică', ekg: 'EKG', rx: 'Radiografie',
      ct: 'CT', iv_fluids: 'Fluide IV', urine: 'Sumar urină', echo: 'Ecografie',
      meds_iv: 'Medicație IV', consult: 'Consult specialist',
      procedure: 'Procedură', suture: 'Sutură', abx: 'Antibiotice IV',
    },
  },
};
