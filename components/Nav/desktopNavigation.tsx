import { Flex, Menu, NavLink, UnstyledButton, createStyles, useMantineTheme } from '@mantine/core';

import Link from 'next/link';

export default function DesktopNavigation() {
  //theme
  const theme = useMantineTheme();

  // styles
  const useStyles = createStyles(() => ({
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
        styles={() => ({
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
      <Menu shadow="md" trigger="hover" offset={-5} zIndex={5500}>
        <Menu.Target>
          <UnstyledButton
            p={0}
            fz="md"
            fw={600}
            sx={{
              '&:hover': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          >
            Movies
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown
          sx={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            border: 'none',
            backdropFilter: 'saturate(180%) blur(20px)',
          }}
        >
          <NavLink
            fw={550}
            component={Link}
            href="/movies/top100"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Top 100"
          />
          <NavLink
            fw={550}
            component={Link}
            href="/movies/popular"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Popular "
          />

          <NavLink
            fw={550}
            component={Link}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            href="/movies/now_playing"
            label="Now Playing"
          />

          <NavLink
            fw={550}
            component={Link}
            href="/movies/upcoming"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Upcoming"
          />
          <NavLink
            fw={550}
            component={Link}
            href="/movies/highestGrossing"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Box Office"
          />

          <NavLink
            fw={550}
            component={Link}
            href="/movies/popular"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Browse Movies"
          />
        </Menu.Dropdown>
      </Menu>
      <Menu shadow="md" trigger="hover" zIndex={5500} offset={-5}>
        <Menu.Target>
          <UnstyledButton
            p={0}
            fz="md"
            fw={600}
            sx={{
              '&:hover': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          >
            TV&nbsp;Shows
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown
          sx={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            border: 'none',
            backdropFilter: 'saturate(180%) blur(20px)',
          }}
        >
          <NavLink
            component={Link}
            href="/shows/top100"
            fw={550}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Top 100"
          />
          <NavLink
            fw={550}
            component={Link}
            href="/shows/popular"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
                },
              },
            })}
            label="Popular "
          />

          <NavLink
            fw={550}
            component={Link}
            href="/shows/popular"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .3)',
                cursor: 'pointer',
                color: theme.colors.gray[2],
              },
            }}
            styles={() => ({
              label: {
                fontSize: theme.fontSizes.sm,
                '&:hover': {
                  color: theme.colors.gray[2],
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
        styles={() => ({
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
