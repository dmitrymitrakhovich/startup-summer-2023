import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Container, createStyles } from '@mantine/core';

export const Layout = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.main}>
      <TopBar />
      <Container>
        <Outlet />
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
