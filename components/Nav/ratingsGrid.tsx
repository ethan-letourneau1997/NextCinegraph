import { Anchor, Center, Container, Flex, Stack, Text, Tooltip } from '@mantine/core';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { EpisodeDetails, Seasons, TVRoot } from '../../Types/types';

export default function RatingsGrid(props: { showId: number }) {
  const [show, setShow] = useState<TVRoot | null>(null);
  const [seasons, setSeasons] = useState<Seasons>([]);

  const { showId } = props;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4',
      },
    };

    fetch(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        setShow(response);
        if (response.number_of_seasons > 0) {
          const seasonPromises = Array.from({ length: response.number_of_seasons }, (_, index) =>
            fetch(
              `https://api.themoviedb.org/3/tv/${showId}/season/${index + 1}?language=en-US`,
              options
            ).then((seasonResponse) => seasonResponse.json())
          );

          Promise.all(seasonPromises)
            .then((seasonsData) => {
              setSeasons(seasonsData);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  }, [showId]);

  if (!show) {
    return <div>Loading...</div>;
  }

  let highestEpisodeCount = 0;

  seasons.forEach((season) => {
    if (season.episodes.length > highestEpisodeCount) {
      highestEpisodeCount = season.episodes.length;
    }
  });

  const episodeNumbers = Array.from({ length: highestEpisodeCount }, (_, index) => index + 1);

  return (
    <Container pt="xl">
      <Flex gap="xs">
        <Stack spacing="xs" pt={25}>
          {episodeNumbers.map((episodeNumber) => (
            <Text
              align="right"
              fz="xs"
              h={50}
              key={episodeNumber}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {episodeNumber}
            </Text>
          ))}
        </Stack>
        {seasons.map((season) => (
          <Stack spacing="xs" key={season.id}>
            <Text align="center" fz="xs" color="white">
              {season.season_number}
            </Text>
            {season.episodes.map((episode: EpisodeDetails) => {
              let backgroundColor = ''; // Default background color is red
              if (episode.vote_average) {
                switch (true) {
                  case episode.vote_average > 8.49:
                    backgroundColor = '#28A745';

                    break;

                  case episode.vote_average > 7.79:
                    backgroundColor = '#7ADF90';
                    break;

                  case episode.vote_average > 6.49:
                    backgroundColor = '#FCD25E';
                    break;

                  case episode.vote_average > 0:
                    backgroundColor = '#BD2130';
                    break;
                  default:
                    backgroundColor = 'transparent';
                    break;
                }
              }

              return (
                <Anchor
                  component={Link}
                  href={
                    episode.name
                      ? `/shows/${showId}/${encodeURIComponent(episode.name)}/season/${
                          episode.season_number
                        }/episode/${episode.episode_number}`
                      : '#'
                  }
                  sx={{
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                  key={episode.id}
                >
                  <Center
                    ta="center"
                    h={50}
                    w={50}
                    bg={backgroundColor}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Tooltip
                      label={`${episode.season_number}x${episode.episode_number} ${episode.name}`}
                      color="dark"
                    >
                      {episode.vote_average && episode.vote_average > 0 ? (
                        <Text c="white" fw={500} p="xs" key={episode.id}>
                          {episode.vote_average.toFixed(1)}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </Center>
                </Anchor>
              );
            })}
          </Stack>
        ))}
      </Flex>
    </Container>
  );
}
