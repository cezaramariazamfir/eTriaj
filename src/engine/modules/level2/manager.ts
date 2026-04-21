import type { TriageSession, TriageQuestion, TriageFlags, TriageAnswerValue } from '../../types';
import type { ITriageModule, ModuleResult } from '../../moduleInterface';
import { LEVEL2_QUESTIONS } from './questions';

function computeFlags(flags: TriageFlags, questionId: string, answer: TriageAnswerValue): TriageFlags {
  const updated = { ...flags };

  switch (questionId) {
    case 'L2_Q1_SEX':
      updated.SEX_BIO = answer as 'M' | 'F';
      break;
    case 'L2_Q2_CONFUSION':
      updated.IS_CONFUSED = answer === 'YES';
      break;
    case 'L2_Q3_SUICIDAL':
      updated.IS_SUICIDAL = answer === 'YES';
      break;
    case 'L2_Q4_PAIN_LEVEL': {
      const level = answer as number;
      updated.PAIN_LEVEL = level;
      updated.PAIN_ALERT = level >= 7;
      break;
    }
    case 'L2_Q5_IMMUNO':
      updated.IS_IMMUNO = answer === 'YES';
      break;
    case 'L2_Q6_BLOOD_THINNER':
      updated.IS_BLOOD_THINNER = answer === 'YES';
      break;
    case 'L2_Q7_OBSTETRIC':
      updated.IS_OBSTETRIC_RISK = answer === 'YES';
      break;
  }

  return updated;
}

function getActiveQuestions(session: TriageSession): TriageQuestion[] {
  return LEVEL2_QUESTIONS.filter((q) => {
    if (q.id === 'L2_Q7_OBSTETRIC') {
      return (
        session.flags.SEX_BIO === 'F' &&
        session.patientAge >= 12 &&
        session.patientAge <= 55
      );
    }
    return true;
  });
}

function processAnswer(session: TriageSession, answer: TriageAnswerValue): ModuleResult {
  const activeQuestions = getActiveQuestions(session);
  const currentQuestion = activeQuestions[session.currentQuestionIndex];

  if (currentQuestion === undefined) {
    return { status: 'CONTINUE', updatedSession: session };
  }

  const updatedFlags = computeFlags(session.flags, currentQuestion.id, answer);
  const updatedSession: TriageSession = {
    ...session,
    answers: { ...session.answers, [currentQuestion.id]: answer },
    flags: updatedFlags,
  };

  if (answer === 'YES' && currentQuestion.triggerOnYes) {
    return {
      status: 'LEVEL_ASSIGNED',
      level: 2,
      triggeredBy: currentQuestion.id,
      updatedSession: { ...updatedSession, result: 2, triggeredBy: currentQuestion.id },
    };
  }

  const nextIndex = session.currentQuestionIndex + 1;
  const nextSession: TriageSession = { ...updatedSession, currentQuestionIndex: nextIndex };

  if (nextIndex >= activeQuestions.length) {
    return { status: 'CONTINUE', updatedSession: nextSession };
  }

  return { status: 'NEEDS_INPUT', updatedSession: nextSession };
}

export const Level2Module: ITriageModule = {
  id: 'level2',
  processAnswer,
  getActiveQuestions,
};
