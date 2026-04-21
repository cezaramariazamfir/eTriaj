import type { TriageQuestion } from '../../types';

export const LEVEL2_QUESTIONS: TriageQuestion[] = [
  {
    id: 'L2_Q1_SEX',
    translations: {
      en: "What is the patient's biological sex?",
      ro: 'Care este sexul biologic al pacientului?',
    },
    triggerOnYes: false,
    inputType: 'sex_radio',
  },
  {
    id: 'L2_Q2_CONFUSION',
    translations: {
      en: 'Is the patient confused, disoriented, or unusually drowsy (new onset)?',
      ro: 'Pacientul este confuz, dezorientat sau somnolent în mod neobișnuit (stare nouă)?',
    },
    triggerOnYes: true,
    inputType: 'boolean',
  },
  {
    id: 'L2_Q3_SUICIDAL',
    translations: {
      en: 'Is there any risk the patient may try to harm themselves or others?',
      ro: 'Există riscul ca pacientul să încerce să își facă rău sau să rănească pe altcineva?',
    },
    triggerOnYes: true,
    inputType: 'boolean',
  },
  {
    id: 'L2_Q4_PAIN_LEVEL',
    translations: {
      en: "What is the patient's pain level? (0 = no pain, 10 = worst imaginable)",
      ro: 'Care este nivelul durerii? (0 = fără durere, 10 = durere maximă)',
    },
    triggerOnYes: false,
    inputType: 'pain_slider',
  },
  {
    id: 'L2_Q5_IMMUNO',
    translations: {
      en: 'Does the patient have a weakened immune system (cancer, chemo, transplant, long-term steroids)?',
      ro: 'Pacientul are imunitate scăzută (cancer, chimioterapie, transplant, steroizi pe termen lung)?',
    },
    triggerOnYes: false,
    inputType: 'boolean',
  },
  {
    id: 'L2_Q6_BLOOD_THINNER',
    translations: {
      en: 'Is the patient taking blood thinners (warfarin, xarelto, daily aspirin)?',
      ro: 'Pacientul ia medicamente pentru subțierea sângelui (warfarină, xarelto, aspirină zilnic)?',
    },
    triggerOnYes: false,
    inputType: 'boolean',
  },
  {
    // Shown only when SEX_BIO === 'F' AND patient age 12–55
    id: 'L2_Q7_OBSTETRIC',
    translations: {
      en: 'Is the patient pregnant or has she given birth in the last 6 weeks?',
      ro: 'Pacienta este însărcinată sau a născut în ultimele 6 săptămâni?',
    },
    triggerOnYes: false,
    inputType: 'boolean',
  },
];
