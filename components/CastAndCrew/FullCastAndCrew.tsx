import {
  Accordion,
  Affix,
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  List,
  Menu,
  Stack,
  Table,
  Text,
  rem,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsChevronUp, BsPersonFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { Link as ScrollLink, Element } from 'react-scroll';

import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import { Credits, Crew, Department } from '../../Types/types';

interface FullCastAndCrewProps {
  mediaType: string;
}

export function FullCastAndCrew({ mediaType }: FullCastAndCrewProps) {
  // responsive styles

  const mobile = useMediaQuery('(max-width: 500px)');

  const router = useRouter();

  let mediaId: string | string[] | undefined;
  let mediaName: string | string[] | undefined;

  if (mediaType === 'movie') {
    mediaId = router.query.movieId;
    mediaName = router.query.movieName;
  } else if (mediaType === 'tv') {
    mediaId = router.query.showId;
    mediaName = router.query.showName;
  }

  const [, setDepartments] = useState<Department[]>([]);
  const [castAndCrew, setCastAndCrew] = useState<Credits>([]);

  console.log(mediaType);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits,aggregate_credits&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setCastAndCrew(mediaType === 'movie' ? response.credits : response.aggregate_credits)
      )
      .catch((err) => console.error(err));
  }, []);

  console.log(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits&language=en-US`
  );

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4',
      },
    };

    fetch('https://api.themoviedb.org/3/configuration/jobs', options)
      .then((response) => response.json())
      .then((response) => setDepartments(response))
      .catch((err) => console.error(err));
  }, []);

  // Check if castAndCrew or crew is undefined
  if (!castAndCrew || !castAndCrew.crew) {
    return null; // or render an error message or fallback component
  }

  // Initialize an empty object to store the result
  const departmentCrew: { [key: string]: Crew[] } = {};

  // Iterate over the crew members
  castAndCrew.crew.forEach((crewMember) => {
    const { department } = crewMember;

    // If the department doesn't exist in the result object, create an empty array for it
    if (!departmentCrew[department]) {
      departmentCrew[department] = [];
    }

    // Add the crew member to the corresponding department array
    departmentCrew[department].push(crewMember);
  });

  // Create an array of department objects with name and crew properties
  const departments = Object.entries(departmentCrew)
    .sort((a, b) => a[0].localeCompare(b[0])) // Sort departments alphabetically
    .map(([department, crew]) => ({
      department,
      crew,
    }));

  return (
    <Container fluid p={mobile ? 0 : ''}>
      <Affix position={{ bottom: rem(20), right: rem(40) }}>
        <Menu>
          <Menu.Target>
            <Button>Jump To</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              {' '}
              <ScrollLink activeClass="active" to="Cast" spy smooth offset={-70} duration={500}>
                <Text
                  fz="sm"
                  c="dark.0"
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  Cast
                </Text>
              </ScrollLink>
            </Menu.Item>
            {departments.map((department) => (
              <Menu.Item>
                <ScrollLink
                  key={department.department}
                  activeClass="active"
                  to={department.department}
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  <Text
                    fz="sm"
                    c="dark.0"
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {department.department}
                  </Text>
                </ScrollLink>
              </Menu.Item>
            ))}

            {/* Other items ... */}
          </Menu.Dropdown>
        </Menu>
      </Affix>

      <Container mt="xs" size="sm" px={0}>
        <Element name="Cast" className="element">
          <Flex gap={5} pl={mobile ? 8 : 0}>
            <Text size={mobile ? 28 : 30} fw={600}>
              {mediaName}
            </Text>

            <Text size={mobile ? 28 : 30} fw={300}>
              Credits
            </Text>
          </Flex>
          <Box>
            <Text mt="xs" mb={6} pl={mobile ? 8 : 0} size={mobile ? 24 : 28} id="Cast">
              {' '}
              Crew
            </Text>
            {castAndCrew.cast?.map((castMember, index) => (
              // <tr key={castMember.id}>
              <Accordion
                transitionDuration={200}
                defaultValue="customization"
                chevron={castMember.roles && castMember.roles.length > 1 ? <BsChevronUp /> : null}
                styles={(theme) => ({
                  control: {
                    '&:hover': {
                      backgroundColor: theme.colors.dark[6],
                      cursor:
                        castMember.roles && castMember.roles.length === 1 ? 'auto' : 'pointer',
                      // backgroundColor: '',
                    },
                  },
                })}
              >
                <Accordion.Item value={index.toString()}>
                  <Accordion.Control
                    p={mobile ? 8 : 0}
                    pr="sm"
                    bg={index % 2 === 0 ? 'dark.7' : 'dark.8'}
                  >
                    {mobile ? (
                      <Flex gap="md" align="center">
                        {castMember.profile_path ? (
                          <Image
                            height={90}
                            width={60}
                            alt=""
                            src={`https://image.tmdb.org/t/p/w92${castMember.profile_path}`}
                          />
                        ) : (
                          <Flex h={90} w={60} bg="dark.4" align="center">
                            <BsPersonFill size={60} color="#18181B" />
                          </Flex>
                        )}
                        <Flex direction="column">
                          <Anchor
                            component={Link}
                            href={`/people/${castMember.id}/${encodeURIComponent(
                              castMember.name || ''
                            )}`}
                            // underline={false}
                            sx={(theme) => ({
                              textDecorationColor: theme.colors.dark[0],
                              textDecorationThickness: 1,
                              '&:hover': {
                                textDecorationColor: theme.colors.accent[0],
                              },
                            })}
                          >
                            {' '}
                            <Text color="gray.4" fz="sm" fw={600} truncate>
                              {castMember.name}
                            </Text>
                          </Anchor>
                          <Text fz="sm" truncate>
                            {castMember.character || castMember.roles[0].character}
                          </Text>
                          {mediaType === 'tv' && (
                            <Text fz="sm">{castMember.total_episode_count}ep</Text>
                          )}
                        </Flex>
                      </Flex>
                    ) : (
                      <Grid>
                        <Grid.Col span={mediaType === 'tv' ? 4 : 6}>
                          <Flex align="center" gap="xs" fw={600}>
                            {castMember.profile_path ? (
                              <Image
                                height={52.5}
                                width={35}
                                alt=""
                                src={`https://image.tmdb.org/t/p/w92${castMember.profile_path}`}
                              />
                            ) : (
                              <Flex h={52.5} w={35} bg="dark.4" align="center">
                                <BsPersonFill size={40} color="#18181B" />
                              </Flex>
                            )}
                            <Anchor
                              component={Link}
                              href={`/people/${castMember.id}/${encodeURIComponent(
                                castMember.name || ''
                              )}`}
                              // underline={false}
                              sx={(theme) => ({
                                textDecorationColor: theme.colors.dark[0],
                                textDecorationThickness: 1,
                                '&:hover': {
                                  textDecorationColor: theme.colors.accent[0],
                                },
                              })}
                            >
                              {' '}
                              <Text color="gray.4" fz="sm" fw={600} truncate>
                                {castMember.name}
                              </Text>
                            </Anchor>
                          </Flex>
                        </Grid.Col>
                        <Grid.Col
                          span={6}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Flex w="90%">
                            <Text fz="sm" truncate>
                              {castMember.character || castMember.roles[0].character}
                            </Text>
                          </Flex>
                        </Grid.Col>
                        {mediaType === 'tv' && (
                          <Grid.Col
                            span={2}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Flex>
                              <Text fz="sm">{castMember.total_episode_count}ep</Text>
                            </Flex>
                          </Grid.Col>
                        )}
                      </Grid>
                    )}
                  </Accordion.Control>
                  {castMember.roles && castMember.roles.length > 1 && (
                    <Accordion.Panel bg={index % 2 === 0 ? 'dark.7' : 'dark.8'} py="xs">
                      <List spacing="xs" withPadding>
                        {castMember.roles.map((role) => (
                          <Box>
                            {role.character && castMember.total_episode_count ? (
                              <List.Item>
                                <Box>
                                  <Text component="span" fz="sm">
                                    {' '}
                                    {role.character}
                                  </Text>
                                  <Text component="span" fz="sm" c="dark.1">
                                    ...{castMember.total_episode_count}ep
                                  </Text>
                                </Box>
                              </List.Item>
                            ) : null}
                          </Box>
                        ))}
                      </List>
                    </Accordion.Panel>
                  )}
                </Accordion.Item>
              </Accordion>
            ))}
            <Table striped verticalSpacing="md">
              {/* <tbody> */}
              {/* </tbody> */}
            </Table>
          </Box>
        </Element>
        <Box>
          <Text mt="xl" mb={6} pl={mobile ? 8 : 0} size={mobile ? 24 : 28} id="Cast">
            Crew
          </Text>
          <Stack spacing={50}>
            {departments.map((department, index) => (
              <Element key={index} name={department.department} className="element">
                <Box>
                  <Flex pl={mobile ? 8 : 0} pr="sm" gap={3} align="center">
                    <Text size={mobile ? 'lg' : 'xl'} fw={800} id={department.department}>
                      {' '}
                      {department.department}
                    </Text>
                    <Text c="dark.1" fw={300} fz={mobile ? 'lg' : 'xl'}>
                      ({department.crew.length})
                    </Text>
                    <Divider
                      my="sm"
                      variant="dotted"
                      sx={{
                        flexGrow: 1,
                      }}
                    />
                  </Flex>
                  <Table withBorder mt="sm" striped>
                    <tbody>
                      {department.crew.map((crewMember) => (
                        <tr key={crewMember.id}>
                          <td width="40%">
                            <Anchor
                              component={Link}
                              href={`/people/${crewMember.id}/${encodeURIComponent(
                                crewMember.name || ''
                              )}`}
                              // underline={false}
                              sx={(theme) => ({
                                textDecorationColor: theme.colors.dark[0],
                                textDecorationThickness: 1,
                                '&:hover': {
                                  textDecorationColor: theme.colors.accent[0],
                                },
                              })}
                            >
                              {' '}
                              <Text color="gray.4" fw={600}>
                                {crewMember.name}
                              </Text>
                            </Anchor>
                          </td>
                          <td>
                            {mediaType === 'movie' ? (
                              <Text>{crewMember.job}</Text>
                            ) : (
                              <Box>
                                {crewMember.jobs.map((job) => (
                                  <Box>
                                    <Text component="span">{job.job}</Text>
                                    <Text component="span">...({job.episode_count}ep)</Text>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Element>
            ))}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}
