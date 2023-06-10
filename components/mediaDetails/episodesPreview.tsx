import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Text,
  Box,
  AspectRatio,
  Title,
  useMantineTheme,
  Skeleton,
  BackgroundImage,
  Grid,
  Flex,
  Card,
  Group,
  Anchor,
} from '@mantine/core';

import { BsCircleFill, BsFillStarFill } from 'react-icons/bs';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { EpisodeDetails } from '../../Types/types';

import { getHighestRatedEpisode, getHighestRatedEpisodes } from '../../pages/api/mediaDetailsAPI';

interface HighlightedEpisodeProps {
  episode: EpisodeDetails;
  badge: string;
  bgColor: string;
  color: string;
}

interface EpisodesPreviewProps {
  numSeasons: number;
  lastEp: EpisodeDetails;
}

function HighlightedEpisode({ episode, badge, bgColor, color }: HighlightedEpisodeProps) {
  // responsive styles

  const desktop = useMediaQuery('(min-width: 768px)');

  const router = useRouter();
  const { showId, showName } = router.query;

  return (
    <Box w={!desktop ? '100%' : '95%'} mih="100%" h="100%">
      <Card
        mih="100%"
        h="100%"
        shadow="sm"
        padding={desktop ? 'lg' : 'md'}
        radius={desktop ? 'md' : 'sm'}
        bg="dark.7"
      >
        {desktop ? (
          <Card.Section>
            <BackgroundImage src={`https://image.tmdb.org/t/p/w780${episode.still_path}`}>
              <AspectRatio ratio={16 / 7} display="flex">
                <Box>
                  <Flex justify="flex-end" h="100%" w="100%">
                    <Box p="xs">
                      <Text
                        bg={bgColor}
                        c={color}
                        py={4}
                        px="sm"
                        fz="xs"
                        weight={700}
                        sx={{
                          borderRadius: '4px',
                        }}
                      >
                        {badge}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </AspectRatio>
            </BackgroundImage>
          </Card.Section>
        ) : null}

        {!desktop ? (
          <Text
            w="fit-content"
            bg={bgColor}
            c={color}
            py={4}
            px="sm"
            fz={10}
            weight={700}
            sx={{
              borderRadius: '4px',
            }}
          >
            {badge}
          </Text>
        ) : null}

        <Group position="apart" mt={desktop ? 'md' : 'xs'}>
          <Anchor
            component={Link}
            href={{
              pathname: `/shows/${showId}/${
                typeof showName === 'string' ? encodeURIComponent(showName) : ''
              }/season/${episode.season_number}/episode/${episode.episode_number}`,
            }}
            sx={(theme) => ({
              '&:hover': {
                textDecorationColor: theme.colors.gray[2],
              },
            })}
          >
            <Title truncate c="gray.2" size="h4">
              {episode.name}
            </Title>
          </Anchor>
        </Group>

        <Flex pt={1} align="center" gap="xs" pl={3}>
          {episode.vote_average && episode.vote_average > 0 ? (
            <Flex gap={6}>
              <Flex pb={1} align="center">
                <BsFillStarFill size={12} color="#ffd452" />
              </Flex>
              <Text c="gray.5" fw={500} fz="sm">
                {episode.vote_average.toFixed(1)}
              </Text>
            </Flex>
          ) : null}

          <BsCircleFill size={3} color="#fff" />

          <Text c="gray.5" fw={500} fz="sm">
            S{episode.season_number} E{episode.episode_number! < 10 ? 0 : null}
            {episode.episode_number}{' '}
          </Text>
          {/*
          <BsCircleFill size={3} color="#fff" /> */}

          {/* <Text fw={500} fz="sm">
            {formatReleaseDate(episode.air_date)}
          </Text> */}
        </Flex>
        <Text lineClamp={3} mt="md" size="sm" color="dimmed">
          {episode.overview}
        </Text>
      </Card>
    </Box>
  );
}

export function EpisodesPreview({ numSeasons, lastEp }: EpisodesPreviewProps) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 768px)');

  const router = useRouter();
  const { showId, showName } = router.query;

  const theme = useMantineTheme();

  const [topRated, setTopRated] = useState<EpisodeDetails | null>(null);
  const [topEpisodes, setTopEpisodes] = useState<EpisodeDetails[] | null>(null);

  useEffect(() => {
    getHighestRatedEpisode(showId, numSeasons)
      .then((episode) => {
        setTopRated(episode); // Episode with the highest vote average
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [showId]);

  useEffect(() => {
    getHighestRatedEpisodes(showId, numSeasons)
      .then((episode) => {
        setTopEpisodes(episode); // Episode with the highest vote average
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [showId]);

  // check if the top rated episode is the most recent episode and if so, display top two episodes
  let sameEpisode = null;
  let episode1 = null;
  let episode2 = null;

  if (topRated && topEpisodes) {
    [episode1, episode2] = topEpisodes;
    sameEpisode = episode1.id === lastEp.id;

    if (!sameEpisode) {
      episode2 = lastEp;
    }
  }

  return (
    <Box mt={75}>
      <Anchor
        component={Link}
        href={`/shows/${showId}/${showName ? encodeURIComponent(showName.toString()) : ''}/seasons`}
        sx={{
          '&:hover': {
            textDecorationColor: theme.colors.gray[2],
          },
        }}
      >
        <Flex align="center" c="gray.2">
          <Title
            c="gray.2"
            size="h3"
            pl={8}
            inline
            sx={{
              borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
            }}
          >
            Episodes
          </Title>

          <IconChevronRight size={28} style={{ paddingTop: 2 }} />
        </Flex>
      </Anchor>

      <Grid gutter={desktop ? 'md' : 'xl'} mt={desktop ? 'md' : 'xs'}>
        <Grid.Col span={12} sm={6}>
          {episode1 ? (
            <HighlightedEpisode
              episode={episode1}
              badge="TOP RATED"
              bgColor="#F5C518"
              color="dark.9"
            />
          ) : (
            <Box>
              <Skeleton height={300} />
            </Box>
          )}
        </Grid.Col>
        <Grid.Col span={12} sm={6}>
          {episode2 ? (
            <HighlightedEpisode
              episode={episode2}
              badge={sameEpisode ? 'TOP RATED' : 'MOST RECENT'}
              bgColor={sameEpisode ? '#F5C518' : 'blue.5'}
              color="dark.9"
            />
          ) : (
            <Box>
              <Skeleton height={300} />
            </Box>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
}
