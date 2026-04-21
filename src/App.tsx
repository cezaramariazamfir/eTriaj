import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TriageProvider } from './context/TriageContext';
import { AppShell } from './components/layout/AppShell';
import { InitPage } from './pages/InitPage';
import { TriagePage } from './pages/TriagePage';
import { EmergencyPage } from './pages/EmergencyPage';
import { FlagsPage } from './pages/FlagsPage';

export default function App() {
  return (
    <BrowserRouter>
      <TriageProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<InitPage />} />
            <Route path="/triage" element={<TriagePage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/flags" element={<FlagsPage />} />
          </Routes>
        </AppShell>
      </TriageProvider>
    </BrowserRouter>
  );
}
