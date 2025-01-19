import { createMemoryRouter, Location, Navigate, Outlet } from 'react-router-dom';

import { getValueFromStorage, setValueToStorage } from '@/shared/lib/storage';

import { ChristmasLights, Snowflakes } from '../pages';
import { Layout } from '../widgets';

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <Navigate to='/' />,
    children: [
      {
        index: true,
        element: <Snowflakes />
      },
      {
        path: '/christmasLights',
        element: <ChristmasLights />
      }
    ]
  }
]);

getValueFromStorage<'location', Location>('location').then((location) => {
  if (location) {
    router.navigate(location.pathname, { state: location.state });
  }
});
router.subscribe((state) => {
  setValueToStorage('location', state.location);
});

export { router };
