export interface CreateAuthSliceStates {
  /**
   * appToken is user token, not study room token
   * */
  appToken: string;
}

export interface CreateAuthSliceActions {
  setAppToken: (appToken: CreateAuthSliceStates['appToken']) => void;
}

export type CreateAuthSlice = CreateAuthSliceStates & CreateAuthSliceActions;
