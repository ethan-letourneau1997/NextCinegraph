import { Anchor, Flex, ScrollArea, Space, Tabs, Text, Container } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from '@mantine/hooks';
import { SeasonType } from '../../../../Types/types';
import Season from '../../../../components/tvComponents/season';

export default function Seasons() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 600px)');

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

  // const handleSeasonChange = (seasonNumber: number) => {
  //   setCurrentSeason(seasonNumber);
  // };

  // let seasonSelectData: SelectItem[] = [];

  // if (seasons && seasons.length > 0) {
  //   seasonSelectData = seasons.map((season) => ({
  //     value: season.season_number?.toString() ?? '0',
  //     label: `${season.name}`,
  //   }));
  // }

  // seasonSelectData.reverse(); //* reverse the order of seasonSelectData array

  return (
    <div>
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
        <Text pl={7} fz="sm" mt="xs">
          Season
        </Text>
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

      {/* <Select
        data={seasonSelectData}
        value={currentSeason.toString()}
        onChange={(value) => handleSeasonChange(parseInt(value ?? '1', 10))}
      /> */}
      {/*
      {seasons &&
        seasons.map((season) => (
          <Box key={season.id}>
            {currentSeason === season.season_number && (
              <Season seasonNumber={season.season_number} />
            )}
          </Box>
        ))} */}
    </div>
  );
}
