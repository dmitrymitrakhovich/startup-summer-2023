import { Center, Flex, Grid, Loader } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { ServerError } from '../components/ServerError';
import { useState } from 'react';
import { getCurrentParams } from '../utils/helpers';
import { VacanciesSearchParams } from '../types/vacancies.types';
import { Filters } from '../components/Filters';
import { SearchInput } from '../components/SearchInput';
import { VacanciesList } from '../components/VacanciesList';
import { VacanciesPagination } from '../components/VacanciesPagination';

export const VacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Partial<VacanciesSearchParams>>(() =>
    getCurrentParams(searchParams)
  );

  const { data, isLoading, isError, isFetching, refetch } =
    VacanciesApi.useVacancies(searchParams);

  const handleFiltersSubmit =
    () => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // const catalogues = event.currentTarget.catalogues.value;
      // const payment_from = event.currentTarget.payment_from.value;
      // const payment_to = event.currentTarget.payment_to.value;

      // console.log(catalogues, payment_from, payment_to);
      // if (catalogues) {
      //   setSearchParams((searchParams) => {
      //     searchParams.set('catalogues', catalogues);
      //     return searchParams;
      //   });
      // }
      // if (payment_from) {
      //   setSearchParams((searchParams) => {
      //     searchParams.set('payment_from', payment_from);
      //     return searchParams;
      //   });
      // }
      // if (payment_to) {
      //   setSearchParams((searchParams) => {
      //     searchParams.set('payment_to', payment_to);
      //     return searchParams;
      //   });
      // }

      refetch();
    };

  // const handleFiltersReset = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   event.currentTarget.catalogues.value = '';
  //   event.currentTarget.catalogues.value = '';

  //   setSearchParams((searchParams) => {
  //     searchParams.delete('catalogues');
  //     searchParams.delete('payment_from');
  //     searchParams.delete('payment_to');
  //     return searchParams;
  //   });
  //   refetch();
  // };

  if (isError) {
    return <ServerError />;
  }

  return (
    <Grid mt='xl' mb='xl'>
      <Grid.Col span={4}>
        <Filters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Grid.Col>

      <Grid.Col span={8}>
        <Flex direction='column' gap='md'>
          <SearchInput />

          {isLoading ? (
            <Center h='100%' mx='auto'>
              <Loader />
            </Center>
          ) : (
            <VacanciesList data={data} isFetching={isFetching} />
          )}
          <VacanciesPagination
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            total={!isLoading && data ? data?.total / 4 : 1}
          />
        </Flex>
      </Grid.Col>
    </Grid>
  );
};
