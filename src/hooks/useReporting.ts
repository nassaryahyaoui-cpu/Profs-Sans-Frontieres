import { useEffect } from 'react';

export function useReporting(xp: number, talesCount: number) {
  useEffect(() => {
    const report = async () => {
      if (navigator.onLine) {
        try {
          const stats = {
            xp,
            talesFinished: talesCount,
            lastActive: new Date().toISOString(),
            userAgent: navigator.userAgent,
            version: '1.0.0-mobile'
          };

          // Simulating a reporting endpoint for Admin Nabil
          await fetch('https://eo6w1j6v7j9j9x9.m.pipedream.net', {
            method: 'POST',
            body: JSON.stringify(stats),
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (e) {
          console.error('Reporting failed', e);
        }
      }
    };

    const interval = setInterval(report, 1000 * 60 * 5); // Every 5 minutes if online
    report();

    return () => clearInterval(interval);
  }, [xp, talesCount]);
}
