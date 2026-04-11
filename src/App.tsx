import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TriageProvider, useTriageContext } from './context/TriageContext';
import { AppShell } from './components/layout/AppShell';
import { InitPage } from './pages/InitPage';
import { TriagePage } from './pages/TriagePage';
import { EmergencyPage } from './pages/EmergencyPage';

function ResultPlaceholder() {
  const { t } = useTriageContext();
  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2 className="text-2xl font-bold text-slate-900">{t.level1Cleared}</h2>
      <p className="text-slate-500">{t.module2Soon}</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TriageProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<InitPage />} />
            <Route path="/triage" element={<TriagePage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/result" element={<ResultPlaceholder />} />
          </Routes>
        </AppShell>
      </TriageProvider>
    </BrowserRouter>
  );
}
