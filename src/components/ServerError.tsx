import { createStyles, Title, Container, rem, Text } from '@mantine/core';

export function ServerError() {
  const { classes } = useStyles();

  return (
    <Container>
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text size='lg' align='center' className={classes.description}>
        Our servers could not handle your request. Try refreshing the page.
      </Text>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,

    color: theme.colors.blue[6],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.colors.gray[7],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.gray[6],
  },
}));
