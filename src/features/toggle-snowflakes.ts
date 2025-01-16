import { action } from '@reatom/core';

import { snowflake } from '@/entities';

const toggleSnowflakes = action(async (ctx) => {
  snowflake.atom.updateIsSnowflakes(ctx);
}, 'toggleSnowflakes');

export { toggleSnowflakes };
