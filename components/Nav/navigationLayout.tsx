import { Box, Burger, Center, Collapse, Flex, NavLink, createStyles } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import Link from 'next/link';
import Autocomplete from '../Autocomplete/autocomplete';
import DesktopNavigation from './desktopNavigation';
import { MobileNavigation } from './mobileNavigation';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function NavigationLayout() {
  // styles
  const { classes } = useStyles();

  // mobile nav state
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  // prevent scroll on mobile nav
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened]);

  return (
    <Box>
      <Flex justify="space-between" p="sm">
        <Center>
          <Burger
            className={classes.hiddenDesktop}
            opened={opened}
            onClick={toggle}
            aria-label={label}
          />
          <NavLink
            c="yellow.5"
            ml="xs"
            fw={700}
            component={Link}
            href="/"
            styles={() => ({
              label: {
                fontSize: 25,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Cinegraph"
          />
        </Center>

        <DesktopNavigation />

        <Autocomplete />
      </Flex>
      <Collapse
        className={classes.hiddenDesktop}
        pb="xl"
        w="100%"
        bg="dark.9"
        in={opened}
        pos="absolute"
        transitionDuration={250}
        transitionTimingFunction="linear"
        sx={{
          zIndex: 1000,
        }}
      >
        <MobileNavigation />
      </Collapse>
    </Box>
  );
}
