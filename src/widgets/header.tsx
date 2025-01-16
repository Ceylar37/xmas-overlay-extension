import { NavLink } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

const navElements = [
  {
    name: 'Snowflakes',
    path: '/'
  },
  {
    name: 'Fireworks',
    path: '/fireworks'
  }
] as const;

const Header = () => (
  <nav>
    <ul className='flex'>
      {navElements.map(({ name, path }) => (
        <li key={name}>
          <NavLink to={path} className={({ isActive }) => cn(isActive && '[&>*]:underline')}>
            <Button variant='ghost' className='rounded-md'>
              {name}
            </Button>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export { Header };
