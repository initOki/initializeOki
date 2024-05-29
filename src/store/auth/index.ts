import { create } from 'zustand';

import { createAuthSlice } from './user';
import type { CreateAuthSlice } from './type';

type UseContentsStore = CreateAuthSlice;

export const useContentsStore = create<UseContentsStore>()((...a) => ({
  ...createAuthSlice(...a),
}));
