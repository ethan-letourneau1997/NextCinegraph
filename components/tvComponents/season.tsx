import { Anchor, Box, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { SeasonType } from "../../../types";
import { useRouter } from "next/router";

interface SeasonProps {
  showId: number;
  seasonNumber: number;
  onSeasonChange: (seasonNumber: number) => void;
}

export default function Season(props: SeasonProps) {
  const [season, setSeason] = useState<SeasonType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "0fd7a8764e6522629a3b7e78c452c348";

  const router = useRouter();
  const { showId, showName } = router.query;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${props.seasonNumber}?api_key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data: SeasonType) => {
        setSeason(data);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error(error);
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
      <Anchor component={Link} href="#"></Anchor>

      <Title order={1}>{season.name}</Title>

      <Box>
        {season.episodes &&
          season.episodes.map((episode) => (
            <Box key={episode.id}>
              <Anchor
                component={Link}
                href={{
                  pathname: `/shows/${showId}/${
                    typeof showName === "string"
                      ? encodeURIComponent(showName)
                      : ""
                  }/season/${episode.season_number}/episode/${
                    episode.episode_number
                  }`,
                }}
              >
                {" "}
                {episode.name}
              </Anchor>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
