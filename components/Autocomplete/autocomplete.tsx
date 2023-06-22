import {
  Anchor,
  AspectRatio,
  Box,
  Center,
  Flex,
  Group,
  ScrollArea,
  Skeleton,
  Text,
  TextInput,
  useMantineTheme,
  Image,
} from '@mantine/core';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { HiTrendingUp } from 'react-icons/hi';

import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';
import { useMediaQuery } from '@mantine/hooks';
import { fetchTrending } from '../../pages/api/mediaDetailsAPI';
import { Cast, MediaItemType } from '../../Types/types';

interface AutocompleteProps {
  closeNav?: any;
  navHeight: number;
}

const Autocomplete = ({ closeNav, navHeight }: AutocompleteProps) => {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 768px)');
  const mobile = useMediaQuery('(max-width: 48em)');

  //theme
  const theme = useMantineTheme();

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

      setResults(resultsWithCredits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // toggle focus trap when modal is opened
  const height = window.innerHeight;

  return (
    <Box maw="100vw">
      <Flex justify="center" pos="absolute" left={0}>
        <Box sx={{ zIndex: 3000 }} bg="dark.9" w="100vw">
          <TextInput
            px="md"
            pb={mobile ? 4 : 'xs'}
            pt={mobile ? 0 : 'md'}
            data-autofocus
            icon={<TbSearch />}
            fw={800}
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
          {isEmpty ? (
            <Box px="xl">
              <Center inline c="gray.3">
                <HiTrendingUp size={23} />
                <Text pl={7} size="lg" fw={600}>
                  Trending
                </Text>
              </Center>
            </Box>
          ) : (
            <>
              <Box px="xl">
                <Center inline c="gray.3">
                  <HiTrendingUp size={23} />
                  <Text pl={7} size="lg" fw={600}>
                    Results
                  </Text>
                </Center>
              </Box>
              {results.length === 0 && (
                <Text c="dimmed" mb="xs" px="xl">
                  No results to display
                </Text>
              )}
            </>
          )}
          <ScrollArea
            h={height - navHeight - (isEmpty ? 34 : 0)}
            sx={{ zIndex: 5000 }}
            pos="relative"
            pb="xl"
          >
            {results.slice(0, 10).map(
              (item, index) =>
                (item.poster_path || item.profile_path) && (
                  <Box
                    pos="relative"
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
                        onClick={closeNav}
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
                            sx={{
                              borderRadius: '4px',
                            }}
                          >
                            <Skeleton />
                            <Image
                              style={{
                                borderRadius: '4px',
                              }}
                              alt="poster"
                              src={`https://image.tmdb.org/t/p/w92${
                                item.media_type === 'person' ? item.profile_path : item.poster_path
                              }`}
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
                                    <Text truncate c="dimmed">
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
                        onClick={closeNav}
                        underline={false}
                      >
                        <Flex
                          maw="100vw"
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
                            sx={{
                              borderRadius: '4px',
                            }}
                          >
                            <Skeleton />
                            <Image
                              style={{
                                borderRadius: '4px',
                              }}
                              alt="poster"
                              src={`https://image.tmdb.org/t/p/w92${
                                item.media_type === 'person' ? item.profile_path : item.poster_path
                              }`}
                            />
                          </AspectRatio>
                          <Box pos="relative">
                            <Text maw="70vw" fw={600} fz="md" color="gray.3" truncate>
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
            {!isEmpty && (
              <Box
                pos="sticky"
                top={0}
                px="xl"
                mt="md"
                bg="dark.7"
                sx={{
                  zIndex: 1000,
                }}
              >
                <Center inline c="gray.3">
                  <HiTrendingUp size={23} />
                  <Text pl={7} size="lg" fw={600}>
                    Trending
                  </Text>
                </Center>
              </Box>
            )}
            {!isEmpty &&
              trending.slice(0, 10).map(
                (item, index) =>
                  (item.poster_path || item.profile_path) && (
                    <Box
                      pos="relative"
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
                          onClick={closeNav}
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
                              sx={{
                                borderRadius: '4px',
                              }}
                            >
                              <Skeleton />
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
                                      <Text truncate c="dimmed">
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
                          onClick={closeNav}
                          underline={false}
                        >
                          <Flex
                            maw="100vw"
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
                              sx={{
                                borderRadius: '4px',
                              }}
                            >
                              <Skeleton />
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
                              />
                            </AspectRatio>
                            <Box pos="relative">
                              <Text maw="70vw" fw={600} fz="md" color="gray.3" truncate>
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
            {/* </Box> */}
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
};

export default Autocomplete;
