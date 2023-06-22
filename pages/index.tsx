import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Container, Text, Stack, Title, Overlay, Card, Button } from '@mantine/core';

import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { MediaItemType, Result } from '../Types/types';
import {
  fetchTrendingItems,
  fetchUpcomingMovies,
  fetchNowPlaying,
  fetchTopMovies,
  fetchTopTV,
} from './api/homeApi';
import { MediaSlider } from '../components/general/mediaSlider';

import { HomeCarousel } from '../components/home/homeCarousel';

export default function HomePage() {
  // styles

  const mobile = useMediaQuery('(max-width: 30em)');
  const tablet = useMediaQuery('(max-width: 64em)');
  const desktop = useMediaQuery('(min-width: 48em)');

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // content states
  const [trendingItems, setTrendingItems] = useState<Result[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Result[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Result[]>([]);
  const [, setTopMovies] = useState<MediaItemType[]>([]);
  const [, setTopTV] = useState<MediaItemType[]>([]);
  // scroll logic
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 30,
  });

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
      className={tablet ? 'homepage tablet-arrows' : 'homepage'}
      // pos="absolute"
      top={0}
      sx={{
        zIndex: -10,
      }}
    >
      {trendingItems.length > 0 && (
        <>
          {/* <AspectRatio ratio={3 / 2}>
            <iframe src="/bannerMovie.mp4" title="myframe" />
          </AspectRatio> */}
          <Container size="xl" mt={tablet ? 0 : 'xs'} px={tablet ? 0 : 'md'}>
            <Card>
              <Card.Section>
                <Box
                  className="youtube-container"
                  pos="relative"
                  sx={{
                    borderRadius: 4,
                  }}
                >
                  {desktop && <Overlay opacity={0.4} color="#141517" />}

                  <iframe
                    src="https://www.youtube.com/embed/AxnLyiz5oeE?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&hd=1&playlist=AxnLyiz5oeE"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  >
                    <Box h="100%" w={15} pos="relative">
                      <Box
                        h="100%"
                        w="100%"
                        pos="absolute"
                        sx={{
                          zIndex: 5000,
                        }}
                      />
                    </Box>
                  </iframe>
                </Box>
              </Card.Section>
            </Card>
            {desktop && (
              <Box
                pt={tablet ? '5vh' : '15vh'}
                pl={tablet ? '5vw' : '10vw'}
                mx="auto"
                top={100}
                pos="absolute"
                sx={{
                  zIndex: 1000,
                }}
              >
                <Title c="yellow.5" size={tablet ? 'h1' : 45}>
                  Cinegraph.
                </Title>
                <Title c="gray.0" size={tablet ? 'h1' : 45}>
                  Explore the Media You Love.
                </Title>

                <Button
                  ml={4}
                  variant="outline"
                  color="yellow.5"
                  px="xl"
                  mt="md"
                  size="md"
                  sx={() => ({
                    backgroundColor: 'rgba(0, 0, 0, .05)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                  })}
                  onClick={() =>
                    scrollIntoView({
                      alignment: 'start',
                    })
                  }
                  // variant="light"
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Container>
          {!desktop && (
            <Box mt={40} mb={60}>
              <Box px="lg">
                <Title c="yellow.5" size={mobile ? 'h2' : 'h1'}>
                  Cinegraph.
                </Title>
                <Title c="gray.0" size={mobile ? 'h2' : 'h1'}>
                  Explore the Media You Love.
                </Title>
              </Box>
            </Box>
          )}
          {desktop ? (
            <Container ref={targetRef} size="xl" sx={{ zIndex: 2000 }} pos="relative" mt={50}>
              <Stack spacing={50}>
                <HomeCarousel mediaItems={trendingItems} title="Trending Today" />
                <HomeCarousel mediaItems={nowPlaying} title="In Theaters" />
                <HomeCarousel mediaItems={upcomingMovies} title="Coming Soon" />
              </Stack>
            </Container>
          ) : (
            <Stack spacing="xl" px="xl">
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
          )}
        </>
      )}
    </Box>
  );
}
