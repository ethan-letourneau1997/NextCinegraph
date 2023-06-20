import { Anchor, AspectRatio, Box, Divider, Flex, Grid, Stack, Text, Title } from '@mantine/core';

import { BsFillStarFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';

import { MediaItemType } from '../../Types/types';
import { useStore } from '../../store/store';

export function formatReleaseDate(inputDate: string | undefined) {
  if (!inputDate) {
    return ''; // or handle the undefined case in an appropriate way
  }

  const date = new Date(inputDate);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default function DiscoverGrid(props: { mediaType: string; items: MediaItemType[] }) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');
  const { items } = props;

  const showMeValue = useStore((state) => state.showMeValue);

  return (
    <Box mt="xl">
      <Grid gutter="xl" maw="100%">
        {items.map((item) => (
          <Grid.Col span={12} lg={6} key={item.id}>
            <Grid
              gutter="md"
              // bg="hsl(240, 10%, 7%)"
              sx={{
                borderRadius: '4px',
              }}
            >
              <Grid.Col span="content">
                <Anchor
                  component={Link}
                  href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                    item.title
                      ? encodeURIComponent(item.title)
                      : encodeURIComponent(item.name || '')
                  }`}
                  underline={false}
                >
                  <AspectRatio ratio={2 / 3} miw={desktop ? 100 : 80}>
                    <Image
                      fill
                      style={{
                        borderRadius: '4px',
                      }}
                      alt=""
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                          : '/media_placeholder_md.png'
                      }
                    />
                  </AspectRatio>
                </Anchor>
              </Grid.Col>
              <Grid.Col span="auto">
                <Stack spacing={0}>
                  <Anchor
                    sx={(theme) => ({
                      '&:hover': {
                        textDecorationColor: theme.colors.gray[0],
                      },
                    })}
                    component={Link}
                    href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${item.id}/${
                      item.title
                        ? encodeURIComponent(item.title)
                        : encodeURIComponent(item.name || '')
                    }`}
                  >
                    <Title c="dark.0" size={desktop ? 'h4' : 'h5'} order={2}>
                      {item.title || item.name}
                    </Title>
                  </Anchor>

                  <Flex align="center" gap={7} mt={3}>
                    {showMeValue === 'upcoming' ? null : (
                      <Flex gap={7}>
                        {item.vote_average !== undefined && item.vote_average > 0 && (
                          <Flex align="center" gap={3}>
                            <BsFillStarFill
                              style={{ paddingBottom: 1 }}
                              size={desktop ? 13 : 11}
                              color="#fcc419"
                            />

                            <Text fw={500} c="dark.2" fz={desktop ? 'sm' : 'sm'}>
                              {item.vote_average}
                            </Text>
                          </Flex>
                        )}
                        {item.vote_average && item.vote_average > 0 && (
                          <Text c="dark.2" fz={desktop ? 'sm' : 'sm'}>
                            ·
                          </Text>
                        )}
                        <Text c="dark.2" fw={500} fz={desktop ? 'sm' : 'sm'}>
                          {item.release_date?.substring(0, 4) ||
                            item.first_air_date?.substring(0, 4)}
                          {props.mediaType === 'tv' && item.lastAirDate
                            ? `-${item.lastAirDate.substring(0, 4)}`
                            : null}
                        </Text>
                      </Flex>
                    )}
                    {item.release_date && (
                      <Text c="dark.2" fz={desktop ? 'sm' : 'sm'}>
                        ·
                      </Text>
                    )}
                    {item.first_air_date && (
                      <Text c="dark.2" fz={desktop ? 'sm' : 'sm'}>
                        ·
                      </Text>
                    )}

                    {showMeValue === 'upcoming' && (
                      <Text c="dark.2" fw={500} fz={desktop ? 'sm' : 'sm'}>
                        {formatReleaseDate(item.release_date)}
                      </Text>
                    )}

                    <Text c="dark.2" fw={500} fz={desktop ? 'sm' : 'sm'}>
                      {item.runtimeOrEpisodeLength}
                    </Text>
                    {item.runtimeOrEpisodeLength && (
                      <Text c="dark.2" fz={desktop ? 'sm' : 'sm'}>
                        ·
                      </Text>
                    )}

                    {item.certification && (
                      <Text
                        sx={() => ({
                          border: '1.3px solid #585757',
                          paddingLeft: 6,
                          paddingRight: 6,
                        })}
                        c="dark.2"
                        fw={500}
                        fz={desktop ? 10 : 10}
                      >
                        {item.certification}
                      </Text>
                    )}
                  </Flex>

                  {showMeValue === 'upcoming' ? (
                    <Flex gap={6}>
                      {/* <Text fw={500} fz="sm">
                        In Theatres:
                      </Text> */}
                      {/* <Text fw={500} c="dark.2" fz="sm">
                        {formatReleaseDate(item.release_date)}
                      </Text> */}
                    </Flex>
                  ) : null}
                  <Text
                    lineClamp={desktop ? 3 : 2}
                    fz={desktop ? 'sm' : 'sm'}
                    c="dimmed"
                    mt={desktop ? 'md' : 'xs'}
                    pr={desktop ? 'xl' : 'md'}
                  >
                    {item.overview}
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
