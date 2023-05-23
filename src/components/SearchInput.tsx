import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const SearchInput = () => {
  // const handleSearch = () => {
  //   if (params.keyword) {
  //     setSearchParams((searchParams) => {
  //       searchParams.set('keyword', params.keyword as string);
  //       return searchParams;
  //     });
  //   }
  //   refetch();
  // };

  return (
    <TextInput
      icon={<IconSearch size='1.1rem' stroke={1.5} />}
      radius='md'
      size='md'
      // value={params.keyword}
      // onChange={(e) => setParams({ ...params, keyword: e.target.value })}
      rightSection={
        <Button
          size='xs'
          radius='md'
          data-elem='search-button'
          // onClick={handleSearch}
        >
          Поиск
        </Button>
      }
      placeholder='Введите название вакансии'
      rightSectionWidth={85}
      data-elem='search-input'
    />
  );
};
