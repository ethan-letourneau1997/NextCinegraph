import { SelectItem, Anchor, Select, Box } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SeasonType } from '../../../../Types/types';
import Season from '../../../../components/tvComponents/season';

export default function Seasons() {
  //* Get query params
  const router = useRouter();
  const { showId, showName } = router.query;

  //* set state for seasons
  const [seasons, setSeasons] = useState<SeasonType[]>([]);

  //* Set current season to the first season
  const [currentSeason, setCurrentSeason] = useState(1);

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
        setSeasons(filteredSeasons.reverse()); //* Reverse the order of seasons array
        setCurrentSeason(filteredSeasons[0].season_number); //* Set current season to the first season
      })
      .catch((error) => console.error(error));
  }, [showId, apiKey]);

  const handleSeasonChange = (seasonNumber: number) => {
    setCurrentSeason(seasonNumber);
  };

  let seasonSelectData: SelectItem[] = [];

  if (seasons && seasons.length > 0) {
    seasonSelectData = seasons.map((season) => ({
      value: season.season_number?.toString() ?? '0',
      label: `${season.name}`,
    }));
  }

  seasonSelectData.reverse(); //* reverse the order of seasonSelectData array

  return (
    <div>
      <Anchor
        component={Link}
        href={{
          pathname: `/shows/${showId}/${
            typeof showName === 'string' ? encodeURIComponent(showName) : ''
          }`,
        }}
      >
        Back to Show
      </Anchor>

      <h2>Seasons:</h2>

      <Select
        data={seasonSelectData}
        value={currentSeason.toString()}
        onChange={(value) => handleSeasonChange(parseInt(value ?? '1', 10))}
      />

      {seasons &&
        seasons.map((season) => (
          <Box key={season.id}>
            {currentSeason === season.season_number && (
              <Season
                showId={Number(showId)}
                seasonNumber={season.season_number}
                onSeasonChange={handleSeasonChange}
              />
            )}
          </Box>
        ))}
    </div>
  );
}
