import { action } from '@reatom/core';

import { firework } from '@/entities';

const toggleFireworks = action(async (ctx) => {
  firework.atom.updateIsFireworks(ctx);
}, 'toggleFireworks');

export { toggleFireworks };
