import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './layout/Layout.tsx';
import { VacanciesPage } from './pages/VacanciesPage.tsx';
import { VacancyPage } from './pages/VacancyPage.tsx';
import { FavoriteVacanciesPage } from './pages/FavoriteVacanciesPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',

      element: <Layout />,
      children: [
        {
          index: true,
          element: <VacanciesPage />,
        },
        {
          path: 'vacancies/:vacancyId',
          element: <VacancyPage />,
        },
        {
          path: 'favorites',
          element: <FavoriteVacanciesPage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
  {
    basename: import.meta.env.DEV ? '/' : '/startup-summer-2023',
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
