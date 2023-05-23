import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Container } from '@mantine/core';

export const Layout = () => {
  return (
    <>
      <TopBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
