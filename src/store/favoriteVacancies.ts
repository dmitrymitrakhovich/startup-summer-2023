import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type favoriteVacanciesState = {
  favoriteVacanciesIds: number[];
  addFavoriteVacancy: (id: number) => void;
  removeFavoriteVacancy: (id: number) => void;
};

export const useFavoriteVacanciesStore = create(
  persist<favoriteVacanciesState>(
    (set) => ({
      favoriteVacanciesIds: [],
      addFavoriteVacancy: (vacancyId: number) =>
        set((state) => ({
          favoriteVacanciesIds: [...state.favoriteVacanciesIds, vacancyId],
        })),
      removeFavoriteVacancy: (vacancyId: number) =>
        set((state) => ({
          favoriteVacanciesIds: state.favoriteVacanciesIds.filter(
            (id) => id !== vacancyId
          ),
        })),
    }),
    {
      name: 'favorite-vacancies-storage',
    }
  )
);
