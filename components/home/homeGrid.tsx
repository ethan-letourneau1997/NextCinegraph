import {
  Anchor,
  BackgroundImage,
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Title,
} from '@mantine/core';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchNowPlaying,
  fetchTopMovies,
  fetchTopTV,
  fetchTrendingItems,
  fetchUpcomingMovies,
} from '../../pages/api/homeApi';

import HomeCard from './homeCard';
import { MediaItemType } from '../../Types/types';

export default function HomeGrid() {
  const [trendingItems, setTrendingItems] = useState<MediaItemType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MediaItemType[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MediaItemType[]>([]);
  const [topMovies, setTopMovies] = useState<MediaItemType[]>([]);
  const [topTV, setTopTV] = useState<MediaItemType[]>([]);

  // const randomMovieVaue = () => {
  //   const constant = Math.floor(Math.random() * 20) + 1;
  //   return constant;
  // };

  function getRandomIndexWithBackdropPath(arr: MediaItemType[]): number {
    let randomIndex = Math.floor(Math.random() * arr.length);
    while (!arr[randomIndex].backdrop_path) {
      randomIndex = Math.floor(Math.random() * arr.length);
    }
    return randomIndex;
  }

  useEffect(() => {
    fetchTrendingItems().then((items) => {
      setTrendingItems(items);
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
    <Box>
      <Container fluid size="xl" px="xl">
        <Grid gutter="xl">
          <Grid.Col span={6} h={400}>
            <Grid gutter="xl">
              <Grid.Col span={6} h={225}>
                {' '}
                {nowPlaying && nowPlaying.length > 0 && (
                  <HomeCard
                    mediaItem={nowPlaying[getRandomIndexWithBackdropPath(nowPlaying)]}
                    title="Now Playing"
                  />
                )}
              </Grid.Col>
              <Grid.Col span={6} h={225}>
                {' '}
                {upcomingMovies && upcomingMovies.length > 0 && (
                  <HomeCard
                    mediaItem={upcomingMovies[getRandomIndexWithBackdropPath(upcomingMovies)]}
                    title="Coming Soon"
                  />
                )}
                ``
              </Grid.Col>
              <Grid.Col span={6} h={225}>
                {' '}
                {topMovies && topMovies.length > 0 && (
                  <Anchor href="/movies/top100" underline={false} component={Link}>
                    <HomeCard mediaItem={topMovies[0]} title="Top Movies" releaseDate />
                  </Anchor>
                )}
              </Grid.Col>
              <Grid.Col span={6} h={225}>
                {' '}
                {topTV && topTV.length > 0 && (
                  <Anchor href="/shows/top100" underline={false} component={Link}>
                    <HomeCard mediaItem={topTV[0]} title="Top TV" releaseDate />
                  </Anchor>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6} h={450}>
            {trendingItems && trendingItems.length > 0 && (
              <BackgroundImage
                radius="lg"
                h="100%"
                src={`https://image.tmdb.org/t/p/original${trendingItems[0].backdrop_path}`}
              >
                <Flex h="100%" bg="rgba(0,0,0,.6)" direction="column" justify="space-between">
                  <Box p="xs">
                    <Badge size="lg" c="accent.0">
                      #1 IN TRENDING
                    </Badge>
                  </Box>
                  <Box p="md" w="85%">
                    <Title size="h1" c="white">
                      {trendingItems[0].title}
                    </Title>
                    <Text>{trendingItems[0].overview}</Text>
                  </Box>
                </Flex>
              </BackgroundImage>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
