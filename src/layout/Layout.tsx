import { AppShell, Container, createStyles, rem } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { TopBar } from '../components/TopBar';

export const Layout = () => {
  const { classes } = useStyles();

  return (
    <AppShell className={classes.main} header={<TopBar />} padding={rem(40)}>
      <Container>
        <Outlet />
      </Container>
    </AppShell>
  );
};

const useStyles = createStyles((theme) => ({
  main: {
    background: theme.colors.gray[1],
  },
}));
