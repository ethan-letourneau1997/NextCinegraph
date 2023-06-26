import { Accordion, Divider, NavLink, Text } from '@mantine/core';

import { AiFillHome } from 'react-icons/ai';
import Link from 'next/link';
import { TbMovie } from 'react-icons/tb';
// import styles from '@/styles/Burger.module.css';

interface MobileNavigationProps {
  toggleMobileNav: any;
}

export function MobileNavigation({ toggleMobileNav }: MobileNavigationProps) {
  // const [, { toggle }] = useDisclosure(false);
  // styles

  return (
    <Accordion
      defaultValue="movies"
      h="100vh"
      styles={(theme) => ({
        control: {
          paddingTop: 10,
          paddingBottom: 10,
          color: theme.colors.dark[0],
          // styles added to all items controls
          paddingLeft: theme.spacing.sm,
          '&:hover': {
            backgroundColor: 'transparent',
          },

          // styles added to all items titles
          '&[data-active]': {
            color: theme.colors.yellow[5],

            // backgroundColor: "blue",
          },
        },
        label: {
          padding: '8px 0px',
        },

        item: {
          border: 0,
          fontWeight: 600,
        },
        content: {
          padding: 0,
        },
        icon: {
          marginRight: 10,
        },
        chevron: {
          transform: 'rotate(-90deg)',
          '&[data-rotate]': {
            transform: 'rotate(0deg)',
          },
          '&[data-active]': {
            color: theme.colors.yellow[5],

            // backgroundColor: "blue",
          },
        },
      })}
    >
      <Accordion.Item value="home">
        <Accordion.Control
          //   className={styles.unstyledControl}
          icon={<AiFillHome size={16} color="#C1C2C5" />}
          chevron={<></>}
        >
          <NavLink
            label="Home"
            component={Link}
            href="/"
            onClick={toggleMobileNav}
            p={0}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
                fontWeight: 600,
                color: theme.colors.dark[0],
              },
            })}
          />
        </Accordion.Control>
      </Accordion.Item>
      <Accordion.Item value="movies" pr="md">
        <Accordion.Control icon={<TbMovie size={16} />}>
          <Text fw={600}>Movies</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <NavLink
            component={Link}
            href="/movies/popular"
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb="xs"
            ml="xl"
            label="Popular "
          />
          <NavLink
            component={Link}
            href="/movies/top100"
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb="xs"
            ml="xl"
            label="Top 100 Movies"
          />
          <NavLink
            component={Link}
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb="xs"
            ml="xl"
            href="/movies/now_playing"
            label="Now Playing"
          />
          <NavLink
            component={Link}
            href="/movies/upcoming"
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb={8}
            ml="xl"
            label="Upcoming"
          />
          <NavLink
            component={Link}
            href="/movies/highestGrossing"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            onClick={toggleMobileNav}
            pt={0}
            pb="xs"
            ml="xl"
            label="Box Office"
          />
          <NavLink
            component={Link}
            href="/movies/popular"
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb={8}
            ml="xl"
            label="Browse Movies"
          />
          <Divider color="hsla(0, 0%, 30%, .5)" mb={8} mx="sm" />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="shows" pr="md">
        <Accordion.Control icon={<TbMovie size={16} />}>
          <Text fw={600}>TV Shows</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <NavLink
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            onClick={toggleMobileNav}
            pt={0}
            pb="xs"
            ml="xl"
            label="Popular "
          />
          <NavLink
            component={Link}
            href="/shows/top100"
            onClick={toggleMobileNav}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            pt={0}
            pb="xs"
            ml="xl"
            label="Top 100"
          />
          <NavLink
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            onClick={toggleMobileNav}
            pt={0}
            pb="xs"
            ml="xl"
            label="Browse Shows"
          />
          <Divider color="hsla(0, 0%, 30%, .5)" mb={8} mx="sm" />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
