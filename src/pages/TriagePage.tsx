import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTriageContext } from '../context/TriageContext';
import { QuestionCard } from '../components/triage/QuestionCard';

export function TriagePage() {
  const { session, currentQuestion, activeModule, result, answer, locale, t } = useTriageContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (result === null) return;
    if (result.status === 'LEVEL_ASSIGNED') {
      void navigate('/emergency');
    } else if (result.status === 'CONTINUE') {
      // All modules done — show the collected flags for the Rule Engine.
      void navigate('/flags');
    }
  }, [result, navigate]);

  if (session === null || currentQuestion === null || activeModule === null) {
    return null;
  }

  const isLevel2 = session.currentModuleId === 'level2';
  const title = isLevel2 ? t.level2Title : t.level1Title;
  const subtitle = isLevel2 ? t.level2Subtitle : t.level1Subtitle;
  const totalQuestions = activeModule.getActiveQuestions(session).length;

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <QuestionCard
        question={currentQuestion}
        locale={locale}
        t={t}
        onAnswer={answer}
        progress={{
          current: session.currentQuestionIndex + 1,
          total: totalQuestions,
        }}
      />
    </div>
  );
}
