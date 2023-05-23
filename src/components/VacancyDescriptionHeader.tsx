import { Card, Flex, Group, Text } from '@mantine/core';
import { FavoriteActionIcon } from '../components/FavoriteActionIcon';
import { ReactComponent as IconLocation } from '../assets/icons/Location.svg';
import { VacancyInfo } from '../types/vacancies.types';

interface VacancyDescriptionHeaderProps {
  id: VacancyInfo['id'];
  profession: VacancyInfo['profession'];
  paymentFrom: VacancyInfo['payment_from'];
  paymentTo: VacancyInfo['payment_to'];
  townName: VacancyInfo['town']['title'];
  typeOfWorkTitle: VacancyInfo['type_of_work']['title'];
  isFetching: boolean;
}

export const VacancyDescriptionHeader = ({
  id,
  profession,
  paymentFrom,
  paymentTo,
  townName,
  typeOfWorkTitle,
  isFetching,
}: VacancyDescriptionHeaderProps) => {
  return (
    <Card
      radius='md'
      padding='md'
      withBorder
      key={id}
      data-elem={`vacancy-${id}`}
    >
      <Flex direction='column' gap='md'>
        <Flex align='center' justify='space-between'>
          <Text fz={28} fw={600}>
            {profession}
          </Text>

          <FavoriteActionIcon id={id} isFetching={isFetching} />
        </Flex>

        <Group>
          <Text fw='bold' fz='xl'>
            {!paymentFrom && !paymentTo && 'з/п не указана'}
            {paymentFrom ? `з/п от ${paymentFrom} rub` : null}
            {paymentTo ? ` до ${paymentTo} rub` : null}
          </Text>
          <Text fz='xl' fw='bold' color='gray'>
            &#183;
          </Text>
          <Text>{typeOfWorkTitle}</Text>
        </Group>

        <Group>
          <IconLocation />
          {townName}
        </Group>
      </Flex>
    </Card>
  );
};
