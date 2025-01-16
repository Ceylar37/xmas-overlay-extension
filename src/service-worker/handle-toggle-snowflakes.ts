import { SNOWFLAKE_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleToggleSnowflakes: HandlerFromPair<SNOWFLAKE_PAIRS['TOGGLE_SNOWFLAKE']> = async () => {
  const { isSnowflakes } = await chrome.storage.sync.get<Partial<{ isSnowflakes: boolean }>>(['isSnowflakes']);

  await chrome.storage.sync.set({ isSnowflakes: !isSnowflakes });
};

export { handleToggleSnowflakes };
