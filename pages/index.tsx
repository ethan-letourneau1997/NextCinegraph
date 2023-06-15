import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  AspectRatio,
  BackgroundImage,
  Box,
  Center,
  Container,
  Stack,
  Title,
  createStyles,
} from '@mantine/core';
import { MediaItemType, Result } from '../Types/types';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { Welcome } from '../components/Welcome/Welcome';
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

  const [trendingItems, setTrendingItems] = useState<Result[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Result[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Result[]>([]);
  const [, setTopMovies] = useState<MediaItemType[]>([]);
  const [, setTopTV] = useState<MediaItemType[]>([]);

  // const randomMovieVaue = () => {
  //   const constant = Math.floor(Math.random() * 20) + 1;
  //   return constant;
  // };

  useEffect(() => {
    fetchTrendingItems().then((items) => {
      setTrendingItems(items);
      console.log(trendingItems[0]);
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
  return (
    <Box
      pos="absolute"
      top={0}
      w="100vw"
      sx={{
        zIndex: -10,
      }}
    >
      <AspectRatio ratio={16 / (tablet ? 9 : 6)}>
        <BackgroundImage
          src={
            trendingItems.length > 0 && trendingItems[0].backdrop_path
              ? `https://image.tmdb.org/t/p/original${trendingItems[3].backdrop_path}`
              : '/still_placeholder_lg.png'
          }
        >
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
          <Center h="100%" w="100%" bg="rgba(0, 0, 0, 0.4)">
            <Stack className={classes.hiddenMobile}>
              <Title pl="xs" c="gray.0">
                Explore the Media You Love
              </Title>
              <Box w="50vw">
                <Autocomplete
                  backgroundColor="#101113"
                  buttonOpacity={0.85}
                  buttonHeight={45}
                  buttonBorder="1px solid #25262b"
                  textContent="Search movies, tv shows, and stars"
                  textColor="#909296"
                />
              </Box>
            </Stack>
          </Center>
        </BackgroundImage>

        {/* {trendingItems.length > 0 && (
            <Image
              alt=""
              src={
                trendingItems[0].backdrop_path
                  ? `https://image.tmdb.org/t/p/original${trendingItems[3].backdrop_path}`
                  : '/still_placeholder_lg.png'
              }
              fill
            />
          )} */}
      </AspectRatio>
      <Container fluid px="xl">
        <Box mt="xl">
          <Stack spacing="lg">
            <MediaSlider mediaCredits={nowPlaying} title="Now Playing" slice={20} width={150} />
            <MediaSlider mediaCredits={upcomingMovies} title="Coming Soon" slice={20} width={150} />
            <MediaSlider mediaCredits={trendingItems} title="Trending" slice={20} width={150} />
          </Stack>
        </Box>
      </Container>

      {/* <Welcome /> */}
      {/* <ColorSchemeToggle /> */}
    </Box>
  );
}
