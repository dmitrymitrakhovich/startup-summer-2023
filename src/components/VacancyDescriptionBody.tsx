import { Paper } from '@mantine/core';
import { VacancyInfo } from '../types/vacancies.types';
import { createMarkup } from '../utils/helpers';

interface VacancyInfoProps {
  info: VacancyInfo['vacancyRichText'];
}

export const VacancyDescriptionBody = ({ info }: VacancyInfoProps) => {
  return (
    <Paper
      mt='md'
      withBorder
      dangerouslySetInnerHTML={createMarkup(info)}
      p='md'
      radius='md'
    />
  );
};
