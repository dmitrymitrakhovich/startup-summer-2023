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
import { SetURLSearchParams } from 'react-router-dom';

interface FilterProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Filters = ({ searchParams, setSearchParams }: FilterProps) => {
  const { data, isLoading, isError } = CataloguesApi.useCatalogues();

  const cataloguesOptions =
    data &&
    data?.map((c) => ({
      value: String(c.key),
      label: c.title_trimmed,
    }));

  return (
    <form>
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
            type='reset'
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
              name='catalogues'
              defaultValue={searchParams.get('catalogues')}
              w='100%'
              size='md'
              radius='md'
              placeholder='Выберете отрасль'
              rightSection={isLoading ? <Loader size='1rem' /> : null}
              data={cataloguesOptions || []}
              error={isError ? 'He удалось получить категории' : null}
              // value={params.catalogues}
              // onChange={(v) =>
              //   setParams({ ...params, catalogues: String(v) })
              // }
              data-elem='industry-select'
            />
          </Group>

          <Group spacing='md' mt='md' mb='md'>
            <Text size='md' fw='bold'>
              Оклад
            </Text>
            <NumberInput
              name='payment_from'
              defaultValue={Number(searchParams.get('payment_from')) || ''}
              // value={Number(params.payment_from) || ''}
              // onChange={(v) =>
              //   setParams({ ...params, payment_from: String(v) })
              // }
              size='md'
              placeholder='От'
              w='100%'
              radius='md'
              min={0}
              data-elem='salary-from-input'
            />
            <NumberInput
              name='payment_to'
              // value={Number(params.payment_to) || ''}
              // onChange={(v) =>
              //   setParams({ ...params, payment_to: String(v) })
              // }
              defaultValue={Number(searchParams.get('payment_to')) || ''}
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
          >
            Применить
          </Button>
        </Group>
      </Card>
    </form>
  );
};
