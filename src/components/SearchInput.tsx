import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { QueryObserverResult } from '@tanstack/react-query';
import { SetURLSearchParams } from 'react-router-dom';

import {
  VacanciesResponse,
  VacanciesSearchParams,
} from '../types/vacancies.types';

interface SearchInputProps {
  params: Partial<VacanciesSearchParams>;
  setParams: React.Dispatch<
    React.SetStateAction<Partial<VacanciesSearchParams>>
  >;
  setSearchParams: SetURLSearchParams;
  refetch: () => Promise<QueryObserverResult<VacanciesResponse, unknown>>;
}

export const SearchInput = ({
  params,
  setParams,
  setSearchParams,
  refetch,
}: SearchInputProps) => {
  const handleSearch = () => {
    setSearchParams((searchParams) => {
      params.keyword && searchParams.set('keyword', String(params.keyword));

      return searchParams;
    });

    refetch();
  };

  return (
    <TextInput
      icon={<IconSearch size='1.1rem' stroke={1.5} />}
      radius='md'
      size='md'
      value={params.keyword}
      onChange={(e) => setParams({ ...params, keyword: e.target.value })}
      rightSection={
        <Button
          size='xs'
          radius='md'
          data-elem='search-button'
          onClick={handleSearch}
        >
          Поиск
        </Button>
      }
      placeholder='Введите название вакансии'
      rightSectionWidth={85}
      data-elem='search-input'
    />
  );
};
