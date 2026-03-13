import type { TriageSession, UserPersona } from './types';
import type { ITriageModule, ModuleResult } from './moduleInterface';
import { Level1Module } from './modules/level1/manager';

const MODULES: ITriageModule[] = [Level1Module];

function createSession(patientAge: number, persona: UserPersona): TriageSession {
  return {
    sessionId: crypto.randomUUID(),
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
