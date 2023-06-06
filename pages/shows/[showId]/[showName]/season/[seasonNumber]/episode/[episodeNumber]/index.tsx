import {
  Box,
  Anchor,
  Flex,
  Text,
  Container,
  Space,
  AspectRatio,
  Skeleton,
  SimpleGrid,
  Center,
  Grid,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { BsChevronLeft, BsChevronRight, BsFillStarFill } from 'react-icons/bs';
import { EpisodeDetails, SeasonType, TVRoot } from '../../../../../../../../Types/types';
import { fetchMediaDetails } from '../../../../../../../api/mediaItemAPI';
import { fetchEpisodeDetails, fetchSeasonDetails } from '../../../../../../../api/showAPI';
import { formatReleaseDate } from '../../../../../../../../components/Discover/discoverGrid';
import { formatRuntime } from '../../../../../../../../utils/utils';

export default function Episode() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');

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

  return (
    <Box>
      <Flex bg={tablet ? 'dark.7' : 'transparent'} p="xs">
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
          <FaChevronLeft size={12} />
          <Space w={3} />
          <Text fz="md">Back to Seasons</Text>
        </Anchor>
      </Flex>
      <Flex
        // bg="dark.6"
        justify="space-between"
        py="xs"
        px="md"
      >
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
              <BsChevronLeft size={30} />
            </Center>
          </Anchor>
        ) : (
          <Box />
        )}

        {episodeDetails && (
          <SimpleGrid cols={2} w="40%">
            <Box>
              <Text fz="sm" align="center">
                season
              </Text>
              <Text align="center">{episodeDetails.season_number}</Text>
            </Box>
            <Box>
              <Text fz="sm" align="center">
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
              <BsChevronRight size={30} />
            </Center>
          </Anchor>
        ) : null}
      </Flex>
      {episodeDetails ? (
        <Container p={0}>
          <Grid justify="center" m={0}>
            <Grid.Col maw="100%" span={12} p={0}>
              <AspectRatio ratio={16 / 9}>
                <Skeleton />
                <Image
                  fill
                  alt=""
                  src={`https://image.tmdb.org/t/p/original${episodeDetails.still_path}`}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col px="xs" span={12}>
              <Text fz={24} c="gray.0">
                {episodeDetails.name}
              </Text>

              <Flex align="center" gap="md" pl={3} mt={3}>
                <Flex gap={6}>
                  <Flex pb={1} align="center">
                    <BsFillStarFill size={14} color="#ffd452" />
                  </Flex>
                  <Text fz="md"> {episodeDetails.vote_average}</Text>
                </Flex>
                <Text fz="md">{formatReleaseDate(episodeDetails.air_date)}</Text>
                <Text fz="md" c="brand.4">
                  {formatRuntime(episodeDetails.runtime)}
                </Text>
              </Flex>

              <Box>
                <Text mt="xs" fz="md" c="gray.4">
                  {episodeDetails.overview}
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      ) : (
        <p>Loading episode details...</p>
      )}
    </Box>
  );
}
