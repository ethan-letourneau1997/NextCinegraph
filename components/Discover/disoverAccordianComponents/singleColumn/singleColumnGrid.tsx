import {
  Anchor,
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Paper,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';

import { BsFillStarFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType } from '../../../../Types/types';

export default function SingleColumnGrid(props: {
  items: MediaItemType[];
  mediaType: string;
  subject: string;
}) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 768px)');
  return (
    <Box mt="xl">
      {props.items.map((item, index) => (
        <Box key={item.id}>
          <Grid>
            <Grid.Col span="content" px="sm">
              <Paper shadow="xl">
                <Anchor
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
                      src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                      fill
                    />
                  </AspectRatio>
                </Anchor>
              </Paper>
            </Grid.Col>
            <Grid.Col span="auto">
              <Flex justify="space-between">
                <Text fz={desktop ? 'sm' : 'xs'} fw={400}>
                  {index + 1}
                </Text>
                {props.subject === 'highestGrossing' && (
                  <Text fz={desktop ? 'sm' : 'xs'} fw={400} c="yellow.4" mr="lg">
                    ${item.revenue?.toLocaleString()}
                  </Text>
                )}
              </Flex>

              <Anchor
                component={Link}
                href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                  item.title ? encodeURIComponent(item.title) : encodeURIComponent(item.name || '')
                }`}
              >
                {' '}
                <Title size={desktop ? 'h4' : 'h5'} order={2}>
                  {item.title || item.name}
                </Title>
              </Anchor>

              <Flex mt={1} align="center" gap={3}>
                <BsFillStarFill size={desktop ? 14 : 12} color="#ffd452" />
                <Flex pt={1} gap="xs">
                  <Text fz={desktop ? 'sm' : 'xs'} fw={600}>
                    {' '}
                    {item.vote_average}
                  </Text>
                  <Text c="brand.4" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {item.certification}
                  </Text>
                  <Text c="brand.4" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {' '}
                    {item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
                    {props.mediaType === 'tv' && item.lastAirDate
                      ? `-${item.lastAirDate.substring(0, 4)}`
                      : null}
                  </Text>
                  <Text c="brand.4" fw={500} fz={desktop ? 'sm' : 'xs'}>
                    {item.runtimeOrEpisodeLength}
                  </Text>
                </Flex>
              </Flex>

              <Spoiler
                fz={desktop ? 'sm' : 'xs'}
                maxHeight={desktop ? 50 : 40}
                showLabel="Read More"
                hideLabel="Read Less"
              >
                <Text fz={desktop ? 'sm' : 'xs'} mt={3}>
                  {' '}
                  {item.overview}
                </Text>
              </Spoiler>
            </Grid.Col>
          </Grid>

          <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
        </Box>
      ))}
    </Box>
  );
}
