import { createMemoryRouter, Location, Navigate, Outlet } from 'react-router-dom';

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

chrome.storage.sync.get<Partial<{ location: Location }>>(['location']).then(({ location }) => {
  if (location) {
    router.navigate(location.pathname, { state: location.state });
  }
});
router.subscribe((state) => {
  chrome.storage.sync.set({ location: state.location });
});

export { router };
