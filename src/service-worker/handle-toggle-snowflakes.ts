import { snowflake, SNOWFLAKE_PAIRS } from '@/entities';
import { HandlerFromPair } from '@/shared/lib/utils';

const handleToggleSnowflakes: HandlerFromPair<SNOWFLAKE_PAIRS['TOGGLE_SNOWFLAKE']> = async () => {
  const isSnowflakes = await snowflake.model.getIsSnowflakes();

  await snowflake.model.setIsSnowflakes(!isSnowflakes);
};

export { handleToggleSnowflakes };
