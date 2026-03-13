import type { TriageQuestion } from '../../types';

export const LEVEL1_QUESTIONS: TriageQuestion[] = [
  {
    id: 'L1_Q1_CONSCIOUSNESS',
    translations: {
      en: 'Is the patient unresponsive or unconscious?',
      ro: 'Pacientul este inconștient sau nu răspunde la stimuli?',
    },
    triggerOnYes: true,
  },
  {
    id: 'L1_Q2_AIRWAY_CHOKING',
    translations: {
      en: 'Is the patient choking or in severe respiratory distress?',
      ro: 'Pacientul se sufocă sau are dificultăți de respirație?',
    },
    triggerOnYes: true,
  },
  {
    id: 'L1_Q3_SHOCK',
    translations: {
      en: 'Does the patient show signs of shock (extreme pallor, cold sweats, confusion)?',
      ro: 'Pacientul este palid, transpiră abundent și este confuz?',
    },
    triggerOnYes: true,
  },  {
    id: 'L1_Q4_ALLERGY',
    translations: {
      en: 'Is the patient having a severe allergic reaction (swollen tongue/throat or difficulties breathing)?',
      ro: 'Pacientul are o reacție alergică severă (limbă/gât umflat, nu are aer)?',
    },
    triggerOnYes: true,
  },
  {
    id: 'L1_Q5_PENETRATING_TRAUMA',
    translations: {
      en: 'Is there penetrating trauma (stab/gunshot) that is bleeding heavily?',
      ro: 'Există o plagă penetrantă (înjunghiere, împușcătură) lcare nu se oprește din sângerat?',
    },
    triggerOnYes: true,
  },
  {
    id: 'L1_Q6_FLACCID_INFANT',
    translations: {
      en: 'Is the infant/child completely flaccid and unresponsive?',
      ro: 'Copilul este moale, flasc și nu reacționează la stimuli?',
    },
    triggerOnYes: true,
    isPediatricOnly: true,
  },
];
