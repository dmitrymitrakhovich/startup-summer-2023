import {
  Button,
  Card,
  Flex,
  Group,
  Loader,
  NumberInput,
  Select,
  Text,
} from '@mantine/core';
import { CataloguesApi } from '../hooks/catalogues.hooks';
import {
  VacanciesResponse,
  VacanciesSearchParams,
} from '../types/vacancies.types';
import { SetURLSearchParams } from 'react-router-dom';
import { QueryObserverResult } from '@tanstack/react-query';

interface FilterProps {
  params: Partial<VacanciesSearchParams>;
  setParams: React.Dispatch<
    React.SetStateAction<Partial<VacanciesSearchParams>>
  >;
  setSearchParams: SetURLSearchParams;
  refetch: () => Promise<QueryObserverResult<VacanciesResponse, unknown>>;
}

export const Filters = ({
  params,
  setParams,
  setSearchParams,
  refetch,
}: FilterProps) => {
  const { data, isLoading, isError } = CataloguesApi.useCatalogues();

  const cataloguesOptions =
    data &&
    data?.map((c) => ({
      value: String(c.key),
      label: c.title_trimmed,
    }));

  const setFilters = () => {
    setSearchParams((searchParams) => {
      params.catalogues &&
        searchParams.set('catalogues', String(params.catalogues));

      params.payment_from &&
        searchParams.set('payment_from', String(params.payment_from));

      params.payment_to &&
        searchParams.set('payment_to', String(params.payment_to));
      return searchParams;
    });

    refetch();
  };

  const handleFiltersReset = () => {
    setParams({
      catalogues: '',
    });

    setSearchParams((searchParams) => {
      searchParams.delete('catalogues');
      searchParams.delete('payment_from');
      searchParams.delete('payment_to');
      return searchParams;
    });

    refetch();
  };

  return (
    <Card radius='md' padding='md' withBorder>
      <Flex align='center' justify='space-between'>
        <Text size='xl' fw='bold'>
          Фильтры
        </Text>
        <Button
          variant='white'
          leftIcon
          color='gray'
          fw='normal'
          p={0}
          onClick={handleFiltersReset}
        >
          Сбросить все &#10005;
        </Button>
      </Flex>

      <Group mt='xl'>
        <Group>
          <Text size='md' fw='bold'>
            Отрасль
          </Text>

          <Select
            w='100%'
            size='md'
            radius='md'
            placeholder='Выберете отрасль'
            rightSection={isLoading ? <Loader size='1rem' /> : null}
            data={cataloguesOptions || []}
            error={isError ? 'He удалось получить категории' : null}
            value={params.catalogues}
            onChange={(v) => setParams({ ...params, catalogues: String(v) })}
            data-elem='industry-select'
          />
        </Group>

        <Group spacing='md' mt='md' mb='md'>
          <Text size='md' fw='bold'>
            Оклад
          </Text>
          <NumberInput
            value={Number(params.payment_from) || ''}
            onChange={(v) => setParams({ ...params, payment_from: String(v) })}
            size='md'
            placeholder='От'
            w='100%'
            radius='md'
            min={0}
            data-elem='salary-from-input'
          />
          <NumberInput
            value={Number(params.payment_to) || ''}
            onChange={(v) => setParams({ ...params, payment_to: String(v) })}
            size='md'
            placeholder='До'
            w='100%'
            radius='md'
            min={0}
            data-elem='salary-to-input'
          />
        </Group>

        <Button
          size='md'
          fullWidth
          radius='md'
          type='submit'
          data-elem='search-button'
          onClick={setFilters}
        >
          Применить
        </Button>
      </Group>
    </Card>
  );
};
