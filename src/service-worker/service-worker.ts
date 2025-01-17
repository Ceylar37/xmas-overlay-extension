import { FIREWORK_PAIRS, SNOWFLAKE_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

import { handleGetChristmasLights } from './handle-get-christmas-ligths';
import { handleGetSnowflakes } from './handle-get-snowflakes';
import { handleToggleChristmasLights } from './handle-toggle-christmas-ligths';
import { handleToggleSnowflakes } from './handle-toggle-snowflakes';

type Pairs = SNOWFLAKE_PAIRS & FIREWORK_PAIRS;
type ServiceWorkerFunctions = {
  [K in keyof Pairs as Pairs[K]['message']['key']]: HandlerFromPair<Pairs[K]>;
};

const serviceWorkerFunctions: ServiceWorkerFunctions = {
  'SNOWFLAKE/GET': handleGetSnowflakes,
  'SNOWFLAKE/TOGGLE': handleToggleSnowflakes,
  'FIREWORK/GET': handleGetChristmasLights,
  'FIREWORK/TOGGLE': handleToggleChristmasLights
};

// NOTE: chrome.runtime.onMessage.addListener callback must return true if you want to send a response from async function
chrome.runtime.onMessage.addListener((message: Pairs[keyof Pairs]['message'], sender, sendResponse) => {
  const handler = serviceWorkerFunctions[message.key];
  if (handler) {
    // @ts-expect-error: ts is bad
    handler(message, sender).then((result) => {
      sendResponse(result);
    });
    return true;
  }
});
