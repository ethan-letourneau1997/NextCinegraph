import {
  Container,
  Center,
  Title,
  Flex,
  Box,
  Text,
  AspectRatio,
  Grid,
  Spoiler,
  Stack,
  Card,
  ScrollArea,
  Skeleton,
  Select,
  Divider,
  Anchor,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

import Link from 'next/link';
import { fetchPersonDetails } from '../../../api/mediaDetailsAPI';
import { formatReleaseDate } from '../../../../components/Discover/discoverGrid';
import { TitleLink } from '../../../../components/BiteSized/titleLink';
import { PersonType, KnownFor } from '../../../../Types/personTypes';

export default function MediaItem() {
  // responsive styles
  // const desktop = useMediaQuery('(min-width: 75em)');
  const tablet = useMediaQuery('(max-width: 62em)');
  // const smallTable = useMediaQuery('(max-width: 800px)');
  const mobile = useMediaQuery('(max-width: 36em)');

  const [value, setValue] = useState<string | null>(null);

  const router = useRouter();
  const { personId } = router.query;

  const [mediaDetails, setMediaDetails] = useState<PersonType | null>(null);

  useEffect(() => {
    mediaDetails && setValue(mediaDetails.known_for_department);
  }, [mediaDetails]);

  useEffect(() => {
    if (!personId) {
      return;
    }

    async function fetchDetails() {
      try {
        const id = personId as string;
        const details = await fetchPersonDetails(parseInt(id, 10));
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [personId]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

  // sort cast credits by release date
  if (mediaDetails.combined_credits && mediaDetails.combined_credits.cast) {
    mediaDetails.combined_credits.cast.sort((a, b) => {
      const releaseDateA = a.release_date ?? a.first_air_date;
      const releaseDateB = b.release_date ?? b.first_air_date;
      if (!releaseDateA && !releaseDateB) return 0;
      if (!releaseDateA) return 1;
      if (!releaseDateB) return -1;
      const releaseYearA = parseInt(releaseDateA.slice(0, 4), 10);
      const releaseYearB = parseInt(releaseDateB.slice(0, 4), 10);
      return releaseYearB - releaseYearA;
    });
  }

  // sort crew credits by release date
  if (mediaDetails.combined_credits && mediaDetails.combined_credits.crew) {
    mediaDetails.combined_credits.crew.sort((a, b) => {
      const releaseDateA = a.release_date ?? a.first_air_date;
      const releaseDateB = b.release_date ?? b.first_air_date;
      if (!releaseDateA && !releaseDateB) return 0;
      if (!releaseDateA) return 1;
      if (!releaseDateB) return -1;
      const releaseYearA = parseInt(releaseDateA.slice(0, 4), 10);
      const releaseYearB = parseInt(releaseDateB.slice(0, 4), 10);
      return releaseYearB - releaseYearA;
    });
  }

  const paragraphs = mediaDetails.biography?.split('\n');

  // Create a Set to store unique departments
  const uniqueDepartments = new Set();

  // Iterate over each object in the array
  mediaDetails.combined_credits?.crew.forEach((credit) => {
    // Add the department to the Set
    uniqueDepartments.add(credit.department);
  });

  // Convert the Set back to an array
  const departmentsArray = Array.from(uniqueDepartments);

  // Check if mediaDetails.combined_credits.cast contains one or more items
  if (mediaDetails.combined_credits && mediaDetails.combined_credits.cast.length > 0) {
    // Add 'Acting' department to the departmentsArray
    departmentsArray.push('Acting');
  }

  // Use the departmentsArray to replace crewDepartments
  const selectData: any = departmentsArray.map((department) => ({
    value: department,
    label: department,
  }));

  // Initialize the known_for array
  const known_for_credits: KnownFor[] = [];

  // Check if known_for is 'acting'
  if (mediaDetails && mediaDetails.known_for_department === 'Acting') {
    known_for_credits.push(...mediaDetails.combined_credits!.cast);
  } else {
    // Find matching objects in combined_credits.crew based on department
    const matchingCrew = mediaDetails.combined_credits!.crew.filter(
      (crewMember) => crewMember.department === mediaDetails.known_for_department
    );
    known_for_credits.push(...matchingCrew);
  }

  known_for_credits.sort((a, b) => b.popularity - a.popularity);

  console.log(mediaDetails.combined_credits);

  return (
    <Container py="xl" px="xl" pos="relative">
      <Grid mt="xl" gutter="xl">
        <Grid.Col span={12} xs={3}>
          <Box>
            <Center>
              <AspectRatio ratio={mobile ? 1 / 1 : 2 / 3} w={mobile ? 180 : 220}>
                <Card radius="md" shadow="md">
                  <Card.Section>
                    <Image
                      fill
                      src={
                        mediaDetails.profile_path
                          ? `https://image.tmdb.org/t/p/${
                              mobile ? 'w470_and_h470_face' : 'original'
                            }${mediaDetails.profile_path}`
                          : '/person_placeholder_md.png'
                      }
                      alt="alt text"
                    />
                  </Card.Section>
                </Card>
              </AspectRatio>
            </Center>

            <Stack fz="sm" mt="xl">
              <Title align="center" display={mobile ? '' : 'none'} size="h2">
                {mediaDetails.name}
              </Title>
              <Title size="h5">Personal Details</Title>
              <Box>
                <Text fw={600}>Known For</Text>
                <Text c="dark.0">{mediaDetails.known_for_department}</Text>
              </Box>
              <Box>
                <Text fw={600}>Born</Text>
                <Text c="dark.0">{formatReleaseDate(mediaDetails.birthday)}</Text>
              </Box>
              {mediaDetails.deathday && (
                <Box>
                  <Text fw={600}>Died</Text>
                  <Text c="dark.0">{formatReleaseDate(mediaDetails.deathday)}</Text>
                </Box>
              )}
              <Box>
                <Text fw={600}>Place of Birth</Text>
                <Text c="dark.0">{mediaDetails.place_of_birth}</Text>
              </Box>
            </Stack>
          </Box>
        </Grid.Col>

        <Grid.Col span={12} xs={9}>
          <Stack>
            <Title display={mobile ? 'none' : ''} size="h2">
              {mediaDetails.name}
            </Title>

            <Box mt="sm">
              <Title size="h5">Biography</Title>
              <Spoiler
                mt="xs"
                maw="90%"
                fz="sm"
                maxHeight={200}
                showLabel="Read more"
                hideLabel="Read Less"
              >
                {paragraphs?.map((paragraph, index) => (
                  <Text pb={14} key={index}>
                    {paragraph}
                  </Text>
                ))}
                <Text size="sm">{mediaDetails.biography}</Text>
              </Spoiler>
            </Box>
            <Box mt="xl">
              <TitleLink title="Known For" bottomSpace />
              <ScrollArea h={230}>
                <Flex gap="sm">
                  {known_for_credits &&
                    known_for_credits.slice(0, 10).map((known_for_item) => (
                      <Box>
                        <Card shadow="md">
                          <Card.Section>
                            {' '}
                            <Anchor
                              component={Link}
                              href={`/${
                                known_for_item.media_type === 'movie' ? 'movies' : 'shows'
                              }/${known_for_item.id}/${
                                known_for_item.media_type === 'movie'
                                  ? encodeURIComponent(known_for_item.title)
                                  : encodeURIComponent(known_for_item.name || '')
                              }`}
                              underline={false}
                            >
                              <AspectRatio ratio={2 / 3} w={120} mih={180}>
                                <Skeleton />
                                <Image
                                  fill
                                  alt=""
                                  src={
                                    known_for_item.poster_path
                                      ? `https://image.tmdb.org/t/p/w500${known_for_item.poster_path}`
                                      : '/media_placeholder_sm.png'
                                  }
                                />
                              </AspectRatio>
                            </Anchor>
                          </Card.Section>
                        </Card>
                        <Text c="dimmed" mt={7} maw={120} truncate fz="sm">
                          {known_for_item.title || known_for_item.name}
                        </Text>
                      </Box>
                    ))}
                </Flex>
              </ScrollArea>
            </Box>
            <Box mt="xl">
              <TitleLink title="Credits" bottomSpace />
              <Box>
                <Select
                  styles={(theme) => ({
                    item: {
                      fontWeight: 600,
                      // applies styles to selected item
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark'
                              ? theme.colors.yellow[5]
                              : theme.colors.teal[1],
                          color:
                            theme.colorScheme === 'dark'
                              ? theme.colors.dark[9]
                              : theme.colors.teal[9],
                        },
                      },

                      // applies styles to hovered item (with mouse or keyboard)
                      '&[data-hovered]': {},
                    },
                  })}
                  c="yellow.5"
                  value={value}
                  onChange={setValue}
                  label=""
                  placeholder="Pick one"
                  data={selectData}
                />
              </Box>
              <Title mt="md" size="h4">
                {value}
              </Title>
              <Box mih="30vh">
                {value === 'Acting' ? (
                  <Stack spacing={0}>
                    {mediaDetails.combined_credits &&
                      mediaDetails.combined_credits.cast.map((credit) => (
                        <>
                          <Divider my={10} />
                          <Flex gap="sm">
                            <Anchor
                              component={Link}
                              href={`/${credit.media_type === 'movie' ? 'movies' : 'shows'}/${
                                credit.id
                              }/${
                                credit.media_type === 'movie'
                                  ? encodeURIComponent(credit.title)
                                  : encodeURIComponent(credit.name || '')
                              }`}
                              underline={false}
                            >
                              <AspectRatio ratio={2 / 3} w={50}>
                                <Skeleton />
                                <Image
                                  fill
                                  alt=""
                                  src={
                                    credit.poster_path
                                      ? `https://image.tmdb.org/t/p/w342${credit.poster_path}`
                                      : '/media_placeholder_sm.png'
                                  }
                                />
                              </AspectRatio>
                            </Anchor>
                            <Box maw="75%">
                              <Anchor
                                fw={600}
                                fz="sm"
                                c="gray.1"
                                truncate
                                component={Link}
                                href={`/${credit.media_type === 'movie' ? 'movies' : 'shows'}/${
                                  credit.id
                                }/${
                                  credit.media_type === 'movie'
                                    ? encodeURIComponent(credit.title)
                                    : encodeURIComponent(credit.name || '')
                                }`}
                                underline={false}
                              >
                                {' '}
                                <Text truncate>{credit.title || credit.name}</Text>
                              </Anchor>
                              <Text truncate fz={tablet ? 'sm' : 'md'}>
                                {credit.character}
                              </Text>
                              <Text fz={tablet ? 'sm' : 'md'} c="dimmed">
                                {credit.release_date?.slice(0, 4) ||
                                  credit.first_air_date?.slice(0, 4)}
                              </Text>
                            </Box>
                          </Flex>
                        </>
                      ))}
                  </Stack>
                ) : (
                  <Stack spacing={0}>
                    {/* Map and render the filtered crew members */}
                    {mediaDetails?.combined_credits?.crew.map((credit) =>
                      credit.department === value ? (
                        <>
                          <Divider my={10} />
                          <Flex gap="sm">
                            <Anchor
                              component={Link}
                              href={`/${credit.media_type === 'movie' ? 'movies' : 'shows'}/${
                                credit.id
                              }/${
                                credit.media_type === 'movie'
                                  ? encodeURIComponent(credit.title)
                                  : encodeURIComponent(credit.name || '')
                              }`}
                              underline={false}
                            >
                              <AspectRatio ratio={2 / 3} w={50}>
                                <Skeleton />
                                <Image
                                  fill
                                  alt=""
                                  src={
                                    credit.poster_path
                                      ? `https://image.tmdb.org/t/p/w342${credit.poster_path}`
                                      : '/media_placeholder_sm.png'
                                  }
                                />
                              </AspectRatio>
                            </Anchor>
                            <Box maw="75%">
                              <Anchor
                                fw={600}
                                fz="sm"
                                c="gray.1"
                                truncate
                                component={Link}
                                href={`/${credit.media_type === 'movie' ? 'movies' : 'shows'}/${
                                  credit.id
                                }/${
                                  credit.media_type === 'movie'
                                    ? encodeURIComponent(credit.title)
                                    : encodeURIComponent(credit.name || '')
                                }`}
                                underline={false}
                              >
                                <Text truncate>{credit.title || credit.name}</Text>
                              </Anchor>

                              <Text fz="sm">{credit.job}</Text>
                              <Text fz="sm" c="dimmed">
                                {credit.release_date?.slice(0, 4) ||
                                  credit.first_air_date?.slice(0, 4)}
                              </Text>
                            </Box>
                          </Flex>
                        </>
                      ) : null
                    )}
                  </Stack>
                )}
              </Box>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
