import { VacanciesResponse } from '../types/vacancies.types';
import { VacancyCard } from './VacancyCard';

interface VacanaciesListProps {
  data: VacanciesResponse;
  isFetching: boolean;
}

export const VacanciesList = ({ data, isFetching }: VacanaciesListProps) => {
  return (
    <>
      {data?.objects.map((vacancyInfo) => (
        <VacancyCard
          key={vacancyInfo.id}
          id={vacancyInfo.id}
          paymentFrom={vacancyInfo.payment_from}
          paymentTo={vacancyInfo.payment_to}
          profession={vacancyInfo.profession}
          townName={vacancyInfo.town.title}
          typeOfWorkTitle={vacancyInfo.type_of_work.title}
          isFetching={isFetching}
        />
      ))}
    </>
  );
};
