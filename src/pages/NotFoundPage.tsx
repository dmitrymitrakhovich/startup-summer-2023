import {
  Button,
  Container,
  createStyles,
  rem,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Link } from 'react-router-dom';

import { ReactComponent as Image404 } from '../assets/images/404.svg';

export function NotFoundPage() {
  useDocumentTitle('Jobored | Not Found');

  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color='dimmed' size='lg'>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            component={Link}
            to='/'
            variant='outline'
            size='md'
            mt='xl'
            className={classes.control}
          >
            Get back to home page
          </Button>
        </div>
        <Image404 />
      </SimpleGrid>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));
