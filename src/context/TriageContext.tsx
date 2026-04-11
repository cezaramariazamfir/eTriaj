import { createContext, useContext } from 'react';
import { useTriageFlow } from '../hooks/useTriageFlow';

type TriageContextValue = ReturnType<typeof useTriageFlow>;

const TriageContext = createContext<TriageContextValue | null>(null);

export function TriageProvider({ children }: { children: React.ReactNode }) {
  const flow = useTriageFlow();
  return <TriageContext.Provider value={flow}>{children}</TriageContext.Provider>;
}

export function useTriageContext(): TriageContextValue {
  const ctx = useContext(TriageContext);
  if (ctx === null) {
    throw new Error('useTriageContext must be used inside <TriageProvider>');
  }
  return ctx;
}
