import { Center, Flex, Grid, Loader } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Empty } from '../components/Empty';
import { Filters } from '../components/Filters';
import { SearchInput } from '../components/SearchInput';
import { ServerError } from '../components/ServerError';
import { VacanciesList } from '../components/VacanciesList';
import { VacanciesPagination } from '../components/VacanciesPagination';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { VacanciesSearchParams } from '../types/vacancies.types';
import { getCurrentParams } from '../utils/helpers';

export const VacanciesPage = () => {
  useDocumentTitle('Jobored | Vacancies');

  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Partial<VacanciesSearchParams>>(() =>
    getCurrentParams(searchParams)
  );

  const { data, isLoading, isError, isFetching, refetch } =
    VacanciesApi.useVacancies(searchParams);

  if (isError) {
    return <ServerError />;
  }

  return (
    <Grid>
      <Grid.Col span={4}>
        <Filters
          params={params}
          setParams={setParams}
          setSearchParams={setSearchParams}
          refetch={refetch}
        />
      </Grid.Col>

      <Grid.Col span={8}>
        <Flex direction='column' gap='md' align='stretch' h='100%'>
          <SearchInput
            params={params}
            setParams={setParams}
            setSearchParams={setSearchParams}
            refetch={refetch}
          />

          {isLoading ? (
            <Center h='100%' mx='auto'>
              <Loader />
            </Center>
          ) : (
            <>
              {!data.objects.length ? (
                <Empty />
              ) : (
                <>
                  <VacanciesList data={data} isFetching={isFetching} />
                  <VacanciesPagination
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    total={!isLoading && data ? data?.total / 4 : 1}
                  />
                </>
              )}
            </>
          )}
        </Flex>
      </Grid.Col>
    </Grid>
  );
};
