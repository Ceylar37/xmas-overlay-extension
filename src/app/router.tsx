import { createMemoryRouter, Location, Outlet } from 'react-router-dom';

import { Fireworks, Snowflakes } from '../pages';
import { Layout } from '../widgets';

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Snowflakes />
      },
      {
        path: '/fireworks',
        element: <Fireworks />
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
