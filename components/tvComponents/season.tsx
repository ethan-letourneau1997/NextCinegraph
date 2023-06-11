import { Anchor, Box, AspectRatio, Grid, Flex, Text, Divider, Skeleton, Card } from '@mantine/core';
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
            <Anchor
              underline={false}
              c="gray.5"
              component={Link}
              href={{
                pathname: `/shows/${showId}/${
                  typeof showName === 'string' ? encodeURIComponent(showName) : ''
                }/season/${episode.season_number}/episode/${episode.episode_number}`,
              }}
            >
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
                  <Card shadow="md">
                    <Card.Section>
                      <AspectRatio ratio={tablet ? 16 / 7 : 16 / 9}>
                        <Skeleton />
                        {episode.still_path ? (
                          <Image
                            fill
                            alt=""
                            src={`https://image.tmdb.org/t/p/w780${episode.still_path}`}
                          />
                        ) : (
                          <Image
                            alt=""
                            fill
                            src="/still_placeholder_md.png"
                            // style={{ borderRadius: '4px' }}
                          />
                        )}
                      </AspectRatio>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col px="xs" span={20} xs={10} sm={12} lg={14}>
                  <Text fz="xl" c="gray.0">
                    {episode.episode_number}.&nbsp;{episode.name}
                  </Text>

                  <Flex align="center" gap="xs" pl={3} mt={3}>
                    {episode.vote_average && episode.vote_average > 0 ? (
                      <Flex gap={6}>
                        <Flex pb={1} align="center">
                          <BsFillStarFill size={12} color="#ffd452" />
                        </Flex>

                        <Text fz="sm"> {episode.vote_average.toFixed(1)}</Text>
                      </Flex>
                    ) : null}
                    <Text fz="sm">{formatReleaseDate(episode.air_date)}</Text>
                    <Text fz="sm" c="brand.4">
                      {formatRuntime(episode.runtime)}
                    </Text>
                  </Flex>

                  <Box>
                    <Text lineClamp={3} mt="xs" fz="sm" c="gray.4">
                      {episode.overview}
                    </Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={20}>
                  <Divider mt="md" />
                </Grid.Col>
              </Grid>
            </Anchor>
          </Box>
        ))}
    </Box>
  );
}
