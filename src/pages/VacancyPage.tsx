import { useParams } from 'react-router-dom';
import { VacanciesApi } from '../hooks/vacancies.hooks';
import { ServerError } from '../components/ServerError';
import { Box, Center, Loader } from '@mantine/core';

import { VacancyDescriptionBody } from '../components/VacancyDescriptionBody';
import { VacancyDescriptionHeader } from '../components/VacancyDescriptionHeader';

export const VacancyPage = () => {
  const { vacancyId } = useParams();
  const { data, isLoading, isError, isFetching } = VacanciesApi.useVacancy(
    Number(vacancyId)
  );

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
    <Box mt='xl' mb='xl'>
      <VacancyDescriptionHeader
        id={data.id}
        paymentFrom={data.payment_from}
        paymentTo={data.payment_to}
        profession={data.profession}
        townName={data.town.title}
        typeOfWorkTitle={data.type_of_work.title}
        isFetching={isFetching}
      />
      <VacancyDescriptionBody info={data.vacancyRichText} />
    </Box>
  );
};
