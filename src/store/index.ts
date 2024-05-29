import { useContentsStore } from './auth';

const useStore = () => ({
  auth: useContentsStore(),
});
