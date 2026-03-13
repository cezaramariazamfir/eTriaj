export type UserPersona = 'PATIENT' | 'CAREGIVER';
export type TriageAnswer = 'YES' | 'NO';
export type ESILevel = 1 | 2 | 3 | 4 | 5;

export interface QuestionTranslations {
  en: string;
  [locale: string]: string | undefined;
}

export interface TriageQuestion {
  id: string;
  translations: QuestionTranslations;
  triggerOnYes: boolean;
  isPediatricOnly?: boolean;
}

export interface TriageSession {
  sessionId: string;
  patientAge: number;
  persona: UserPersona;
  answers: Record<string, TriageAnswer>;
  currentModuleId: string;
  currentQuestionIndex: number;
  result: ESILevel | null;
  triggeredBy: string | null;
  startedAt: Date;
}
