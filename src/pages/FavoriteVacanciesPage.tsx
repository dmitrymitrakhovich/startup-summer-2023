import { Button, Center, Flex, Loader, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Link, useSearchParams } from 'react-router-dom';

import { ReactComponent as IconPerson } from '../assets/images/Person.svg';
import { ServerError } from '../components/ServerError';
import { VacanciesList } from '../components/VacanciesList';
import { VacanciesPagination } from '../components/VacanciesPagination';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { useFavoriteVacanciesStore } from '../store/favoriteVacancies';

export const FavoriteVacanciesPage = () => {
  useDocumentTitle('Jobored | Favorites');

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, isFetching } =
    VacanciesApi.useFavoriteVacancies(searchParams);

  const favoriteVacancies = useFavoriteVacanciesStore(
    (state) => state.favoriteVacanciesIds
  );

  if (!favoriteVacancies.length) {
    return (
      <Flex direction='column' align='center' gap='md'>
        <IconPerson />
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
    <Flex h='100%' direction='column' align='stretch' gap='md'>
      <VacanciesList data={data} isFetching={isFetching} />
      <VacanciesPagination
        total={Math.ceil(data.total / 4)}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Flex>
  );
};
