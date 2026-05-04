export type UserPersona = 'PATIENT' | 'CAREGIVER';
export type TriageAnswer = 'YES' | 'NO';
export type TriageAnswerValue = 'YES' | 'NO' | 'M' | 'F' | number;
export type ESILevel = 1 | 2 | 3 | 4 | 5;
export type QuestionInputType = 'boolean' | 'sex_radio' | 'pain_slider';

export interface QuestionTranslations {
  en: string;
  [locale: string]: string | undefined;
}

export interface TriageQuestion {
  id: string;
  translations: QuestionTranslations;
  triggerOnYes: boolean;
  isPediatricOnly?: boolean;
  inputType?: QuestionInputType;
}

export interface TriageFlags {
  AGE_VALUE: number;
  SEX_BIO: 'M' | 'F' | null;
  IS_CONFUSED: boolean;
  IS_SUICIDAL: boolean;
  PAIN_LEVEL: number | null;
  PAIN_ALERT: boolean;
  IS_IMMUNO: boolean;
  IS_BLOOD_THINNER: boolean;
  IS_OBSTETRIC_RISK: boolean;
}

export interface TriageSession {
  sessionId: string;
  patientAge: number;
  persona: UserPersona;
  answers: Record<string, TriageAnswerValue>;
  flags: TriageFlags;
  currentModuleId: string;
  currentQuestionIndex: number;
  result: ESILevel | null;
  triggeredBy: string | null;
  startedAt: Date;
}
