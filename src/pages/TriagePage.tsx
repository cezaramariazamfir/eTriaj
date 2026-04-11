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
      void navigate('/result');
    }
  }, [result, navigate]);

  if (session === null || currentQuestion === null || activeModule === null) {
    return null;
  }

  const totalQuestions = activeModule.getActiveQuestions(session).length;

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-slate-900">{t.level1Title}</h2>
        <p className="text-sm text-slate-500">{t.level1Subtitle}</p>
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
