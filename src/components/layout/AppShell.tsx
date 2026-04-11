import { useConnectivity } from '../../hooks/useConnectivity';
import { useTriageContext } from '../../context/TriageContext';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isOnline } = useConnectivity();
  const { t } = useTriageContext();

  return (
    <div className="min-h-svh bg-surface flex flex-col items-center">
      {!isOnline && (
        <div className="w-full bg-amber-400 text-amber-900 text-center text-sm font-medium py-2 px-4">
          {t.offlineBanner}
        </div>
      )}
      <div className="w-full max-w-[480px] flex flex-col flex-1 px-4 py-6">
        {children}
      </div>
    </div>
  );
}
