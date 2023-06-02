import { Accordion, Divider, NavLink, Text } from '@mantine/core';

import { AiFillHome } from 'react-icons/ai';
import Link from 'next/link';
import { RiNetflixFill } from 'react-icons/ri';
import { TbMovie } from 'react-icons/tb';
import { useDisclosure } from '@mantine/hooks';
// import styles from '@/styles/Burger.module.css';
import styles from '../../styles/Burger.module.css';

export function MobileNavigation() {
  const [, { toggle }] = useDisclosure(false);
  // styles

  return (
    <Accordion
      defaultValue="movies"
      h="100vh"
      styles={(theme) => ({
        control: {
          // styles added to all items controls
          paddingLeft: theme.spacing.sm,
          '&:hover': {
            backgroundColor: 'transparent',
          },
          // styles added to all items titles
          '&[data-active]': {
            color: theme.colors.accent[0],

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
            color: theme.colors.accent[0],

            // backgroundColor: "blue",
          },
        },
      })}
    >
      <Accordion.Item value="home">
        <Accordion.Control
          className={styles.unstyledControl}
          icon={<AiFillHome size={16} />}
          chevron={<></>}
        >
          <NavLink
            className={styles.link}
            label="Home"
            component={Link}
            href="/"
            onClick={toggle}
            styles={() => ({
              root: {
                padding: 0,
              },
            })}
          />
        </Accordion.Control>
      </Accordion.Item>
      <Accordion.Item value="movies">
        <Accordion.Control icon={<TbMovie size={16} />}>
          <Text fw={600}>Movies</Text>
        </Accordion.Control>
        <Accordion.Panel>
          {' '}
          <NavLink
            component={Link}
            href="/movies/top100"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            className={styles.subLink}
            label="Top 100 Movies"
          />
          <NavLink
            className={styles.subLink}
            component={Link}
            href="/movies/popular"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            label="Browse Movies"
          />
          <NavLink
            className={styles.subLink}
            component={Link}
            href="/movies/popular"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            label="Popular "
          />
          <NavLink
            className={styles.subLink}
            component={Link}
            href="/movies/trending"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            label="Trending "
          />
          <NavLink
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            className={styles.subLink}
            label="Top Box Office"
          />
          <Divider color="hsla(0, 0%, 30%, .5)" mb={8} mx="sm" />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="shows">
        <Accordion.Control icon={<TbMovie size={16} />}>
          <Text fw={700}>TV Shows</Text>
        </Accordion.Control>
        <Accordion.Panel>
          {' '}
          <NavLink
            className={styles.subLink}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            label="Popular TV Shows"
          />
          <NavLink
            className={styles.subLink}
            component={Link}
            href="/shows/trending"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            label="Trending"
          />
          <NavLink
            component={Link}
            href="/shows/top100"
            onClick={toggle}
            styles={(theme) => ({
              label: {
                fontSize: theme.fontSizes.md,
              },
            })}
            className={styles.subLink}
            label="Top 100"
          />
          <Divider color="hsla(0, 0%, 30%, .5)" mb={8} mx="sm" />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control icon={<RiNetflixFill size={16} />}>Where to Watch</Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
