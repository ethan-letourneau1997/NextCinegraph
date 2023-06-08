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
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from '@mantine/hooks';
import { BsChevronLeft, BsChevronRight, BsFillStarFill } from 'react-icons/bs';

import { EpisodeDetails, SeasonType, TVRoot } from '../../../../../../../../Types/types';
import { fetchMediaDetails } from '../../../../../../../api/mediaDetailsAPI';
import { fetchEpisodeDetails, fetchSeasonDetails } from '../../../../../../../api/showAPI';
import { formatReleaseDate } from '../../../../../../../../components/Discover/discoverGrid';
import { formatRuntime } from '../../../../../../../../utils/utils';
import BannerImage from '../../../../../../../../components/mediaDetails/bannerImage';
import { ImagesFromEpisode } from '../../../../../../../../components/Episode/imagesFromEpisode';
import { CreditList } from '../../../../../../../../components/Episode/creditList';
import { GuestStars } from '../../../../../../../../components/Episode/guestStars';

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

  console.log('episodeDetails', episodeDetails);

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
          <FaChevronLeft size={tablet ? 12 : 14} />
          <Space w={3} />
          <Text fz={mobile ? 'sm' : 'md'}>Back to Seasons</Text>
        </Anchor>
      </Flex>

      <Container pos="relative" p={0}>
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
              zIndex: 90,
              backgroundImage: 'linear-gradient(to bottom, #101113, transparent)',
              // backgroundImage: 'linear-gradient(to top, #101113, red)',
              // border: '1px solid white',
            }}
          />
        </Box>
        {episodeDetails?.still_path && (
          <BannerImage aspectRatio={16 / 6.5} mediaBackdrop={episodeDetails?.still_path} />
        )}

        {episodeDetails ? (
          <Grid justify="center" m={0} gutter={35} columns={20}>
            <Grid.Col px="xs" span={18} sm={11} md={12}>
              <Title size="h2" c="gray.4">
                {episodeDetails.name}
              </Title>
              <Flex align="center" gap="md" pl={3} mt={3}>
                {episodeDetails.vote_average && episodeDetails.vote_average > 0 ? (
                  <Flex gap={6}>
                    <Flex pb={1} align="center">
                      <BsFillStarFill size={14} color="#ffd452" />
                    </Flex>

                    <Text c="gray.4" fz="sm" fw={600}>
                      {episodeDetails.vote_average.toFixed(1)}
                    </Text>
                  </Flex>
                ) : null}
                <Text c="gray.5" fz="sm" fw={500}>
                  {formatReleaseDate(episodeDetails.air_date)}
                </Text>
                <Text c="gray.5" fz="sm" fw={500}>
                  {formatRuntime(episodeDetails.runtime)}
                </Text>
              </Flex>

              <Text mt="md" fz={mobile ? 'sm' : 'md'} c="gray.4">
                {episodeDetails.overview}
              </Text>

              <Stack mt="md" spacing={0}>
                {directors || writers || executiveProducers || episodeDetails.credits.cast ? (
                  <Divider my="xs" />
                ) : null}
                {directors && <CreditList title="Director" credits={directors} mobile={mobile} />}
                {writers && <CreditList title="Writer" credits={writers} mobile={mobile} />}
                {executiveProducers && (
                  <CreditList
                    title="Executive Producer"
                    credits={executiveProducers}
                    mobile={mobile}
                  />
                )}
                {episodeDetails.credits.cast && (
                  <CreditList title="Star" credits={episodeDetails.credits.cast} mobile={mobile} />
                )}
              </Stack>
            </Grid.Col>

            <Grid.Col span={18} sm={8} md={8}>
              {episodeDetails.guest_stars && (
                <GuestStars mobile={mobile} episodeDetails={episodeDetails} />
              )}
            </Grid.Col>
            {!mobile &&
            episodeDetails.images &&
            episodeDetails.images.stills &&
            episodeDetails.images.stills.length >= 2 ? (
              <Grid.Col span={mobile ? 18 : 20} maw={tablet ? '95vw' : '100%%'}>
                <Title
                  size="h3"
                  fw={600}
                  pl={8}
                  mb="md"
                  inline
                  sx={(theme) => ({
                    borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
                  })}
                >
                  Photos
                </Title>

                <ImagesFromEpisode episodeImages={episodeDetails.images.stills} />
              </Grid.Col>
            ) : null}
          </Grid>
        ) : (
          <p>Loading episode details...</p>
        )}
      </Container>
    </Box>
  );
}
