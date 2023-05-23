import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { ServerError } from '../components/ServerError';
import { VacanciesList } from '../components/VacanciesList';
import { VacanciesPagination } from '../components/VacanciesPagination';
import { Link, useSearchParams } from 'react-router-dom';
import { useFavoriteVacanciesStore } from '../store/favoriteVacancies';
import { Empty } from '../components/Empty';

export const FavoriteVacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, isFetching } =
    VacanciesApi.useFavoriteVacancies(searchParams);

  const favoriteVacancies = useFavoriteVacanciesStore(
    (state) => state.favoriteVacanciesIds
  );

  if (!favoriteVacancies.length) {
    return (
      <Flex h='100%' direction='column' align='center'>
        <Empty />
        <Title>Упс, здесь еще ничего нет!</Title>
        <Button variant='light' size='lg' component={Link} to='/'>
          Поиск Вакансий
        </Button>
      </Flex>
    );
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
