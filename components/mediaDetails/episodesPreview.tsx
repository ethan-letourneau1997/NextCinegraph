import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Text,
  SimpleGrid,
  Box,
  AspectRatio,
  // Skeleton,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Image from 'next/image';
import { EpisodeDetails } from '../../Types/types';

import { getHighestRatedEpisode } from '../../pages/api/mediaDetailsAPI';

interface HighlightedEpisodeProps {
  episode: EpisodeDetails;
}

interface EpisodesPreviewProps {
  numSeasons: number;
  lastEp: EpisodeDetails;
}

function HighlightedEpisode({ episode }: HighlightedEpisodeProps) {
  return (
    <Box>
      <SimpleGrid cols={2}>
        <AspectRatio ratio={16 / 9}>
          <Image fill alt="" src={`https://image.tmdb.org/t/p/original${episode.still_path}`} />
          {/* <Skeleton /> */}
        </AspectRatio>
        <Box>
          <Text>{episode.name}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export function EpisodesPreview({ numSeasons, lastEp }: EpisodesPreviewProps) {
  const router = useRouter();
  const { showId } = router.query;

  const theme = useMantineTheme();

  const [topRated, setTopRated] = useState<EpisodeDetails | null>(null);

  useEffect(() => {
    getHighestRatedEpisode(showId, numSeasons)
      .then((episode) => {
        setTopRated(episode); // Episode with the highest vote average
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [showId]);

  return (
    <Box mt={75}>
      <Title
        size="h3"
        pl={8}
        inline
        sx={{
          borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
        }}
      >
        Episodes
      </Title>
      <SimpleGrid cols={2} spacing="md" mt="md">
        <Box>{topRated ? <HighlightedEpisode episode={topRated} /> : null}</Box>
        <Box>{lastEp ? <HighlightedEpisode episode={lastEp} /> : null}</Box>
      </SimpleGrid>
    </Box>
  );
}
