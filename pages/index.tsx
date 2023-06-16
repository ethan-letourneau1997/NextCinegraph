import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Text,
  Stack,
  Title,
  createStyles,
  Flex,
} from '@mantine/core';
import Image from 'next/image';
import { MediaItemType, Result } from '../Types/types';
import {
  fetchTrendingItems,
  fetchUpcomingMovies,
  fetchNowPlaying,
  fetchTopMovies,
  fetchTopTV,
} from './api/homeApi';
import { MediaSlider } from '../components/general/mediaSlider';

import Autocomplete from '../components/Autocomplete/autocomplete';

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
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');

  // styles
  const { classes } = useStyles();

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

  function getRandomNumber() {
    return Math.floor(Math.random() * 20);
  }

  const [randomNumber, setRandomNumber] = useState(getRandomNumber());

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(getRandomNumber());
    }, 10000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   setAnimationTrigger(animationTrigger + 1);
  // }, [randomNumber]);

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
      pos="absolute"
      top={0}
      w="100vw"
      sx={{
        zIndex: -10,
      }}
    >
      {trendingItems.length > 0 && (
        <>
          <AspectRatio ratio={16 / (tablet ? 9 : 6)}>
            <Box
              sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <AspectRatio
                ratio={16 / (tablet ? 9 : 6)}
                pos="absolute"
                w="100%"
                sx={{
                  zIndex: 100,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animation: 'kenBurnsEffect 40s infinite',
                  // filter: 'brightness(95%)',
                }}
              >
                <Image
                  alt=""
                  src={
                    trendingItems.length > 0 && trendingItems[randomNumber].backdrop_path
                      ? `https://image.tmdb.org/t/p/original${trendingItems[randomNumber].backdrop_path}`
                      : '/still_placeholder_lg.png'
                  }
                  fill
                />
              </AspectRatio>
              <Box
                h="30%"
                w="100%"
                pos="absolute"
                top={0}
                sx={{
                  zIndex: 1200,
                  backgroundImage: 'linear-gradient(to bottom, #101113, transparent)',
                }}
              />
              <Flex
                direction="column"
                h="100%"
                w="100%"
                bg="rgba(0, 0, 0, 0.4)"
                pt="25vh"
                align="stretch"
                justify="space-between"
                sx={{
                  zIndex: 1200,
                }}
              >
                <Center pr="15%">
                  <Stack className={classes.hiddenMobile}>
                    <Box>
                      <Title c="yellow.5" size={45}>
                        Cinegraph.
                      </Title>
                      <Title c="gray.0" size={45}>
                        Explore the Media You Love.
                      </Title>
                    </Box>

                    <Box w="50vw">
                      <Autocomplete alt />
                    </Box>
                  </Stack>
                </Center>
                <Flex justify="flex-end">
                  {trendingItems.length > 0 && trendingItems[randomNumber].backdrop_path && (
                    <Title mb="sm" size="h5" pos="relative" mr="xl">
                      {trendingItems[randomNumber].name || trendingItems[randomNumber].title}
                    </Title>
                  )}
                </Flex>
              </Flex>
            </Box>
          </AspectRatio>
          <Container fluid px="xl">
            <Box mt="xl">
              <Stack spacing="lg">
                <MediaSlider mediaCredits={nowPlaying} title="Now Playing" slice={20} width={150} />
                <MediaSlider
                  mediaCredits={upcomingMovies}
                  title="Coming Soon"
                  slice={20}
                  width={150}
                />
                <MediaSlider mediaCredits={trendingItems} title="Trending" slice={20} width={150} />
              </Stack>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
}
