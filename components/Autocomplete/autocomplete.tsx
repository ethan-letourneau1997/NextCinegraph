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
  useMantineTheme,
} from '@mantine/core';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BiSearch } from 'react-icons/bi';
import { fetchTrending } from '../../pages/api/mediaDetailsAPI';
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

interface AutocompleteProps {
  alt?: boolean;
}

const Autocomplete = ({ alt }: AutocompleteProps) => {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 768px)');

  //theme
  const theme = useMantineTheme();

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
    //responsive styles
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
        fullScreen={!desktop}
        radius="sm"
        opened={opened}
        onClose={handleClose}
        size={desktop ? 700 : ''}
        // scrollAreaComponent={ScrollArea.Autosize}
      >
        <Modal.Overlay blur={3} />
        <Modal.Content
          sx={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            border: 'none',
            backdropFilter: 'saturate(150%) blur(30px)',
          }}
        >
          <Modal.Header p={0} bg="transparent">
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
                styles={() => ({
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
                            <Box w={desktop ? 550 : 'fit-content'}>
                              <Text fw={600} color="gray.4" truncate>
                                {item.name}
                              </Text>

                              {item.media_type === 'person' && item.known_for && (
                                <Group spacing={0}>
                                  {item.known_for.slice(0, 2).map((knownItem, personIndex) => (
                                    <React.Fragment key={knownItem.id}>
                                      <Text truncate fz="sm" c="dimmed">
                                        {knownItem.title || knownItem.name}
                                      </Text>
                                      {item.known_for &&
                                        personIndex !== item.known_for.slice(0, 2).length - 1 && (
                                          <Text truncate fz="sm" c="dimmed">
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
                            <Box w={desktop ? 550 : 'fit-content'}>
                              <Text fw={600} color="gray.3" truncate>
                                {item.title || item.name}
                              </Text>
                              <Text truncate fz="sm" c="dark.1">
                                {item.release_date?.substring(0, 4) ||
                                  item.first_air_date?.substring(0, 4)}
                              </Text>
                              {item.media_type === 'movie' && item.credits && (
                                <Group spacing={0}>
                                  {item.credits
                                    .slice(0, 2)
                                    .map((credit: Cast, movieCreditsIndex: number) => (
                                      <React.Fragment key={credit.id}>
                                        <Text truncate fz="sm" c="dark.1">
                                          {credit.name}
                                        </Text>
                                        {item.credits &&
                                          movieCreditsIndex !==
                                            item.credits.slice(0, 2).length - 1 && (
                                            <Text truncate fz="sm" c="dark.1">
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
                                          <Text truncate fz="sm" c="dark.1">
                                            {credit.name}
                                          </Text>
                                          {item.credits &&
                                            tvCreditsIndex !==
                                              item.credits.slice(0, 2).length - 1 && (
                                              <Text truncate fz="sm" c="dark.1">
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
      {alt ? (
        <Button
          radius="sm"
          mb="xl"
          unstyled
          c="dark.2"
          fz="md"
          fw={400}
          size="md"
          onClick={open}
          rightIcon={
            <Box pt={4}>
              <BiSearch size={16} />
            </Box>
          }
          py="xs"
          px="lg"
          styles={{
            root: {
              borderRadius: 6,
              backgroundColor: 'rgba(0, 0, 0, .6)',
              border: 'none',
              backdropFilter: 'saturate(180%) blur(20px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .8)',
                cursor: 'pointer',
              },
            },
            inner: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 30,
            },

            rightIcon: {
              paddingLeft: 20,
            },
          }}
        >
          Search movies, shows, and more
        </Button>
      ) : (
        <Group position="center">
          <Button
            unstyled
            className={classes.hiddenMobile}
            bg="transparent"
            onClick={open}
            mt="lg"
            fz="md"
            mr="md"
            c="dark.0"
            p={0}
            sx={{
              border: 'none',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <FaSearch size={18} />
          </Button>

          <Button className={classes.hiddenDesktop} bg="transparent" onClick={open} fz="md" p={0}>
            <FaSearch />
          </Button>
        </Group>
      )}
    </div>
  );
};

export default Autocomplete;
