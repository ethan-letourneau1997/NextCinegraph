import {
  Accordion,
  Affix,
  Anchor,
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  List,
  Menu,
  Space,
  Stack,
  Table,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsChevronUp, BsPersonFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { Link as ScrollLink, Element } from 'react-scroll';

import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import { FaChevronLeft } from 'react-icons/fa';
import { Credits, Crew, Department, EpisodeDetails, GuestStar } from '../../Types/types';

export function EpisodeCredits() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 500px)');

  //* Get query params
  const router = useRouter();
  const { showId, showName, seasonNumber, episodeNumber } = router.query;
  const episodeNumberString = episodeNumber as string | undefined; // Cast episodeNumber to string or undefined
  const episodeNumberValue = episodeNumberString ? parseInt(episodeNumberString, 10) : undefined; // Convert to a number if defined

  const [, setDepartments] = useState<Department[]>([]);
  const [castAndCrew, setCastAndCrew] = useState<Credits>();
  const [media, setMedia] = useState<EpisodeDetails>();
  const [guestStars, setGuestStars] = useState<GuestStar[]>([]);

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
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCastAndCrew(response.credits);
        setMedia(response);
        setGuestStars(response.guest_stars);
        console.log(response.guest_stars);
      })
      .catch((err) => console.error(err));
  }, []);

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
    <Container fluid p={mobile ? 0 : ''} pb={50}>
      <Affix position={{ bottom: rem(20), right: rem(50) }}>
        <Menu>
          <Menu.Target>
            <Button variant="outline" color="yellow.5">
              Jump To
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item p={0}>
              <ScrollLink
                key="Cast"
                activeClass="active"
                to="Cast"
                spy
                smooth
                offset={-70}
                duration={500}
              >
                <Text
                  py={10}
                  px={12}
                  display="flex"
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
              <ScrollLink
                key="guestStars"
                activeClass="active"
                to="guestStars"
                spy
                smooth
                offset={-70}
                duration={500}
              >
                <Text
                  py={10}
                  px={12}
                  display="flex"
                  fz="sm"
                  c="dark.0"
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  Guest Stars
                </Text>
              </ScrollLink>
            </Menu.Item>

            {departments.map((department) => (
              <Menu.Item p={0}>
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
                    py={10}
                    px={12}
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
      <Flex
        sx={{
          position: tablet ? 'static' : 'absolute',
        }}
        bg={tablet ? 'dark.8' : 'transparent'}
        // bg="dark.7"
        p="xs"
        pl={mobile ? 'sm' : 'md'}
        pt={tablet ? 'xs' : 0}
      >
        <Anchor
          fw={500}
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            color: theme.colors.gray[5],
          })}
          component={Link}
          href={{
            pathname: `/shows/${showId}/${
              typeof showName === 'string' ? encodeURIComponent(showName) : ''
            }/seasons`,
          }}
        >
          <FaChevronLeft size={tablet ? 12 : 14} />
          <Space w={3} />
          <Text fz={mobile ? 'sm' : 'md'}>Back to Episode</Text>
        </Anchor>
      </Flex>
      <Container
        size="sm"
        p={0}
        sx={() => ({
          borderBottom: 'none',
        })}
      >
        <Flex gap="sm" direction="column" mt={mobile ? 0 : 50} p={mobile ? 0 : 'xs'}>
          <AspectRatio
            ratio={16 / (mobile ? 9 : 6)}
            sx={{
              flexGrow: 1,
            }}
          >
            <Image
              fill
              alt=""
              src={`https://image.tmdb.org/t/p/original${media?.still_path}`}
              style={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
            />
          </AspectRatio>
          <Flex justify="center" direction="column" w="fit-content" px={mobile ? 'xs' : 0}>
            <Title size={mobile ? 'h3' : 'h2'}>
              {media?.name}
              {/* <Divider mt={5} /> */}
            </Title>
            <Title color="gray.7" size={mobile ? 'h4' : 'h3'}>
              {showName}&nbsp;{seasonNumber}x
              {episodeNumberValue && episodeNumberValue < 10
                ? `0${episodeNumberValue}`
                : episodeNumberValue}{' '}
            </Title>
          </Flex>
        </Flex>
      </Container>

      <Container mt="pt" size="sm" p={0} py="xl">
        <Element name="Cast" className="element">
          <Flex pl={12} pr="sm" gap={3} align="center">
            <Title size={mobile ? 'h3' : 'h2'}>Cast</Title>
            <Text c="dark.1" pt={2} fw={300} fz={mobile ? 'lg' : 22}>
              ({castAndCrew.cast?.length})
            </Text>

            <Divider
              my="sm"
              variant="dotted"
              sx={{
                flexGrow: 1,
              }}
            />
          </Flex>
          <Box mt="xs" px={mobile ? 0 : 12}>
            {castAndCrew.cast?.map((castMember, index) => (
              // <tr key={castMember.id}>
              <Accordion
                transitionDuration={200}
                defaultValue="customization"
                chevron={castMember.roles && castMember.roles.length > 1 ? <BsChevronUp /> : null}
                styles={(theme) => ({
                  control: {
                    '&:hover': {
                      backgroundColor:
                        index % 2 === 0 ? theme.colors.dark[7] : theme.colors.dark[8],
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
                            {castMember.character || castMember.character}
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      <Grid>
                        <Grid.Col span={4}>
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
                              {castMember.character || castMember.character}
                            </Text>
                          </Flex>
                        </Grid.Col>
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
          </Box>
        </Element>
        <Element name="guestStars" className="element">
          <Flex pl={12} pr="sm" gap={3} align="center" mt={75}>
            <Title size={mobile ? 'h3' : 'h2'}>Guest Stars</Title>
            <Text c="dark.1" pt={2} fw={300} fz={mobile ? 'lg' : 22}>
              ({guestStars?.length})
            </Text>
            <Divider
              my="sm"
              variant="dotted"
              sx={{
                flexGrow: 1,
              }}
            />
          </Flex>
          <Box mt="xs" px={mobile ? 0 : 12}>
            {guestStars?.map((castMember, index) => (
              // <tr key={castMember.id}>
              <Accordion
                transitionDuration={200}
                defaultValue="customization"
                chevron={null}
                styles={(theme) => ({
                  control: {
                    '&:hover': {
                      backgroundColor:
                        index % 2 === 0 ? theme.colors.dark[7] : theme.colors.dark[8],
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
                            {castMember.character || castMember.character}
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      <Grid>
                        <Grid.Col span={4}>
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
                              {castMember.character || castMember.character}
                            </Text>
                          </Flex>
                        </Grid.Col>
                      </Grid>
                    )}
                  </Accordion.Control>
                </Accordion.Item>
              </Accordion>
            ))}
          </Box>
        </Element>

        <Stack spacing={50} mt="xl">
          {departments.map((department, index) => (
            <Element key={index} name={department.department} className="element">
              <Box>
                <Flex pl={12} pr="sm" gap={3} align="center">
                  <Text size={mobile ? 'lg' : 'xl'} fw={800} id={department.department}>
                    {' '}
                    {department.department}
                  </Text>
                  <Text c="dark.1" fw={300} fz={mobile ? 'md' : 'lg'}>
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
                <Table mt="sm">
                  <tbody
                    style={{
                      paddingLeft: 12,
                      paddingRight: 12,
                    }}
                  >
                    {department.crew.map((crewMember) => (
                      <tr
                        style={
                          {
                            // backgroundColor: crewIndex % 2 === 0 ? '#1A1B1E' : '#141517'
                          }
                        }
                        key={crewMember.id}
                      >
                        <td
                          style={{
                            width: '40%',
                            verticalAlign: 'top',

                            border: 0,
                            padding: 0,
                            paddingLeft: 20,
                          }}
                        >
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
                            <Text
                              sx={{
                                wordWrap: 'normal',
                              }}
                              color="gray.4"
                              fw={600}
                            >
                              {crewMember.name}
                            </Text>
                          </Anchor>
                        </td>
                        <td
                          style={{
                            width: 30,
                            verticalAlign: 'top',
                            border: 0,
                            paddingBottom: 0,
                            paddingTop: 0,
                          }}
                        >
                          <Text>&#183;&#183;&#183;</Text>
                        </td>
                        <td
                          style={{
                            verticalAlign: 'top',
                            border: 0,
                            paddingBottom: 0,
                            paddingTop: 0,
                          }}
                        >
                          <Text>{crewMember.job}</Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Element>
          ))}
        </Stack>
      </Container>
    </Container>
  );
}
