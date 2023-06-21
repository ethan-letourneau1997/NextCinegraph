import { useState, useEffect } from 'react';

import {
  Box,
  Center,
  Container,
  Text,
  Stack,
  Title,
  createStyles,
  Flex,
  Overlay,
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType, Result } from '../Types/types';
import {
  fetchTrendingItems,
  fetchUpcomingMovies,
  fetchNowPlaying,
  fetchTopMovies,
  fetchTopTV,
} from './api/homeApi';
import { MediaSlider } from '../components/general/mediaSlider';

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

export default function HomePage() {
  // styles
  const { classes } = useStyles();
  const mobile = useMediaQuery('(max-width: 30em)');

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // content states
  const [trendingItems, setTrendingItems] = useState<Result[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Result[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Result[]>([]);
  const [, setTopMovies] = useState<MediaItemType[]>([]);
  const [, setTopTV] = useState<MediaItemType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetchTrendingItems().then((items) => {
      setTrendingItems(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchUpcomingMovies().then((items) => {
      setUpcomingMovies(items);
    });
  }, []);

  useEffect(() => {
    fetchNowPlaying().then((items) => {
      setNowPlaying(items);
    });
  }, []);

  useEffect(() => {
    fetchTopMovies().then((items) => {
      setTopMovies(items);
    });
  }, []);

  useEffect(() => {
    fetchTopTV().then((items) => {
      setTopTV(items);
    });
  }, []);

  if (isLoading) {
    return (
      <Container fluid>
        <Text pl="xl" mt="xl" fz="lg">
          Loading...
        </Text>
      </Container>
    ); // Render a loading indicator while the useEffect is running
  }

  return (
    <Box
      // pos="absolute"
      top={0}
      w="100vw"
      sx={{
        zIndex: -10,
      }}
    >
      {trendingItems.length > 0 && (
        <>
          <Box>
            <Box className="youtube-container" pos="relative">
              <Overlay opacity={0.2} color="black" className={classes.hiddenMobile} />
              <iframe
                src="https://www.youtube.com/embed/AxnLyiz5oeE?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&hd=1&playlist=AxnLyiz5oeE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Flex
              className={classes.hiddenMobile}
              top={100}
              pos="absolute"
              direction="column"
              h="100%"
              w="100%"
              // bg="rgba(0, 0, 0, 0.4)"
              pt="22vh"
              align="stretch"
              justify="space-between"
              sx={{
                zIndex: 1000,
              }}
            >
              <Center pr="15%">
                <Stack>
                  <Box>
                    <Title c="yellow.5" size={45}>
                      Cinegraph.
                    </Title>
                    <Title c="gray.0" size={45}>
                      Explore the Media You Love.
                    </Title>
                  </Box>
                </Stack>
              </Center>
            </Flex>
          </Box>
          <Box className={classes.hiddenDesktop} mt={40} mb={60}>
            <Box px="lg">
              <Title c="yellow.5" size={mobile ? 'h2' : 45}>
                Cinegraph.
              </Title>
              <Title c="gray.0" size={mobile ? 'h2' : 45}>
                Explore the Media You Love.
              </Title>
            </Box>
          </Box>

          <Container size="xl" sx={{ zIndex: 2000 }} pos="relative">
            <Box my={30}>
              <Stack spacing="xl">
                <MediaSlider
                  titlePadding={mobile ? 4 : 6}
                  mediaCredits={trendingItems}
                  title="Trending"
                  slice={8}
                  width={mobile ? 120 : 147}
                  color="gray.3"
                  size={mobile ? 'h4' : 'h3'}
                />

                <MediaSlider
                  titlePadding={mobile ? 4 : 6}
                  mediaCredits={nowPlaying}
                  title="Now Playing"
                  slice={8}
                  width={mobile ? 120 : 147}
                  color="gray.3"
                  size={mobile ? 'h4' : 'h3'}
                />
                <MediaSlider
                  titlePadding={mobile ? 4 : 6}
                  mediaCredits={upcomingMovies}
                  title="Coming Soon"
                  slice={8}
                  width={mobile ? 120 : 147}
                  color="gray.3"
                  size={mobile ? 'h4' : 'h3'}
                />
              </Stack>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
}
