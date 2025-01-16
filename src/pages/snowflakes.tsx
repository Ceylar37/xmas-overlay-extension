import { useEffect } from 'react';
import { reatomComponent } from '@reatom/npm-react';

import { snowflake } from '@/entities';
import { toggleSnowflakes } from '@/features';
import { Toggle } from '@/shared/ui/toggle';

const Snowflakes = reatomComponent(({ ctx }) => {
  useEffect(() => {
    snowflake.atom.isSnowflakesAtom(ctx);
  }, []);

  return (
    <div>
      <div className='flex items-center space-x-2'>
        <span className='leading-none'>Toggle Snowflakes</span>
        <Toggle checked={ctx.spy(snowflake.atom.isSnowflakesAtom.dataAtom)} onChange={() => toggleSnowflakes(ctx)} />
      </div>
    </div>
  );
});

export { Snowflakes };
