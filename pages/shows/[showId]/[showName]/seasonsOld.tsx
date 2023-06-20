import {
  Anchor,
  Flex,
  ScrollArea,
  Space,
  Tabs,
  Text,
  Container,
  Title,
  Breadcrumbs,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { SeasonType } from '../../../../Types/types';
import Season from '../../../../components/tvComponents/season';

export default function Seasons() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 64em)');
  const mobile = useMediaQuery('(max-width: 30em)');

  //return to top state

  //* Get query params
  const router = useRouter();
  const { showId, showName } = router.query;

  //* set state for seasons
  const [seasons, setSeasons] = useState<SeasonType[]>([]);

  //* Set current season to the first season
  // const [currentSeason, setCurrentSeason] = useState(1);

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
      .catch((error) => console.error(error));
  }, [showId, apiKey]);

  const showsLink = '/shows/popular';

  const showLink = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}`;

  const test = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}`;

  const items = [
    { title: 'tv', href: showsLink, underline: false },
    { title: showName, href: showLink },
    {
      title: `season ${router.query.seasonNumber}`,
      href: '#',
      color: 'gray.2',
      underline: false,
    },
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

  return (
    <Container fluid p={tablet ? 0 : ''}>
      <Breadcrumbs separator={<IconChevronRight size={16} />} pl="lg">
        {items}
      </Breadcrumbs>
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
            }`,
          }}
        >
          <FaChevronLeft size={tablet ? 12 : 14} />
          <Space w={3} />
          <Text fz={mobile ? 'sm' : 'md'}>{showName}</Text>
        </Anchor>
      </Flex>
      <Container>
        <Title pl={7} size="h5" mt="xs" c="gray.4">
          Season
        </Title>
        <Tabs
          value={router.query.activeTab as string}
          onTabChange={(value) => router.push(`${test}/season/3/episode${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="/1">First tab</Tabs.Tab>
            <Tabs.Tab value="second">Second tab</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Tabs
          pt={6}
          pl="xs"
          defaultValue="1"
          unstyled
          // styles with theme
          styles={(theme) => ({
            root: {
              padding: 0,
              //show select pointer on hover
              '&:hover': {
                cursor: 'pointer',
              },
            },
            tab: {
              height: 40,
              width: 40,
              marginRight: 8,
              color: theme.colors.gray[5],
              paddingBottom: 8,
              backgroundColor: 'transparent',
              border: 'none',
              '&[data-active]': {
                backgroundColor: theme.colors.yellow[5],
                borderRadius: theme.radius.xl,
                color: theme.colors.dark[5],
              },
            },
            tabLabel: {
              fontWeight: 400,

              fontSize: theme.fontSizes.lg,
            },
          })}
        >
          <Tabs.List>
            <ScrollArea scrollbarSize={0}>
              <Flex>
                {seasons &&
                  seasons
                    .filter((season) => season.episode_count > 0)
                    .map((season) => (
                      <Tabs.Tab key={season.id} value={season.season_number.toString()} pt="xs">
                        {season.season_number}
                      </Tabs.Tab>
                    ))}
              </Flex>
            </ScrollArea>
          </Tabs.List>

          {seasons &&
            seasons
              .filter((season) => season.episode_count > 0)
              .map((season) => (
                <Tabs.Panel key={season.id} value={season.season_number.toString()} pt="xs">
                  {season.season_number && <Season seasonNumber={season.season_number} />}
                </Tabs.Panel>
              ))}
        </Tabs>
      </Container>
    </Container>
  );
}
