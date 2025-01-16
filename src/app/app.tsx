import { RouterProvider } from 'react-router-dom';
import { createCtx } from '@reatom/core';
import { reatomContext } from '@reatom/npm-react';

import { router } from './router';

const ctx = createCtx();

const App = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <RouterProvider router={router} />
    </reatomContext.Provider>
  );
};

export { App };

