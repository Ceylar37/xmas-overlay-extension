import { action } from '@reatom/core';

import { christmasLight } from '@/entities';

const toggleChristmasLights = action(async (ctx) => {
  christmasLight.atom.updateIsChristmasLights(ctx);
}, 'toggleChristmasLights');

export { toggleChristmasLights };
