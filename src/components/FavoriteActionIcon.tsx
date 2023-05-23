import { ActionIcon, Skeleton, createStyles } from '@mantine/core';
import { ReactComponent as IconStar } from '../assets/icons/Star.svg';
import { useFavoriteVacanciesStore } from '../store/favoriteVacancies';
import { VacancyInfo } from '../types/vacancies.types';

interface FavoriteActionIconProps {
  id: VacancyInfo['id'];
  isFetching: boolean;
}

export const FavoriteActionIcon = ({
  id,
  isFetching,
}: FavoriteActionIconProps) => {
  const favoriteVacancies = useFavoriteVacanciesStore(
    (state) => state.favoriteVacanciesIds
  );

  const addFavoriteVacancy = useFavoriteVacanciesStore(
    (state) => state.addFavoriteVacancy
  );

  const removeFavoriteVacancy = useFavoriteVacanciesStore(
    (state) => state.removeFavoriteVacancy
  );

  const toggleFavoriteVacancy = (vacancyId: number) => {
    if (favoriteVacancies.includes(vacancyId)) {
      removeFavoriteVacancy(vacancyId);
      return;
    }
    addFavoriteVacancy(vacancyId);
  };

  const { classes, cx } = useStyles();

  return (
    <ActionIcon
      onClick={() => toggleFavoriteVacancy(id)}
      variant='transparent'
      className={cx(classes.star, {
        [classes.starActive]: favoriteVacancies.includes(id),
      })}
      data-elem={`vacancy-${id}-shortlist-button`}
    >
      <Skeleton visible={isFetching}>
        <IconStar />
      </Skeleton>
    </ActionIcon>
  );
};

const useStyles = createStyles((theme) => ({
  star: {
    '&:hover path': {
      stroke: theme.colors.blue[5],
    },
  },

  starActive: {
    svg: {
      fill: theme.colors.blue[5],
    },
    path: {
      stroke: theme.colors.blue[5],
    },
  },
}));
