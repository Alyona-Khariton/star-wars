import { create } from 'zustand';

export const useErrorStore = create(set => ({
  hasError: false,
  dataError: {},
  setError: error => set({ hasError: true, dataError: error }),
}));
