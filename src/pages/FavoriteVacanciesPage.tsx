import { Box, Center, Flex, Loader } from '@mantine/core';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { ServerError } from '../components/ServerError';
import { VacanciesList } from '../components/VacanciesList';
import { VacanciesPagination } from '../components/VacanciesPagination';
import { useSearchParams } from 'react-router-dom';
import { useFavoriteVacanciesStore } from '../store/favoriteVacancies';

export const FavoriteVacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, isFetching } =
    VacanciesApi.useFavoriteVacancies(searchParams);

  const favoriteVacancies = useFavoriteVacanciesStore(
    (state) => state.favoriteVacanciesIds
  );

  if (!favoriteVacancies.length) {
    return <Box>123</Box>;
  }

  if (isLoading) {
    return (
      <Center h='100%' mx='auto'>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <Flex mt='xl' mb='xl' direction='column' gap='md'>
      <VacanciesList data={data} isFetching={isFetching} />
      <VacanciesPagination
        total={Math.ceil(data.total / 4)}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Flex>
  );
};
