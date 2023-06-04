import { Button, Flex, Menu, NavLink, createStyles } from '@mantine/core';

import Link from 'next/link';

export default function DesktopNavigation() {
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
  // styles
  const { classes } = useStyles();
  return (
    <Flex gap={40} className={classes.hiddenMobile}>
      <NavLink
        p={0}
        fw={600}
        label="Home"
        component={Link}
        href="/"
        styles={(theme) => ({
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },

          label: {
            fontSize: theme.fontSizes.md,
            '&:hover': {
              color: 'white',
            },
          },
        })}
      />
      <Menu shadow="md" trigger="hover" zIndex={1500}>
        <Menu.Target>
          <Button
            p={0}
            fz="md"
            fw={600}
            styles={{
              root: {
                height: '100%',
                backgroundColor: 'transparent',
                border: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
              inner: {
                color: 'rgb(193, 194, 197)',
                fontWeight: 600,

                '&:hover': {
                  color: 'white',
                },
              },
            }}
          >
            Movies
          </Button>
        </Menu.Target>
        <Menu.Dropdown
          bg="hsl(300, 12%, 6%)"
          sx={{
            border: '1px solid hsla(300, 12%, 20%, .7)',
          }}
        >
          <NavLink
            component={Link}
            href="/movies/top100"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Top 100"
          />
          <NavLink
            component={Link}
            href="/movies/popular"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Popular "
          />

          <NavLink
            component={Link}
            href="/movies/now_playing"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Now Playing"
          />

          <NavLink
            component={Link}
            href="/movies/upcoming"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Upcoming"
          />
          <NavLink
            component={Link}
            href="/movies/highestGrossing"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Box Office"
          />

          <NavLink
            component={Link}
            href="/movies/popular"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Browse Movies"
          />
        </Menu.Dropdown>
      </Menu>
      <Menu shadow="md" trigger="hover" zIndex={1500}>
        <Menu.Target>
          <Button
            p={0}
            fz="md"
            fw={600}
            styles={{
              root: {
                height: '100%',
                border: 0,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
              inner: {
                color: 'rgb(193, 194, 197)',
                fontWeight: 600,

                '&:hover': {
                  color: 'white',
                },
              },
            }}
          >
            TV Shows
          </Button>
        </Menu.Target>
        <Menu.Dropdown
          bg="hsl(300, 12%, 6%)"
          sx={{
            border: '1px solid hsla(300, 12%, 20%, .7)',
          }}
        >
          <NavLink
            component={Link}
            href="/shows/top100"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Top 100"
          />
          <NavLink
            component={Link}
            href="/shows/popular"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Popular "
          />

          <NavLink
            component={Link}
            href="/shows/trending"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Trending "
          />

          <NavLink
            component={Link}
            href="/shows/popular"
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: 'white',
                },
              },
            })}
            label="Browse Shows"
          />
        </Menu.Dropdown>
      </Menu>
      <NavLink
        fw={600}
        label="People"
        sx={{
          whiteSpace: 'nowrap',
        }}
        component={Link}
        href="/people/people"
        styles={(theme) => ({
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },

          label: {
            fontSize: theme.fontSizes.md,
            '&:hover': {
              color: 'white',
            },
          },
        })}
      />
    </Flex>
  );
}
