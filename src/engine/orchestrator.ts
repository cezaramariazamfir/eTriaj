import type { TriageSession, TriageFlags, TriageAnswerValue } from './types';
import type { ITriageModule, ModuleResult } from './moduleInterface';
import { Level1Module } from './modules/level1/manager';
import { Level2Module } from './modules/level2/manager';

// Modules run in order: level1 → level2. Each CONTINUE from a module
// causes the orchestrator to advance to the next module automatically.
const MODULES: ITriageModule[] = [Level1Module, Level2Module];

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createInitialFlags(patientAge: number): TriageFlags {
  return {
    AGE_VALUE: patientAge,
    SEX_BIO: null,
    IS_CONFUSED: false,
    IS_SUICIDAL: false,
    PAIN_LEVEL: null,
    PAIN_ALERT: false,
    IS_IMMUNO: false,
    IS_BLOOD_THINNER: false,
    IS_OBSTETRIC_RISK: false,
  };
}

function createSession(patientAge: number): TriageSession {
  return {
    sessionId: generateId(),
    patientAge,
    answers: {},
    flags: createInitialFlags(patientAge),
    currentModuleId: 'level1',
    currentQuestionIndex: 0,
    result: null,
    triggeredBy: null,
    startedAt: new Date(),
  };
}

function getActiveModule(session: TriageSession): ITriageModule {
  const module = MODULES.find((m) => m.id === session.currentModuleId);
  if (module === undefined) {
    throw new Error(`Module not found: ${session.currentModuleId}`);
  }
  return module;
}

function getNextModule(currentModuleId: string): ITriageModule | null {
  const idx = MODULES.findIndex((m) => m.id === currentModuleId);
  return MODULES[idx + 1] ?? null;
}

// When a module returns CONTINUE, the orchestrator checks if a next module
// exists. If yes, it transitions automatically (returns NEEDS_INPUT so the
// UI keeps showing questions). Only when the last module returns CONTINUE
// does the orchestrator propagate CONTINUE to signal "all stages done".
function processAnswer(session: TriageSession, answer: TriageAnswerValue): ModuleResult {
  const result = getActiveModule(session).processAnswer(session, answer);

  if (result.status === 'CONTINUE') {
    const nextModule = getNextModule(session.currentModuleId);
    if (nextModule !== null) {
      return {
        status: 'NEEDS_INPUT',
        updatedSession: {
          ...result.updatedSession,
          currentModuleId: nextModule.id,
          currentQuestionIndex: 0,
        },
      };
    }
  }

  return result;
}

export const Orchestrator = {
  createSession,
  getActiveModule,
  processAnswer,
};
