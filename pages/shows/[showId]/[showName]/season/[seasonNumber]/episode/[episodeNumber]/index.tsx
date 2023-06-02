import { Box, Anchor, Flex, Title, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { EpisodeDetails, SeasonType, TVRoot } from '../../../../../../../../Types/types';
import { fetchMediaDetails } from '../../../../../../../api/mediaItemAPI';
import { fetchEpisodeDetails, fetchSeasonDetails } from '../../../../../../../api/showAPI';

export default function Episode() {
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
          //* Fetch previous season details
          const prevSeasonDate = await fetchSeasonDetails(showIdNumber, currentSeasonNumber - 1);
          setPrevSeasonCount(prevSeasonDate.episodes.length);
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
      <Anchor
        component={Link}
        href={{
          pathname: `/shows/${showId}/${
            typeof showName === 'string' ? encodeURIComponent(showName) : ''
          }/seasons`,
        }}
      >
        Back to Seasons
      </Anchor>
      <Flex bg="dark.6" justify="space-between" py="xl" px="md">
        {prevSeasonNumber && prevEpisodeNumber ? (
          <Box>
            <Anchor
              component={Link}
              href={{
                pathname: `/shows/${showIdNumber}/${
                  typeof showName === 'string' ? encodeURIComponent(showName) : ''
                }/season/${prevSeasonNumber}/episode/${prevEpisodeNumber}`,
              }}
            >
              Prev Episode
            </Anchor>
            <Text>
              s{prevSeasonNumber}e{prevEpisodeNumber}
            </Text>
          </Box>
        ) : (
          <></>
        )}
        {nextSeasonNumber && nextEpisodeNumber ? (
          <Box>
            <Anchor
              component={Link}
              href={{
                pathname: `/shows/${showIdNumber}/${
                  typeof showName === 'string' ? encodeURIComponent(showName) : ''
                }/season/${nextSeasonNumber}/episode/${nextEpisodeNumber}`,
              }}
            >
              Next Episode
            </Anchor>
            <Text>
              s{nextSeasonNumber}e{nextEpisodeNumber}
            </Text>
          </Box>
        ) : null}
      </Flex>
      {episodeDetails ? (
        <>
          <Text>
            s{episodeDetails.season_number}e{episodeDetails.episode_number}
          </Text>

          <Title order={1}>{episodeDetails.name}</Title>
          <Box>
            <p>{episodeDetails.overview}</p>
          </Box>
        </>
      ) : (
        <p>Loading episode details...</p>
      )}
    </Box>
  );
}
