import { useEffect } from 'react';
import { reatomComponent } from '@reatom/npm-react';

import { firework } from '@/entities';
import { toggleFireworks } from '@/features/toggle-fireworks';
import { Toggle } from '@/shared/ui/toggle';

const Fireworks = reatomComponent(({ ctx }) => {
  useEffect(() => {
    firework.atom.isFireworksAtom(ctx);
  }, []);

  return (
    <div>
      <div className='flex items-center space-x-2'>
        <span className='leading-none'>Toggle Fireworks</span>
        <Toggle checked={ctx.spy(firework.atom.isFireworksAtom.dataAtom)} onChange={() => toggleFireworks(ctx)} />
      </div>
    </div>
  );
});

export { Fireworks };
