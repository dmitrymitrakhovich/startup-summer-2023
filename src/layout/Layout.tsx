import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Container, Flex, createStyles } from '@mantine/core';

export const Layout = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.main}>
      <TopBar />
      <Container>
        <Flex justify='center' align='center'>
          <Outlet />
        </Flex>
      </Container>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: '100vh',
    backgroundColor: theme.colors.gray[1],
  },
}));
