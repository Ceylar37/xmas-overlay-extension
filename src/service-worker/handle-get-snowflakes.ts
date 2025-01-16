import { SNOWFLAKE_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleGetSnowflakes: HandlerFromPair<SNOWFLAKE_PAIRS['GET_SNOWFLAKE']> = async () => {
  const { isSnowflakes } = await chrome.storage.sync.get<Partial<{ isSnowflakes: boolean }>>(['isSnowflakes']);
  return isSnowflakes ?? false;
};

export { handleGetSnowflakes };
