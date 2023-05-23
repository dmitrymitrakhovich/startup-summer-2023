import { Flex, Text, Title } from '@mantine/core';

import { ReactComponent as IconPerson } from '../assets/images/Person.svg';

export const Empty = () => {
  return (
    <Flex direction='column' justify='center' align='center'>
      <IconPerson />
      <Title>Упс, ничего не найдено!</Title>
      <Text>Попробуйте поискать другие вакансии</Text>
    </Flex>
  );
};
