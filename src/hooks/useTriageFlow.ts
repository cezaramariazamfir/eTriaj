import { useReducer } from 'react';
import type { TriageSession, UserPersona, TriageQuestion } from '../engine/types';
import type { ModuleResult, ITriageModule } from '../engine/moduleInterface';
import { Orchestrator } from '../engine/orchestrator';

type State = {
  session: TriageSession | null;
  result: ModuleResult | null;
};

type Action =
  | { type: 'START'; patientAge: number; persona: UserPersona }
  | { type: 'ANSWER'; value: 'YES' | 'NO' };

const initialState: State = { session: null, result: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START': {
      const session = Orchestrator.createSession(action.patientAge, action.persona);
      return { session, result: null };
    }
    case 'ANSWER': {
      if (state.session === null) return state;
      const result = Orchestrator.processAnswer(state.session, action.value);
      return { session: result.updatedSession, result };
    }
  }
}

type TriageFlowReturn = {
  session: TriageSession | null;
  currentQuestion: TriageQuestion | null;
  activeModule: ITriageModule | null;
  result: ModuleResult | null;
  startSession: (patientAge: number, persona: UserPersona) => void;
  answer: (value: 'YES' | 'NO') => void;
};

export function useTriageFlow(): TriageFlowReturn {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { session, result } = state;

  const activeModule = session !== null ? Orchestrator.getActiveModule(session) : null;

  const currentQuestion: TriageQuestion | null =
    session !== null && activeModule !== null
      ? (activeModule.getActiveQuestions(session)[session.currentQuestionIndex] ?? null)
      : null;

  return {
    session,
    currentQuestion,
    activeModule,
    result,
    startSession: (patientAge, persona) => { dispatch({ type: 'START', patientAge, persona }); },
    answer: (value) => { dispatch({ type: 'ANSWER', value }); },
  };
}
