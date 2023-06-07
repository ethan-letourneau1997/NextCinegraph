import {
  Box,
  Anchor,
  Flex,
  Text,
  Container,
  Space,
  SimpleGrid,
  Center,
  Grid,
  Divider,
  Stack,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from '@mantine/hooks';
import { BsChevronLeft, BsChevronRight, BsFillStarFill, BsPersonFill } from 'react-icons/bs';
import Image from 'next/image';
import { EpisodeDetails, SeasonType, TVRoot } from '../../../../../../../../Types/types';
import { fetchMediaDetails } from '../../../../../../../api/mediaItemAPI';
import { fetchEpisodeDetails, fetchSeasonDetails } from '../../../../../../../api/showAPI';
import { formatReleaseDate } from '../../../../../../../../components/Discover/discoverGrid';
import { formatRuntime } from '../../../../../../../../utils/utils';
import BannerImage from '../../../../../../../../components/mediaDetails/bannerImage';

export default function Episode() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');
  // const desktop = useMediaQuery('(min-width: 768px)');
  const mobile = useMediaQuery('(max-width: 600px)');

  //* Get query params
  const router = useRouter();
  const { showId, showName, seasonNumber, episodeNumber } = router.query;

  //* convert query params to numbers
  const showIdNumber = parseInt(showId as string, 10);
  const currentSeasonNumber = parseInt(seasonNumber as string, 10);
  const currentEpisodeNumber = parseInt(episodeNumber as string, 10);

  //* set state for episode details, season details, and show details
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
  const [seasonDetails, setSeasonDetails] = useState<SeasonType | null>(null);
  const [prevSeasonCount, setPrevSeasonCount] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<TVRoot | null>(null);

  //* fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //* Fetch episode details
        if (showIdNumber && currentSeasonNumber && currentEpisodeNumber) {
          const episodeData = await fetchEpisodeDetails(
            showIdNumber,
            currentSeasonNumber,
            currentEpisodeNumber
          );
          setEpisodeDetails(episodeData);
        }

        //* Fetch season details
        if (showIdNumber && currentSeasonNumber) {
          //* Fetch current season details
          const seasonData = await fetchSeasonDetails(showIdNumber, currentSeasonNumber);
          setSeasonDetails(seasonData);

          if (currentSeasonNumber > 1) {
            //* Fetch previous season details
            const prevSeasonData = await fetchSeasonDetails(showIdNumber, currentSeasonNumber - 1);
            setPrevSeasonCount(prevSeasonData.episodes.length);
          } else {
            setPrevSeasonCount(0);
          }
        }

        //* Fetch show details
        if (showIdNumber) {
          const id = showIdNumber;
          const showData = await fetchMediaDetails('tv', id);
          setShowDetails(showData);
        }
      } catch (error) {
        //* handle error
        console.error(error);
      }
    };

    fetchData();
  }, [showIdNumber, currentSeasonNumber, currentEpisodeNumber]);

  //* Get total number of seasons
  const totalSeasons: number | null = showDetails?.number_of_seasons ?? null;

  //* Get next episode number and season number
  let nextSeasonNumber: number | null = null;
  let nextEpisodeNumber: number | null = null;

  //* If we have episode details and season details, get next episode number and season number
  if (episodeDetails && seasonDetails && totalSeasons) {
    const { season_number } = episodeDetails;
    const { episodes } = seasonDetails;

    if (season_number !== undefined && episodes !== undefined) {
      const { episode_number } = episodeDetails;
      const numEpisodes: number = episodes.length;

      if (episode_number !== undefined && episode_number < numEpisodes) {
        nextEpisodeNumber = episode_number + 1;
        nextSeasonNumber = season_number;
      } else if (episode_number === numEpisodes && season_number < totalSeasons) {
        nextEpisodeNumber = 1;
        nextSeasonNumber = season_number + 1;
      } else if (episode_number === numEpisodes && season_number === totalSeasons) {
        nextEpisodeNumber = null;
        nextSeasonNumber = null;
      }
    }
  }

  //* Get previous episode number and season number
  let prevSeasonNumber: number | null = null;
  let prevEpisodeNumber: number | null = null;

  //* If we have episode details and season details, get previous episode number and season number
  if (episodeDetails && seasonDetails) {
    const { season_number } = episodeDetails;
    const { episodes } = seasonDetails;

    if (season_number !== undefined && episodes !== undefined) {
      const { episode_number } = episodeDetails;

      if (episode_number !== undefined && episode_number > 1) {
        prevEpisodeNumber = episode_number - 1;
        prevSeasonNumber = season_number;
      } else if (episode_number === 1 && season_number > 1) {
        prevEpisodeNumber = prevSeasonCount;
        prevSeasonNumber = season_number - 1;
      }
    }
  }

  const writers = episodeDetails?.crew?.filter((person) => person.job === 'Writer');
  const directors = episodeDetails?.crew?.filter((person) => person.job === 'Director');
  const executiveProducers = episodeDetails?.crew?.filter(
    (person) => person.job === 'Executive Producer'
  );

  const { Fragment } = React;

  return (
    <Box>
      <Flex
        sx={{
          position: tablet ? 'static' : 'absolute',
        }}
        bg={tablet ? 'dark.7' : 'transparent'}
        // bg="dark.7"
        p="xs"
        pl={30}
        pt={tablet ? 'xs' : 0}
      >
        <Anchor
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
          <FaChevronLeft size={tablet ? 12 : 16} />
          <Space w={3} />
          <Text fz={mobile ? 'sm' : 'lg'}>Back to Seasons</Text>
        </Anchor>
      </Flex>
      <Container p={0}>
        <Flex justify="space-between" py="xs" px="md">
          {prevSeasonNumber && prevEpisodeNumber ? (
            <Anchor
              sx={(theme) => ({
                display: 'flex',
                color: theme.colors.gray[5],
              })}
              component={Link}
              href={{
                pathname: `/shows/${showIdNumber}/${
                  typeof showName === 'string' ? encodeURIComponent(showName) : ''
                }/season/${prevSeasonNumber}/episode/${prevEpisodeNumber}`,
              }}
            >
              <Center h="100%">
                <BsChevronLeft size={26} />
              </Center>
            </Anchor>
          ) : (
            <BsChevronLeft size={26} color="transparent" />
          )}
          {episodeDetails && (
            <SimpleGrid cols={2} maw={250}>
              <Box>
                <Text fz={tablet ? 'sm' : 'md'} align="center">
                  season
                </Text>
                <Text align="center">{episodeDetails.season_number}</Text>
              </Box>
              <Box>
                <Text fz={tablet ? 'sm' : 'md'} align="center">
                  episode
                </Text>
                <Text align="center">{episodeDetails.episode_number}</Text>
              </Box>
            </SimpleGrid>
          )}
          {nextSeasonNumber && nextEpisodeNumber ? (
            <Anchor
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                color: theme.colors.gray[5],
              })}
              component={Link}
              href={{
                pathname: `/shows/${showIdNumber}/${
                  typeof showName === 'string' ? encodeURIComponent(showName) : ''
                }/season/${nextSeasonNumber}/episode/${nextEpisodeNumber}`,
              }}
            >
              <Center h="100%">
                <BsChevronRight size={26} />
              </Center>
            </Anchor>
          ) : (
            <BsChevronRight size={26} color="transparent" />
          )}
        </Flex>
        <Box pos="relative">
          <Box
            pos="absolute"
            top={0}
            w="100%"
            h={10}
            sx={{
              zIndex: 500,
              backgroundImage: 'linear-gradient(to bottom, #101113, transparent)',
              // backgroundImage: 'linear-gradient(to top, #101113, red)',
              // border: '1px solid white',
            }}
          />
        </Box>
        <BannerImage aspectRatio={16 / 6.5} mediaBackdrop={episodeDetails?.still_path} />

        {episodeDetails ? (
          <Grid justify="center" m={0} gutter={35} columns={20}>
            <Grid.Col px="xs" span={19} sm={11} md={12}>
              <Text fz={24} c="gray.0">
                {episodeDetails.name}
              </Text>

              <Flex align="center" gap="md" pl={3} mt={3}>
                <Flex gap={6}>
                  <Flex pb={1} align="center">
                    <BsFillStarFill size={14} color="#ffd452" />
                  </Flex>
                  <Text fz="md"> {episodeDetails.vote_average?.toFixed(1)}</Text>
                </Flex>
                <Text fz="md">{formatReleaseDate(episodeDetails.air_date)}</Text>
                <Text fz="md" c="brand.4">
                  {formatRuntime(episodeDetails.runtime)}
                </Text>
              </Flex>

              <Text mt="md" fz="md" c="gray.4">
                {episodeDetails.overview}
              </Text>

              <Stack mt="md" spacing={0}>
                <Divider my="xs" />
                {directors && directors.length > 0 && (
                  <Box>
                    <Flex wrap="wrap">
                      <Text c="gray.1" fw={600} mr="xs">
                        Director
                        {directors && directors.length > 1 ? 's' : ''}
                      </Text>
                      {directors &&
                        directors.slice(0, mobile ? 2 : 3).map((director, directorIndex) => (
                          <Fragment key={director.id}>
                            <Anchor
                              truncate
                              fw={300}
                              component={Link}
                              href={`/people/${director.id}/${encodeURIComponent(
                                director.name || ''
                              )}`}
                              underline={false}
                            >
                              {director.name}
                            </Anchor>
                            {directorIndex + 1 !== directors.length &&
                            directorIndex + 1 < (mobile ? 2 : 3)
                              ? '\u00A0\u00A0\u00B7'
                              : ''}
                            &nbsp;&nbsp;
                          </Fragment>
                        ))}
                    </Flex>
                    <Divider my="xs" />
                  </Box>
                )}

                {writers && writers.length > 0 && (
                  <Box>
                    <Flex wrap="wrap">
                      <Text c="gray.1" fw={600} mr="xs">
                        Writer
                        {writers && writers.length > 1 ? 's' : ''}
                      </Text>
                      {writers &&
                        writers.slice(0, mobile ? 2 : 3).map((writer, writerIndex) => (
                          <Fragment key={writer.id}>
                            <Anchor
                              truncate
                              fw={300}
                              component={Link}
                              href={`/people/${writer.id}/${encodeURIComponent(writer.name || '')}`}
                              underline={false}
                            >
                              {writer.name}
                            </Anchor>
                            {writerIndex + 1 !== writers.length &&
                            writerIndex + 1 < (mobile ? 2 : 3)
                              ? '\u00A0\u00A0\u00B7'
                              : ''}
                            &nbsp;&nbsp;
                          </Fragment>
                        ))}
                    </Flex>
                    <Divider my="xs" />
                  </Box>
                )}
                {executiveProducers && executiveProducers.length > 0 && (
                  <Box>
                    <Flex wrap="wrap">
                      <Text c="gray.1" fw={600} mr="xs">
                        Execuitve Producer
                        {executiveProducers && executiveProducers.length > 1 ? 's' : ''}
                      </Text>
                      {executiveProducers &&
                        executiveProducers
                          .slice(0, mobile ? 2 : 3)
                          .map((producer, producerIndex) => (
                            <Fragment key={producer.id}>
                              <Anchor
                                truncate
                                fw={300}
                                color="gray.4"
                                component={Link}
                                href={`/people/${producer.id}/${encodeURIComponent(
                                  producer.name || ''
                                )}`}
                                underline={false}
                              >
                                {producer.name}
                              </Anchor>
                              {producerIndex + 1 !== executiveProducers.length &&
                              producerIndex + 1 < (mobile ? 2 : 3)
                                ? '\u00A0\u00A0\u00B7'
                                : ''}
                              &nbsp;&nbsp;
                            </Fragment>
                          ))}
                    </Flex>
                    <Divider my="xs" />
                  </Box>
                )}
                {episodeDetails.credits.cast && episodeDetails.credits.cast.length > 0 && (
                  <Box>
                    <Flex wrap="wrap">
                      <Text c="gray.1" fw={600} mr="xs">
                        Cast Member
                        {episodeDetails.credits.cast && episodeDetails.credits.cast.length > 1
                          ? 's'
                          : ''}
                      </Text>
                      {episodeDetails.credits.cast &&
                        episodeDetails.credits.cast
                          .slice(0, mobile ? 2 : 3)
                          .map((castMember, castMemberIndex) => (
                            <Fragment key={castMember.id}>
                              <Anchor
                                truncate
                                fw={300}
                                component={Link}
                                href={`/people/${castMember.id}/${encodeURIComponent(
                                  castMember.name || ''
                                )}`}
                                underline={false}
                              >
                                {castMember.name}
                              </Anchor>
                              {castMemberIndex + 1 !== episodeDetails.credits.cast?.length &&
                              castMemberIndex + 1 < (mobile ? 2 : 3)
                                ? '\u00A0\u00A0\u00B7'
                                : ''}
                              &nbsp;&nbsp;
                            </Fragment>
                          ))}
                    </Flex>
                    <Divider mt="xs" />
                  </Box>
                )}
              </Stack>
            </Grid.Col>
            <Grid.Col span={19} sm={8} md={8}>
              <Text c="gray.1" fw={400} size="xl" mt={6}>
                Guest Stars
              </Text>
              <Grid mt="xs">
                {episodeDetails.guest_stars &&
                  episodeDetails.guest_stars.slice(0, 4).map((castMember) => (
                    <Grid.Col key={castMember.id} span={12} lg={12}>
                      <Flex
                        gap="sm"
                        bg="dark.7"
                        sx={{
                          borderRadius: '4px',
                        }}
                      >
                        {castMember.profile_path ? (
                          <Anchor
                            component={Link}
                            href={`/people/${castMember.id}/${encodeURIComponent(
                              castMember.name || ''
                            )}`}
                            underline={false}
                          >
                            <Image
                              style={{
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                              }}
                              height={80}
                              width={80}
                              alt=""
                              src={`https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`}
                            />
                          </Anchor>
                        ) : (
                          <Box
                            h={80}
                            w={80}
                            bg="dark.4"
                            sx={{
                              borderTopLeftRadius: '4px',
                              borderBottomLeftRadius: '4px',
                            }}
                          >
                            <BsPersonFill size={80} color="#18181B" />
                          </Box>
                        )}
                        <Box pt={8}>
                          <Anchor
                            color="gray.4"
                            fz="sm"
                            fw={600}
                            component={Link}
                            href={`/people/${castMember.id}/${encodeURIComponent(
                              castMember.name || ''
                            )}`}
                            underline={false}
                          >
                            {castMember.name}
                          </Anchor>
                          <Text lineClamp={2} fz="sm">
                            {castMember.character}
                          </Text>
                        </Box>
                      </Flex>
                    </Grid.Col>
                  ))}
              </Grid>
            </Grid.Col>
          </Grid>
        ) : (
          <p>Loading episode details...</p>
        )}
      </Container>
    </Box>
  );
}
