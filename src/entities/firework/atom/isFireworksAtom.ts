import { reatomAsync, withAbort, withDataAtom } from '@reatom/async';

import { FIREWORK_PAIRS } from '../type';

const isFireworksAtom = reatomAsync(
  async () =>
    chrome.runtime.sendMessage<FIREWORK_PAIRS['GET_FIREWORK']['message'], FIREWORK_PAIRS['GET_FIREWORK']['response']>({
      key: 'FIREWORK/GET'
    }),
  'isSnowflakes'
).pipe(withDataAtom(false), withAbort());

const updateIsFireworks = reatomAsync(
  async () => {
    await chrome.runtime.sendMessage<
      FIREWORK_PAIRS['TOGGLE_FIREWORK']['message'],
      FIREWORK_PAIRS['TOGGLE_FIREWORK']['response']
    >({ key: 'FIREWORK/TOGGLE' });
  },
  {
    name: 'updateIsFireworks',
    onEffect(ctx) {
      const isFireworks = ctx.get(isFireworksAtom.dataAtom);
      isFireworksAtom.dataAtom(ctx, !isFireworks);
    }
  }
);

export { isFireworksAtom, updateIsFireworks };
