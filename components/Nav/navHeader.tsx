import {
  createStyles,
  Header,
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  rem,
  ActionIcon,
  Container,
  Space,
  Anchor,
  Flex,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { IconChevronDown, IconCalendarSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { BiDollar, BiFilm, BiPlay, BiSearch, BiTrendingUp } from 'react-icons/bi';

import { TbTrophy } from 'react-icons/tb';
import { FaSearch } from 'react-icons/fa';
import NewAutocomplete from '../Autocomplete/autocomplete';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  subLinkGroup: {
    // width: '100%',
    // ...theme.fn.hover({
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[7] : theme.colors.gray[0],
    // }),
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

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

const mockdata = [
  {
    icon: BiTrendingUp,
    title: 'Popular',
    description: 'The most popular movies right now',
    path: '/movies/popular',
  },
  {
    icon: TbTrophy,
    title: 'Top 100',
    description: 'The top 100 movies of all time',
    path: '/movies/top100',
  },
  {
    icon: BiPlay,
    title: 'Now Playing',
    description: 'In theaters now',
    path: '/movies/now_playing',
  },
  {
    icon: IconCalendarSearch,
    title: 'Upcoming',
    description: 'Coming soon to a theater near you',
    path: '/movies/upcoming',
  },
  {
    icon: BiDollar,
    title: 'Box Office',
    description: 'The highest grossing movies of all time',
    path: 'Box Office',
  },
  {
    icon: BiSearch,
    title: 'Browse Movies',
    description: "Search movies based on what's important to you",
    path: '/movies/popular',
  },
];

const tvData = [
  {
    icon: BiTrendingUp,
    title: 'Popular',
    description: 'The most popular TV Shows right now',
    path: '/shows/popular',
  },
  {
    icon: TbTrophy,
    title: 'Top 100',
    description: 'The top 100 TV Shows of all time',
    path: '/shows/top100',
  },
  {
    icon: BiSearch,
    title: 'Browse TV',
    description: "Find TV Shows based on what's important to you",
    path: '/shows/popular',
  },
];

export function NavHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [tvLinksOpened, { toggle: toggleTVLinks }] = useDisclosure(false);
  const [searchOpened, { toggle: toggleSearch }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  function handleDrawerToggle() {
    if (searchOpened) {
      toggleSearch();
    }
    toggleDrawer();
  }

  // head/show on scroll
  const pinned = useHeadroom({ fixedAt: 120 });

  const links = mockdata.map((item) => (
    <Anchor href={item.path}>
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.colors.yellow[5]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Anchor>
  ));

  const tvlinks = tvData.map((item) => (
    <Anchor href={item.path}>
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.colors.yellow[5]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Anchor>
  ));

  return (
    <Box maw="100vw">
      <Header
        height={60}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          // padding: theme.spacing.xs,

          zIndex: 1000000,
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: 'transform 400ms ease',
        }}
      >
        <Container h={60} size="xl">
          <Group position="apart" sx={{ height: '100%' }}>
            <Group spacing={5}>
              <Burger
                opened={drawerOpened}
                onClick={handleDrawerToggle}
                className={classes.hiddenDesktop}
              />
              <BiFilm className={classes.hiddenMobile} color={theme.colors.yellow[5]} size={20} />
              <Text c="yellow.5" fz="xl" fw={800} component={Link} href="/">
                Cinegraph
              </Text>
            </Group>

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Link href="/" className={classes.link}>
                Home
              </Link>
              <HoverCard
                zIndex={1000}
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/movies/popular" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Movies
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.yellow[4]} />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text fw={500}>Movies</Text>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard
                zIndex={1000}
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/shows/popular" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        TV Shows
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.yellow[4]} />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text fw={500}>TV Shows</Text>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {tvlinks}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>

              <Link href="/people/people" className={classes.link}>
                People
              </Link>
            </Group>

            <Flex w={129} justify="flex-end">
              <ActionIcon
                variant="transparent"
                onClick={toggleSearch}
                color={searchOpened ? 'yellow.5' : 'gray.4'}
                sx={{
                  '&:hover': {
                    color: searchOpened ? theme.colors.gray[4] : theme.colors.yellow[5],
                  },
                }}
              >
                <FaSearch />
              </ActionIcon>
            </Flex>
          </Group>
          {searchOpened && <NewAutocomplete />}
        </Container>
      </Header>
      <Drawer
        id="Drawer"
        className={classes.hiddenDesktop}
        opened={drawerOpened}
        onClose={closeDrawer}
        withOverlay
      >
        <Space h={20} />
        <Link href="/" className={classes.link}>
          Home
        </Link>
        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Movies
            </Box>
            <IconChevronDown size={16} color={theme.colors.yellow[5]} />
          </Center>
        </UnstyledButton>
        <Collapse in={linksOpened}>{links}</Collapse>

        <UnstyledButton className={classes.link} onClick={toggleTVLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              TV Shows
            </Box>
            <IconChevronDown size={16} color={theme.colors.yellow[5]} />
          </Center>
        </UnstyledButton>
        <Collapse in={tvLinksOpened}>{tvlinks}</Collapse>
        <Link href="/people/people" className={classes.link}>
          People
        </Link>
      </Drawer>
    </Box>
  );
}
