import { Card, Flex, Group, Skeleton, Text, createStyles } from '@mantine/core';
import { FavoriteActionIcon } from './FavoriteActionIcon';
import { Link } from 'react-router-dom';
import { VacancyInfo } from '../types/vacancies.types';
import { ReactComponent as IconLocation } from '../assets/icons/Location.svg';

interface VacancyCardProps {
  id: VacancyInfo['id'];
  profession: VacancyInfo['profession'];
  paymentFrom: VacancyInfo['payment_from'];
  paymentTo: VacancyInfo['payment_to'];
  townName: VacancyInfo['town']['title'];
  typeOfWorkTitle: VacancyInfo['type_of_work']['title'];
  isFetching: boolean;
}

export const VacancyCard = ({
  id,
  profession,
  paymentFrom,
  paymentTo,
  townName,
  typeOfWorkTitle,
  isFetching,
}: VacancyCardProps) => {
  const { classes } = useStyles();

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
          <Text
            color='blue'
            size='xl'
            fw={600}
            component={Link}
            to={`/vacancies/${id}`}
          >
            <Skeleton visible={isFetching} width={500}>
              <p className={classes.title}>{profession}</p>
            </Skeleton>
          </Text>

          <FavoriteActionIcon id={id} isFetching={isFetching} />
        </Flex>

        <Group>
          <Text fw='bold'>
            <Skeleton visible={isFetching}>
              {!paymentFrom && !paymentTo && 'з/п не указана'}
              {paymentFrom ? `з/п от ${paymentFrom} rub` : null}
              {paymentTo ? ` до ${paymentTo} rub` : null}
            </Skeleton>
          </Text>
          <Text fz='xl' fw='bold' color='gray'>
            &#183;
          </Text>
          <Text>
            <Skeleton visible={isFetching}>{typeOfWorkTitle}</Skeleton>
          </Text>
        </Group>

        <Group>
          <IconLocation />
          <Skeleton visible={isFetching} width={200}>
            {townName}
          </Skeleton>
        </Group>
      </Flex>
    </Card>
  );
};

const useStyles = createStyles(() => ({
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
  },
}));
