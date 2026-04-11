import type { TriageSession, UserPersona } from './types';
import type { ITriageModule, ModuleResult } from './moduleInterface';
import { Level1Module } from './modules/level1/manager';

const MODULES: ITriageModule[] = [Level1Module];

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createSession(patientAge: number, persona: UserPersona): TriageSession {
  return {
    sessionId: generateId(),
    patientAge,
    persona,
    answers: {},
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

function processAnswer(session: TriageSession, answer: 'YES' | 'NO'): ModuleResult {
  return getActiveModule(session).processAnswer(session, answer);
}

export const Orchestrator = {
  createSession,
  getActiveModule,
  processAnswer,
};
