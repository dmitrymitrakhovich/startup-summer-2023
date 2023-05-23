import { Center, Pagination } from '@mantine/core';
import { SetURLSearchParams } from 'react-router-dom';

import { VacanciesResponse } from '../types/vacancies.types';

interface VacanciesPaginationProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  total: VacanciesResponse['total'];
}

export const VacanciesPagination = ({
  searchParams,
  setSearchParams,
  total,
}: VacanciesPaginationProps) => {
  return (
    <Center>
      <Pagination
        value={Number(searchParams.get('page')) || 1}
        onChange={(p) => {
          setSearchParams((searchParams) => {
            searchParams.set('page', String(p));
            return searchParams;
          });
        }}
        total={total}
      />
    </Center>
  );
};
