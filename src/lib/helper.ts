import { useEffect, useState } from 'react';

export function useLocalStorage(key: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  return value;
}

export function useSessionStorage(key: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(sessionStorage.getItem(key));
  }, [key]);

  return value;
}
