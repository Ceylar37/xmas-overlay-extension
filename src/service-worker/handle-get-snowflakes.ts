import { snowflake, SNOWFLAKE_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleGetSnowflakes: HandlerFromPair<SNOWFLAKE_PAIRS['GET_SNOWFLAKE']> = async () => {
  return await snowflake.model.getIsSnowflakes();
};

export { handleGetSnowflakes };
