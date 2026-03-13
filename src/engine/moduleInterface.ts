import type { TriageSession, ESILevel, TriageQuestion } from './types';

export type ModuleResult =
  | { status: 'LEVEL_ASSIGNED'; level: ESILevel; triggeredBy: string; updatedSession: TriageSession }
  | { status: 'CONTINUE'; updatedSession: TriageSession }
  | { status: 'NEEDS_INPUT'; updatedSession: TriageSession };

export interface ITriageModule {
  readonly id: string;
  readonly name: string;
  readonly isOfflineCapable: boolean;
  processAnswer(session: TriageSession, answer: 'YES' | 'NO'): ModuleResult;
  getActiveQuestions(session: TriageSession): TriageQuestion[];
}
