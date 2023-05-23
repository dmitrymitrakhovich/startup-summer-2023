import { useQuery } from '@tanstack/react-query';
import { api } from '../api/apiClient';
import { Catalogues } from '../types/catalogues.types';

async function getCatalogues() {
  return await api.get(`catalogues`).json<Catalogues>();
}

export const CataloguesApi = {
  useCatalogues: () => {
    return useQuery(['catalogues'], getCatalogues, {
      refetchOnWindowFocus: false,
    });
  },
};
