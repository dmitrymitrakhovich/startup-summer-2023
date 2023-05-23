import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './layout/Layout.tsx';
import { FavoriteVacanciesPage } from './pages/FavoriteVacanciesPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { VacanciesPage } from './pages/VacanciesPage.tsx';
import { VacancyPage } from './pages/VacancyPage.tsx';
import { queryClient } from './queryClient.ts';

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
    basename: '/startup-summer-2023/',
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            html: {
              height: '100%',
            },
            body: {
              height: '100%',
              backgroundColor: theme.colors.gray[1],
            },
          }),
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
