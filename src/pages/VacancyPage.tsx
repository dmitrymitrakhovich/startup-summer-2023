import { Center, Flex, Loader } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import { ServerError } from '../components/ServerError';
import { VacancyDescriptionBody } from '../components/VacancyDescriptionBody';
import { VacancyDescriptionHeader } from '../components/VacancyDescriptionHeader';
import { VacanciesApi } from '../hooks/vacancies.hooks';

export const VacancyPage = () => {
  const { vacancyId } = useParams();

  const { data, isLoading, isError, isFetching } = VacanciesApi.useVacancy(
    Number(vacancyId)
  );

  useDocumentTitle(`Jobored | ${data ? data?.profession : 'Profession'}`);

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
    <Flex gap='md' direction='column'>
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
    </Flex>
  );
};
