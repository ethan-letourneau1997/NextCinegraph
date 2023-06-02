import { Box, Burger, Center, Collapse, Flex, Title, createStyles } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
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
    <Box
      // bg="#27272A"
      // bg="dark.9"
      bg="transparent"
    >
      <Flex justify="space-between" p="sm">
        <Center>
          <Burger
            className={classes.hiddenDesktop}
            opened={opened}
            onClick={toggle}
            aria-label={label}
          />
          <Title c="yellow.5" size="h2" ml="xs" fw={700}>
            Cinegraph
          </Title>
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
