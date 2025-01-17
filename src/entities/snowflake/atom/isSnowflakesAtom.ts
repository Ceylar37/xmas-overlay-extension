import { reatomAsync, withDataAtom } from '@reatom/async';

import { SNOWFLAKE_PAIRS } from '../type';

const isSnowflakesAtom = reatomAsync(
  async () =>
    chrome.runtime.sendMessage<
      SNOWFLAKE_PAIRS['GET_SNOWFLAKE']['message'],
      SNOWFLAKE_PAIRS['GET_SNOWFLAKE']['response']
    >({
      key: 'SNOWFLAKE/GET'
    }),
  'isSnowflakes'
).pipe(withDataAtom(false));

const updateIsSnowflakes = reatomAsync(
  async () => {
    await chrome.runtime.sendMessage<
      SNOWFLAKE_PAIRS['TOGGLE_SNOWFLAKE']['message'],
      SNOWFLAKE_PAIRS['TOGGLE_SNOWFLAKE']['response']
    >({ key: 'SNOWFLAKE/TOGGLE' });
  },
  {
    name: 'updateIsSnowflakes',
    onEffect(ctx) {
      const isChristmasLights = ctx.get(isSnowflakesAtom.dataAtom);
      isSnowflakesAtom.dataAtom(ctx, !isChristmasLights);
    }
  }
);

export { isSnowflakesAtom, updateIsSnowflakes };
