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
  Container,
  Breadcrumbs,
  Title,
  Space,
  Image,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useMediaQuery } from '@mantine/hooks';

import { IconChevronRight } from '@tabler/icons-react';
import { FaChevronLeft } from 'react-icons/fa';
import { Seasons, SeasonType } from '../../../../Types/types';

export default function ShowSeasons() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 30em)');

  const [seasons, setSeasons] = useState<Seasons | null>(null);
  const [error] = useState<string | null>(null);

  const router = useRouter();
  const { showId, showName } = router.query;

  // breadcrumbs
  const showsLink = '/shows/popular';

  const showLink = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}`;

  const items = [
    { title: 'tv', href: showsLink, underline: false },
    { title: showName, href: showLink },
    { title: 'seasons', href: '#', color: 'gray.2', underline: false },
  ].map((item, index) => (
    <Anchor
      underline={item.underline}
      c={item.color || 'dimmed'}
      fz="sm"
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  const apiKey = '0fd7a8764e6522629a3b7e78c452c348';
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&append_to_response=seasons, episodes`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredSeasons = data.seasons.filter(
          (season: SeasonType) => season.season_number !== 0
        ); //* Filter out seasons with season_number equal to 0
        setSeasons(filteredSeasons); //* Reverse the order of seasons array
        // setCurrentSeason(filteredSeasons[0].season_number); //* Set current season to the first season
      })
      .catch(() => console.error(error));
  }, [showId, apiKey]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!seasons) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {tablet ? (
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
              }`,
            }}
          >
            <FaChevronLeft size={tablet ? 12 : 14} />
            <Space w={3} />
            <Text fz={mobile ? 'sm' : 'md'}>{showName}</Text>
          </Anchor>
        </Flex>
      ) : (
        <Container size="xl">
          <Breadcrumbs separator={<IconChevronRight size={16} />} ml="xl" mt="xl">
            {items}
          </Breadcrumbs>
        </Container>
      )}

      <Container size="md">
        <Title align="center" size="h2" mb="xl" mt="md">
          {showName}
        </Title>
        {seasons &&
          seasons.map((season) => (
            <Box key={season.id}>
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
                <Grid.Col span={6} xs={4} sm={4} md={4} lg={4}>
                  <Card shadow="md">
                    <Card.Section>
                      <AspectRatio ratio={tablet ? 2 / 3 : 2 / 3}>
                        <Skeleton />
                        <Anchor
                          sx={{
                            '&:hover': {
                              opacity: !mobile ? 0.7 : 1,
                            },
                          }}
                          component={Link}
                          href={{
                            pathname: `/shows/${showId}/${
                              typeof showName === 'string' ? encodeURIComponent(showName) : ''
                            }`,
                          }}
                        >
                          <Image
                            alt=""
                            src={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                                : '/media_placeholder_lg.png'
                            }
                          />
                        </Anchor>
                      </AspectRatio>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col px="xs" span={14} xs={16} sm={12} lg={14}>
                  <Anchor
                    c="gray.5"
                    component={Link}
                    href={{
                      pathname: `/shows/${showId}/${
                        typeof showName === 'string' ? encodeURIComponent(showName) : ''
                      }/season/${season.season_number}`,
                    }}
                  >
                    <Title size="h4" c="dark.0">
                      &nbsp;{season.name}
                    </Title>
                  </Anchor>

                  <Text pl={5} mt={3} fz="sm" c="dark.1" fw={550}>
                    {season.air_date.substring(0, 4)}
                  </Text>

                  <Box pl={5}>
                    {season.overview ? (
                      <Text lineClamp={3} mt="xs" fz="sm" c="dimmed">
                        {season.overview}
                      </Text>
                    ) : (
                      <Text mt="xs" fz="sm" c="gray.4">
                        No overview available. Try adding one at{' '}
                        <Anchor
                          href="https://www.themoviedb.org/?language=en-US"
                          target="_blank"
                          fw={600}
                          c="#0AB5E0"
                        >
                          TMDB
                        </Anchor>{' '}
                        !
                      </Text>
                    )}
                  </Box>
                </Grid.Col>
                <Grid.Col span={20} sm={16} lg={18}>
                  <Divider mt="md" />
                </Grid.Col>
              </Grid>
            </Box>
          ))}
      </Container>
    </>
  );
}
