import { createContext, useContext } from 'react';

export const WalksContext = createContext(null);

export function useWalks() {
  const context = useContext(WalksContext);
  if (!context) throw new Error('useWalks must be used within a WalksProvider.');
  return context;
}
