import {
  Burger,
  Container,
  createStyles,
  Flex,
  Group,
  Header,
  Paper,
  rem,
  Transition,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink } from 'react-router-dom';

import { ReactComponent as IconLogo } from '../assets/icons/Logo.svg';

const HEADER_HEIGHT = rem(84);

const links = [
  {
    link: '/',
    label: 'Поиск Вакансий',
  },
  {
    link: '/favorites',
    label: 'Избранное',
  },
];

export function TopBar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((l) => (
    <NavLink
      key={l.label}
      to={l.link}
      className={({ isActive }) =>
        cx(classes.link, {
          [classes.linkActive]: isActive,
        })
      }
      onClick={close}
    >
      {l.label}
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} withBorder={false}>
      <Container className={classes.header}>
        <Link to={links[0].link}>
          <Flex justify='center'>
            <IconLogo />
          </Flex>
        </Link>
        <Group spacing={60} className={classes.links}>
          {items}
        </Group>
        <Group></Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size='sm'
        />

        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    color: theme.colors.blue[6],
    transition: 'all 0.3s',
  },
}));
