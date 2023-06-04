import {
  Accordion,
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Paper,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsChevronUp, BsPersonFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import { Credits, Crew, Department } from '../../Types/types';

interface FullCastAndCrewProps {
  mediaType: string;
}

export function FullCastAndCrew({ mediaType }: FullCastAndCrewProps) {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');

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
    <Container fluid>
      <Grid>
        <Grid.Col span={4} lg={2}>
          <Paper
            display={tablet ? 'none' : 'block'}
            p="md"
            shadow="md"
            sx={{
              position: 'sticky',
              top: 100,
            }}
          >
            <Stack spacing="xs">
              <Text fz="xl" fw={600}>
                Jump To
              </Text>
              <Divider />
              <Anchor pl="xs" c="dark.0" href="#Cast">
                Cast
              </Anchor>
              <Anchor fz="sm" pl="xs" c="dark.0" href="#CrewHeader">
                Crew
              </Anchor>
              {departments.map((department) => (
                <Anchor fz="sm" pl="xs" c="dark.0" href={`#${department.department}`}>
                  {department.department}
                </Anchor>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={tablet ? 12 : 8}>
          <Container size="sm" px={0}>
            <h1>{mediaName}</h1>
            <Box>
              <h1 id="Cast"> Cast</h1>
              {castAndCrew.cast?.map((castMember, index) => (
                // <tr key={castMember.id}>
                <Accordion
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
                    <Accordion.Control p={0} pr="sm" bg={index % 2 === 0 ? 'dark.7' : 'dark.8'}>
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
                              <Flex h={60} w={40} bg="dark.4" align="center">
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
                              <Text color="gray.4" fw={400} truncate>
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
                    </Accordion.Control>
                    {castMember.roles && castMember.roles.length > 1 && (
                      <Accordion.Panel bg={index % 2 === 0 ? 'dark.7' : 'dark.8'} py="xs">
                        {castMember.roles.map((role) => (
                          <Box pl={50}>
                            <Grid>
                              <Grid.Col span={10}>
                                <li>
                                  <Flex align="center">
                                    <Text fz="sm" c="dark.2">
                                      {role.character}...
                                    </Text>
                                    <Text fz="sm">{role.episode_count}ep</Text>
                                  </Flex>
                                </li>
                              </Grid.Col>
                              <Grid.Col span="content">
                                {/* <Text fz="sm">{role.episode_count}ep</Text> */}
                              </Grid.Col>
                            </Grid>
                            {/* {index < castMember.roles.length - 1 && <Divider my="xs" />} */}
                          </Box>
                        ))}
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
            <Box>
              <h1 id="CrewHeader"> Crew</h1>
              <Stack spacing={50}>
                {departments.map((department, index) => (
                  <Box key={index}>
                    <Flex pr="sm" gap={3} align="center">
                      <Text size="xl" fw={800} id={department.department}>
                        {' '}
                        {department.department}
                      </Text>
                      <Text c="dark.1" fw={300} fz="xl">
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
                    <Table mt="sm" striped>
                      <tbody>
                        {department.crew.map((crewMember) => (
                          <tr key={crewMember.id}>
                            <td>{crewMember.name}</td>
                            <td>{crewMember.job}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
