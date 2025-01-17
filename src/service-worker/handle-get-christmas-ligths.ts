import { FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleGetChristmasLights: HandlerFromPair<FIREWORK_PAIRS['GET_FIREWORK']> = async () => {
  const { isChristmasLights } = await chrome.storage.sync.get<Partial<{ isChristmasLights: boolean }>>([
    'isChristmasLights'
  ]);
  return isChristmasLights ?? false;
};

export { handleGetChristmasLights };
