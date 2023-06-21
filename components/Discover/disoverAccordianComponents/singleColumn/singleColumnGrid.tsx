import {
  Anchor,
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Paper,
  Text,
  Title,
  Image,
} from '@mantine/core';

import { BsFillStarFill } from 'react-icons/bs';

import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType } from '../../../../Types/types';

export default function SingleColumnGrid(props: {
  items: MediaItemType[];
  mediaType: string;
  subject: string;
}) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');
  return (
    <Box mt="xl">
      {props.items.map((item, index) => (
        <Box key={item.id}>
          <Grid>
            <Grid.Col span="content" px="sm">
              <Paper shadow="xl">
                <Anchor
                  sx={(theme) => ({
                    textDecorationColor: theme.colors.gray[0],
                  })}
                  component={Link}
                  href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                    item.title
                      ? encodeURIComponent(item.title)
                      : encodeURIComponent(item.name || '')
                  }`}
                  underline={false}
                >
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Image
                      style={{
                        borderRadius: '4px',
                        border: '1px solid hsla(0, 0%, 30%, .25)',
                      }}
                      alt="poster"
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                          : '/media_placeholder_sm.png'
                      }
                    />
                  </AspectRatio>
                </Anchor>
              </Paper>
            </Grid.Col>
            <Grid.Col span="auto">
              <Flex justify="space-between">
                <Text fz={desktop ? 'sm' : 'xs'} fw={300}>
                  {index + 1}
                </Text>
                {props.subject === 'highestGrossing' && (
                  <Text fz={desktop ? 'sm' : 'xs'} fw={400} c="dark.0" mr="lg">
                    ${item.revenue?.toLocaleString()}
                  </Text>
                )}
              </Flex>

              <Anchor
                component={Link}
                href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                  item.title ? encodeURIComponent(item.title) : encodeURIComponent(item.name || '')
                }`}
                sx={(theme) => ({
                  '&:hover': {
                    textDecorationColor: theme.colors.gray[0],
                  },
                })}
              >
                <Title c="dark.0" size={desktop ? 'h4' : 'h5'} order={2}>
                  {item.title || item.name}
                </Title>
              </Anchor>

              <Flex mt={1} align="center" gap={3}>
                <BsFillStarFill size={desktop ? 13 : 11} color="#fcc419" />
                <Flex pt={1} gap={7}>
                  {item.vote_average && item.vote_average > 0 && (
                    <Text c="dark.1" fz={desktop ? 'sm' : 'xs'}>
                      {item.vote_average}
                    </Text>
                  )}
                  {item.vote_average && item.vote_average > 0 && (
                    <Text c="dark.1" fz={desktop ? 'sm' : 'xs'}>
                      ·
                    </Text>
                  )}
                  <Text c="dark.1" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {item.certification}
                  </Text>
                  {item.certification && (
                    <Text c="dark.1" fz={desktop ? 'sm' : 'xs'}>
                      ·
                    </Text>
                  )}
                  <Text c="dark.1" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
                    {props.mediaType === 'tv' && item.lastAirDate
                      ? `-${item.lastAirDate.substring(0, 4)}`
                      : null}
                  </Text>
                  {item.release_date && (
                    <Text c="dark.1" fz={desktop ? 'sm' : 'xs'}>
                      ·
                    </Text>
                  )}
                  <Text c="dark.1" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {item.runtimeOrEpisodeLength}
                  </Text>
                </Flex>
              </Flex>
              <Text mt="xs" c="dimmed" fz={desktop ? 'sm' : 'xs'} lineClamp={2} pr="md">
                {item.overview}
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
        </Box>
      ))}
    </Box>
  );
}
