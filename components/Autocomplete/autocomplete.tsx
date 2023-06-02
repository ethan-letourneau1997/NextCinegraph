import {
  Anchor,
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';
import { useDisclosure } from '@mantine/hooks';
import { fetchTrending } from '../../pages/api/mediaItemAPI';
import { Cast, MediaItemType } from '../../Types/types';

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

const Autocomplete = () => {
  // styles
  const { classes } = useStyles();

  // set state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItemType[]>([]);

  const [trending, setTrending] = useState<MediaItemType[]>([]);

  // state to see if input is empty
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const trendingData = await fetchTrending('all');

        const trendingWithCredits = await Promise.all(
          trendingData.map(async (item: MediaItemType) => {
            if (item.media_type === 'movie' || item.media_type === 'tv') {
              const creditsResponse = await fetch(
                `https://api.themoviedb.org/3/${item.media_type}/${item.id}/credits?api_key=0fd7a8764e6522629a3b7e78c452c348&include_video=false`
              );
              const creditsData = await creditsResponse.json();
              const credits = creditsData.cast || [];

              return { ...item, credits };
            }
            return item;
          })
        );

        setTrending(trendingWithCredits);
        setResults(trendingWithCredits);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingData();
  }, []);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value === '') {
      setResults(trending);
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0fd7a8764e6522629a3b7e78c452c348&query=${value}`
      );
      const data = await response.json();
      const searchResults = data.results || [];

      // Fetch credits for each item
      const resultsWithCredits = await Promise.all(
        searchResults.map(async (item: MediaItemType) => {
          if (item.media_type === 'movie' || item.media_type === 'tv') {
            const creditsResponse = await fetch(
              `https://api.themoviedb.org/3/${item.media_type}/${item.id}/credits?api_key=0fd7a8764e6522629a3b7e78c452c348&include_video=false`
            );
            const creditsData = await creditsResponse.json();
            const credits = creditsData.cast || [];
            return { ...item, credits };
          }
          return item;
        })
      );

      // Filter out items with empty credits
      const filteredResults = resultsWithCredits.filter((item: MediaItemType) => {
        if (item.media_type === 'person') {
          return true;
        }
        return item.credits?.length ?? 0;
      });

      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // modal toggle
  const [opened, { open, close }] = useDisclosure(false);

  // handle reset on close
  const handleClose = () => {
    setQuery('');
    setResults(trending);
    close();
    setIsEmpty(true);
  };

  // toggle focus trap when modal is opened

  return (
    <div>
      <Modal.Root
        radius="sm"
        opened={opened}
        onClose={handleClose}
        size={700}
        // scrollAreaComponent={ScrollArea.Autosize}
      >
        <Modal.Overlay blur={3} />
        <Modal.Content>
          <Modal.Header p={0}>
            <Modal.Title w="100%" pt={10}>
              <TextInput
                px="md"
                pb={4}
                data-autofocus
                icon={<TbSearch />}
                placeholder="Search Movies, TV Shows, and People"
                onChange={handleInputChange}
                value={query}
                bg="transparent"
                styles={(theme) => ({
                  input: {
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    fontSize: theme.fontSizes.lg,
                  },
                  icon: {
                    fontSize: theme.fontSizes.lg,
                  },
                })}
              />
              <Divider mx={16} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body mt="sm" p={0}>
            {isEmpty ? (
              <Box px="xl">
                <Center inline c="gray.3">
                  <HiTrendingUp size={23} />
                  <Text pl={7} size="lg" fw={600}>
                    Trending
                  </Text>
                </Center>
              </Box>
            ) : null}

            <ScrollArea h={600}>
              {results.map(
                (item, index) =>
                  (item.poster_path || item.profile_path) && (
                    <Box
                      key={item.id}
                      px="xl"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'hsl(225, 7%, 15%)',
                        },
                      }}
                    >
                      {item.media_type === 'person' ? (
                        <Anchor
                          component={Link}
                          href={`/people/${item.id}/${encodeURIComponent(item.name || '')}`}
                          underline={false}
                          onClick={handleClose}
                        >
                          <Flex
                            py="xs"
                            gap="md"
                            sx={
                              index === 0
                                ? {}
                                : {
                                    borderTop: '1px solid hsla(0, 0%, 40%, .4)',
                                  }
                            }
                          >
                            <AspectRatio
                              ratio={2 / 3}
                              w={48}
                              bg="brand.8"
                              sx={{
                                borderRadius: '4px',
                              }}
                            >
                              <Image
                                style={{
                                  borderRadius: '4px',
                                }}
                                alt="poster"
                                src={`https://image.tmdb.org/t/p/w92${
                                  item.media_type === 'person'
                                    ? item.profile_path
                                    : item.poster_path
                                }`}
                                fill
                              />
                            </AspectRatio>
                            <Box w={550}>
                              <Text fw={600} color="brand.0" truncate>
                                {item.name}
                              </Text>

                              {item.media_type === 'person' && item.known_for && (
                                <Group spacing={0}>
                                  {item.known_for.slice(0, 2).map((knownItem, personIndex) => (
                                    <React.Fragment key={knownItem.id}>
                                      <Text fz="sm" c="dimmed">
                                        {knownItem.title || knownItem.name}
                                      </Text>
                                      {item.known_for &&
                                        personIndex !== item.known_for.slice(0, 2).length - 1 && (
                                          <Text fz="sm" c="dimmed">
                                            ,&nbsp;
                                          </Text>
                                        )}
                                    </React.Fragment>
                                  ))}
                                </Group>
                              )}
                            </Box>
                          </Flex>
                        </Anchor>
                      ) : (
                        <Anchor
                          component={Link}
                          href={`/${item.media_type === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                            item.title
                              ? encodeURIComponent(item.title)
                              : encodeURIComponent(item.name || '')
                          }`}
                          onClick={handleClose}
                          underline={false}
                        >
                          <Flex
                            py="sm"
                            gap="md"
                            sx={
                              index === 0
                                ? {}
                                : {
                                    borderTop: '1px solid hsla(0, 0%, 40%, .4)',
                                  }
                            }
                          >
                            <AspectRatio
                              ratio={2 / 3}
                              w={48}
                              bg="brand.8"
                              sx={{
                                borderRadius: '4px',
                              }}
                            >
                              <Image
                                style={{
                                  borderRadius: '4px',
                                }}
                                alt="poster"
                                src={`https://image.tmdb.org/t/p/w92${
                                  item.media_type === 'person'
                                    ? item.profile_path
                                    : item.poster_path
                                }`}
                                fill
                              />
                            </AspectRatio>
                            <Box w={550}>
                              <Text fw={600} color="brand.0" truncate>
                                {item.title || item.name}
                              </Text>
                              <Text fz="sm" c="dimmed">
                                {item.release_date?.substring(0, 4) ||
                                  item.first_air_date?.substring(0, 4)}
                              </Text>
                              {item.media_type === 'movie' && item.credits && (
                                <Group spacing={0}>
                                  {item.credits
                                    .slice(0, 2)
                                    .map((credit: Cast, movieCreditsIndex: number) => (
                                      <React.Fragment key={credit.id}>
                                        <Text fz="sm" c="dimmed">
                                          {credit.name}
                                        </Text>
                                        {item.credits &&
                                          movieCreditsIndex !==
                                            item.credits.slice(0, 2).length - 1 && (
                                            <Text fz="sm" c="dimmed">
                                              ,&nbsp;
                                            </Text>
                                          )}
                                      </React.Fragment>
                                    ))}
                                </Group>
                              )}
                              {item.media_type === 'tv' && item.credits && (
                                <Group spacing={0}>
                                  {item.credits &&
                                    item.credits
                                      .slice(0, 2)
                                      .map((credit: Cast, tvCreditsIndex: number) => (
                                        <React.Fragment key={credit.id}>
                                          <Text fz="sm" c="dimmed">
                                            {credit.name}
                                          </Text>
                                          {item.credits &&
                                            tvCreditsIndex !==
                                              item.credits.slice(0, 2).length - 1 && (
                                              <Text fz="sm" c="dimmed">
                                                ,&nbsp;
                                              </Text>
                                            )}
                                        </React.Fragment>
                                      ))}
                                </Group>
                              )}
                            </Box>
                          </Flex>
                        </Anchor>
                      )}
                      {/* {index !== results.length - 1 && <Divider my="xs" />} */}
                    </Box>
                  )
              )}
            </ScrollArea>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Group position="center">
        <Button
          className={classes.hiddenMobile}
          radius="md"
          fw={400}
          bg="dark.5"
          pr={100}
          onClick={open}
          mr="xl"
        >
          Search
        </Button>
        <Button className={classes.hiddenDesktop} bg="transparent" onClick={open} fz="md" p={0}>
          <FaSearch />
        </Button>
      </Group>
    </div>
  );
};

export default Autocomplete;
