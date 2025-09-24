import { useState, useCallback } from 'react';

export function useRecentModules() {
  const [recentModules, setRecentModules] = useState<string[]>([]);

  const updateRecentModules = useCallback((page: string) => {
    setRecentModules(prev => {
      const filtered = prev.filter(p => p !== page);
      return [page, ...filtered].slice(0, 5); // Keep last 5
    });
  }, []);

  return { recentModules, updateRecentModules };
}