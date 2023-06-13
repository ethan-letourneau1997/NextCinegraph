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
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

import { formatReleaseDate } from '../../../../components/Discover/discoverGrid';
import { TitleLink } from '../../../../components/BiteSized/titleLink';
import { fetchPersonDetails } from '../../../api/mediaDetailsAPI';

export default function MediaItem() {
  // responsive styles
  // const desktop = useMediaQuery('(min-width: 75em)');
  // const tablet = useMediaQuery('(max-width: 62em)');
  // const smallTable = useMediaQuery('(max-width: 800px)');
  const mobile = useMediaQuery('(max-width: 36em)');

  const [value, setValue] = useState(null);

  const router = useRouter();
  const { personId } = router.query;

  const [mediaDetails, setMediaDetails] = useState();
  const [crewDepartments, setCrewDepartments] = useState();

  // type Department =
  //   | 'Editing'
  //   | 'Costume & Make-Up'
  //   | 'Lighting'
  //   | 'Production'
  //   | 'Directing'
  //   | 'Visual Effects'
  //   | 'Art'
  //   | 'Sound'
  //   | 'Camera'
  //   | 'Actors'
  //   | 'Writing';

  // Add an extra item for 'Acting'

  useEffect(() => {
    if (!personId) {
      return;
    }

    async function fetchDetails() {
      try {
        const id = personId;
        const details = await fetchPersonDetails(parseInt(id, 10));
        setMediaDetails(details);
        mediaDetails && setValue(mediaDetails.known_for_department);

        if (details.combined_credits) {
          const departments = details.combined_credits.crew.reduce((acc, credit) => {
            const { department } = credit;
            if (!acc[department]) {
              acc[department] = [];
            }
            acc[department].push(credit);
            acc[department].sort((a, b) => {
              const releaseDateA = a.release_date ?? a.first_air_date;
              const releaseDateB = b.release_date ?? b.first_air_date;
              if (!releaseDateA && !releaseDateB) return 0;
              if (!releaseDateA) return 1;
              if (!releaseDateB) return -1;
              const releaseYearA = parseInt(releaseDateA.slice(0, 4), 10);
              const releaseYearB = parseInt(releaseDateB.slice(0, 4), 10);
              return releaseYearB - releaseYearA;
            });
            return acc;
          }, {});

          setCrewDepartments(departments);
        } else {
          console.error('details.combined_credits is undefined');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [personId]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

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

  let known_for;
  if (mediaDetails.known_for_department === 'Acting') {
    known_for = mediaDetails.combined_credits?.cast;
    known_for && known_for.sort((a, b) => b.popularity - a.popularity);
  } else {
    mediaDetails.known_for_department &&
      (known_for = crewDepartments[mediaDetails.known_for_department]) &&
      known_for.sort((a, b) => b.popularity - a.popularity);
  }

  const paragraphs = mediaDetails.biography?.split('\n');

  const departmentNames = Object.keys(crewDepartments);
  const selectData = departmentNames.map((department) => ({
    value: department,
    label: department,
  }));

  if (
    mediaDetails.combined_credits &&
    mediaDetails.combined_credits.cast &&
    mediaDetails.combined_credits.cast.length > 0
  ) {
    selectData.push({ value: 'Acting', label: 'Acting' });
  }

  return (
    <Container py="xl" px="xl">
      <Grid mt="xl">
        <Grid.Col span={12} xs={3}>
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
                  {known_for &&
                    known_for.map((known_for_item) => (
                      <Box>
                        <Card shadow="md">
                          <Card.Section>
                            <AspectRatio ratio={2 / 3} w={120} mih={180}>
                              <Skeleton />
                              <Image
                                fill
                                alt=""
                                src={
                                  known_for_item.poster_path
                                    ? `https://image.tmdb.org/t/p/original${known_for_item.poster_path}`
                                    : '/media_placeholder_sm.png'
                                }
                              />
                            </AspectRatio>
                          </Card.Section>
                        </Card>
                        <Text c="dimmed" mt={7} maw={120} truncate fz="sm">
                          {known_for_item.title}
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
                  value={value}
                  onChange={setValue}
                  label="Your favorite framework/library"
                  placeholder="Pick one"
                  data={selectData}
                />
              </Box>
              <Flex>
                {value === 'Acting' && (
                  <Box>
                    <Title size="h2">Acting</Title>
                    {mediaDetails.combined_credits &&
                      mediaDetails.combined_credits.cast.map((credit) => (
                        <div key={credit.id}>
                          {credit.title}
                          {credit.name} - {credit.character} - {credit.release_date?.slice(0, 4)}
                        </div>
                      ))}
                  </Box>
                )}
                <Box>
                  {Object.entries(crewDepartments).map(([department, credits]) => (
                    <div key={department}>
                      {value === department && (
                        <>
                          <Title size="h3">{department}</Title>
                          {credits.map((credit) => (
                            <div key={credit.id}>
                              {credit.title}
                              {credit.name}- {credit.release_date?.slice(0, 4)}
                              {credit.first_air_date?.slice(0, 4)}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
