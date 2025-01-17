import { useEffect } from 'react';
import { reatomComponent } from '@reatom/npm-react';

import { christmasLight } from '@/entities';
import { toggleChristmasLights } from '@/features/toggle-christmas-ligths';
import { Toggle } from '@/shared/ui/toggle';

const ChristmasLights = reatomComponent(({ ctx }) => {
  useEffect(() => {
    christmasLight.atom.isChristmasLightsAtom(ctx);
  }, []);

  return (
    <div>
      <div className='flex items-center space-x-2'>
        <span className='leading-none'>Toggle ChristmasLights</span>
        <Toggle
          checked={ctx.spy(christmasLight.atom.isChristmasLightsAtom.dataAtom)}
          onChange={() => toggleChristmasLights(ctx)}
        />
      </div>
    </div>
  );
});

export { ChristmasLights };
