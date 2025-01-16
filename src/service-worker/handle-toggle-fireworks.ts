import { FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleToggleFireworks: HandlerFromPair<FIREWORK_PAIRS['TOGGLE_FIREWORK']> = async () => {
  const { isFireworks } = await chrome.storage.sync.get<Partial<{ isFireworks: boolean }>>(['isFireworks']);

  await chrome.storage.sync.set({ isFireworks: !isFireworks });
};

export { handleToggleFireworks };
