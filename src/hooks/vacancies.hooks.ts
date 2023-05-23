import { useQuery } from '@tanstack/react-query';

import { api } from '../api/apiClient';
import { useFavoriteVacanciesStore } from '../store/favoriteVacancies';
import { VacanciesResponse, VacancyInfo } from '../types/vacancies.types';

async function getVacancies(searchParams?: URLSearchParams) {
  const page = searchParams?.get('page') || '1';
  return await api
    .get(
      `vacancies?count=4&page=${Number(page) - 1}&${searchParams?.toString()}`
    )
    .json<VacanciesResponse>();
}

async function getVacancy(id: VacancyInfo['id']) {
  return await api.get(`vacancies/${id}`).json<VacancyInfo>();
}

async function getFavoriteVacancies(page: string, ids: string) {
  return await api
    .get(`vacancies/?count=4&page=${Number(page) - 1}&${ids}`)
    .json<VacanciesResponse>();
}

export const VacanciesApi = {
  useVacancies: (searchParams: URLSearchParams) => {
    return useQuery(
      ['vacancies', searchParams.get('page')],
      () => getVacancies(searchParams),
      {
        refetchOnWindowFocus: false,
      }
    );
  },
  useVacancy: (id: VacancyInfo['id']) => {
    return useQuery(['vacancy', id], () => getVacancy(id), {
      refetchOnWindowFocus: false,
    });
  },

  useFavoriteVacancies: (searchParams: URLSearchParams) => {
    const favoriteVacancies = useFavoriteVacanciesStore(
      (state) => state.favoriteVacanciesIds
    );

    const idsSting: string = favoriteVacancies
      .map((id) => `ids[]=${id}`)
      .join('&');

    const page = searchParams.get('page') || '1';

    return useQuery(
      ['favoritVacancies', page],
      () => getFavoriteVacancies(page, idsSting),
      {
        refetchOnWindowFocus: false,
        enabled: !!favoriteVacancies.length,
      }
    );
  },
};
