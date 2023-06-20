import {
  Anchor,
  Box,
  AspectRatio,
  Grid,
  Flex,
  Text,
  Divider,
  Skeleton,
  Card,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsFillStarFill } from 'react-icons/bs';
import { useMediaQuery } from '@mantine/hooks';

import { SeasonType } from '../../Types/types';
import { formatReleaseDate } from '../Discover/discoverGrid';
import { formatRuntime } from '../../utils/utils';

interface SeasonProps {
  seasonNumber: number;
}

export default function Season(props: SeasonProps) {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');

  const [season, setSeason] = useState<SeasonType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = '0fd7a8764e6522629a3b7e78c452c348';

  const router = useRouter();
  const { showId, showName } = router.query;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${props.seasonNumber}?api_key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data: SeasonType) => {
        setSeason(data);
        setError(null);
      })
      .catch((errorFetchingData) => {
        setError('Error fetching data');
        console.error(errorFetchingData);
      });
  }, [showId, props.seasonNumber, apiKey]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!season) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {season.episodes &&
        season.episodes.map((episode) => (
          <Box key={episode.id}>
            <Grid
              gutter="xs"
              mb="xl"
              columns={20}
              justify="center"
              maw="100%"
              sx={{
                overflow: 'hidden',
              }}
            >
              <Grid.Col span={20} xs={10} sm={8} lg={6}>
                <Anchor
                  underline={false}
                  component={Link}
                  href={{
                    pathname: `/shows/${showId}/${
                      typeof showName === 'string' ? encodeURIComponent(showName) : ''
                    }/season/${episode.season_number}/episode/${episode.episode_number}`,
                  }}
                >
                  <Card shadow="md">
                    <Card.Section>
                      <AspectRatio ratio={tablet ? 16 / 7 : 16 / 9}>
                        <Skeleton />
                        <Image
                          fill
                          alt=""
                          src={
                            episode.still_path
                              ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
                              : '/still_placeholder_md.png'
                          }
                        />
                      </AspectRatio>
                    </Card.Section>
                  </Card>
                </Anchor>
              </Grid.Col>
              <Grid.Col px="xs" span={20} xs={10} sm={12} lg={14}>
                <Anchor
                  // fz="xl"
                  c="dark.0"
                  component={Link}
                  href={{
                    pathname: `/shows/${showId}/${
                      typeof showName === 'string' ? encodeURIComponent(showName) : ''
                    }/season/${episode.season_number}/episode/${episode.episode_number}`,
                  }}
                >
                  <Title size="h4">
                    {episode.episode_number}.&nbsp;{episode.name}
                  </Title>
                </Anchor>

                <Flex align="center" gap={7} pl={3} mt={1}>
                  {episode.vote_average && episode.vote_average > 0 ? (
                    <Flex gap={6}>
                      <Flex pb={1} align="center">
                        <BsFillStarFill size={12} color="#ffd452" />
                      </Flex>

                      <Text fw={500} c="dark.2" fz="sm">
                        {episode.vote_average.toFixed(1)}
                      </Text>
                    </Flex>
                  ) : null}
                  <Text fw={500} c="dark.2">
                    ·
                  </Text>
                  <Text fw={500} c="dark.2" fz="sm">
                    {formatReleaseDate(episode.air_date)}
                  </Text>
                  <Text fw={500} c="dark.2">
                    ·
                  </Text>
                  <Text fz="sm" fw={500} c="dark.2">
                    {formatRuntime(episode.runtime)}
                  </Text>
                </Flex>

                <Box>
                  <Text lineClamp={3} mt="xs" fz="sm" c="dimmed">
                    {episode.overview}
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={20}>
                <Divider mt="md" />
              </Grid.Col>
            </Grid>
          </Box>
        ))}
    </Box>
  );
}
