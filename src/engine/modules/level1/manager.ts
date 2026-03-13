import type { TriageSession, TriageQuestion } from '../../types';
import type { ITriageModule, ModuleResult } from '../../moduleInterface';
import { LEVEL1_QUESTIONS } from './questions';

function getActiveQuestions(session: TriageSession): TriageQuestion[] {
  return LEVEL1_QUESTIONS.filter(
    (q) => q.isPediatricOnly !== true || session.patientAge < 18,
  );
}

function processAnswer(session: TriageSession, answer: 'YES' | 'NO'): ModuleResult {
  const activeQuestions = getActiveQuestions(session);
  const currentQuestion = activeQuestions[session.currentQuestionIndex];

  if (currentQuestion === undefined) {
    return { status: 'CONTINUE', updatedSession: session };
  }

  const updatedSession: TriageSession = {
    ...session,
    answers: { ...session.answers, [currentQuestion.id]: answer },
  };

  if (answer === 'YES' && currentQuestion.triggerOnYes) {
    return {
      status: 'LEVEL_ASSIGNED',
      level: 1,
      triggeredBy: currentQuestion.id,
      updatedSession: { ...updatedSession, result: 1, triggeredBy: currentQuestion.id },
    };
  }

  const nextIndex = session.currentQuestionIndex + 1;
  const nextSession: TriageSession = { ...updatedSession, currentQuestionIndex: nextIndex };

  if (nextIndex >= activeQuestions.length) {
    return { status: 'CONTINUE', updatedSession: nextSession };
  }

  return { status: 'NEEDS_INPUT', updatedSession: nextSession };
}

export const Level1Module: ITriageModule = {
  id: 'level1',
  name: 'ESI Level 1 — Resuscitation',
  isOfflineCapable: true,
  processAnswer,
  getActiveQuestions,
};
