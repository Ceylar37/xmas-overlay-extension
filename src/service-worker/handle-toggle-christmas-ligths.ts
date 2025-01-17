import { FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleToggleChristmasLights: HandlerFromPair<FIREWORK_PAIRS['TOGGLE_FIREWORK']> = async () => {
  const { isChristmasLights } = await chrome.storage.sync.get<Partial<{ isChristmasLights: boolean }>>([
    'isChristmasLights'
  ]);

  await chrome.storage.sync.set({ isChristmasLights: !isChristmasLights });
};

export { handleToggleChristmasLights };
