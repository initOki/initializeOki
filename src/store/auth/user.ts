import type { StateCreator } from 'zustand';

import { createAuthSliceStates } from './state';
import type { CreateAuthSlice } from './type';

export const createAuthSlice: StateCreator<CreateAuthSlice> = (set, get) => ({
  ...createAuthSliceStates,
  setAppToken: (appToken) => {
    set(() => ({
      appToken: appToken,
    }));
  },
});
