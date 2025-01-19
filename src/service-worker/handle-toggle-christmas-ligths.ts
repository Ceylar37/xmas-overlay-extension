import { christmasLight, FIREWORK_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleToggleChristmasLights: HandlerFromPair<FIREWORK_PAIRS['TOGGLE_FIREWORK']> = async () => {
  const isChristmasLights = await christmasLight.model.getIsChristmasLights();

  await christmasLight.model.setIsChristmasLights(!isChristmasLights);
};

export { handleToggleChristmasLights };
