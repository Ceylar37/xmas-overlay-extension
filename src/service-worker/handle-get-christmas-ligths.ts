import { christmasLight, FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleGetChristmasLights: HandlerFromPair<FIREWORK_PAIRS['GET_FIREWORK']> = async () => {
  return await christmasLight.model.getIsChristmasLights();
};

export { handleGetChristmasLights };

