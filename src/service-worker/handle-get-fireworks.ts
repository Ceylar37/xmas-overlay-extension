import { FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleGetFireworks: HandlerFromPair<FIREWORK_PAIRS['GET_FIREWORK']> = async () => {
  const { isFireworks } = await chrome.storage.sync.get<Partial<{ isFireworks: boolean }>>(['isFireworks']);
  return isFireworks ?? false;
};

export { handleGetFireworks };
