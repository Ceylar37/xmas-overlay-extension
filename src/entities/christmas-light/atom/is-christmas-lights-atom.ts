import { reatomAsync, withAbort, withDataAtom } from '@reatom/async';

import { FIREWORK_PAIRS } from '../type';

const isChristmasLightsAtom = reatomAsync(
  async () =>
    chrome.runtime.sendMessage<FIREWORK_PAIRS['GET_FIREWORK']['message'], FIREWORK_PAIRS['GET_FIREWORK']['response']>({
      key: 'FIREWORK/GET'
    }),
  'isSnowflakes'
).pipe(withDataAtom(false), withAbort());

const updateIsChristmasLights = reatomAsync(
  async () => {
    await chrome.runtime.sendMessage<
      FIREWORK_PAIRS['TOGGLE_FIREWORK']['message'],
      FIREWORK_PAIRS['TOGGLE_FIREWORK']['response']
    >({ key: 'FIREWORK/TOGGLE' });
  },
  {
    name: 'updateIsChristmasLights',
    onEffect(ctx) {
      const isChristmasLights = ctx.get(isChristmasLightsAtom.dataAtom);
      isChristmasLightsAtom.dataAtom(ctx, !isChristmasLights);
    }
  }
);

export { isChristmasLightsAtom, updateIsChristmasLights };
