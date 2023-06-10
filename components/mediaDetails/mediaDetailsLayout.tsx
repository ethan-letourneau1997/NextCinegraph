import { Box, Container } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType } from '../../Types/types';
import { fetchMediaDetails } from '../../pages/api/mediaDetailsAPI';
import BannerImage from './bannerImage';
import { MediaCarousel } from './imageCarousels';
import { LetterBoxd } from './letterboxd';
import MediaCredits from './mediaCredits';
import MediaSimilar from './mediaSimilar';
import { EpisodesPreview } from './episodesPreview';

interface MediaDetailsLayoutProps {
  mediaType: string;
  mediaId: string;
}

export default function MediaDetailsLayout({ mediaType, mediaId }: MediaDetailsLayoutProps) {
  // responsive styles

  const mobile = useMediaQuery('(max-width: 500px)');

  const [mediaDetails, setMediaDetails] = useState<MediaItemType | null>(null);

  useEffect(() => {
    if (!mediaId) {
      return;
    }

    async function fetchDetails() {
      try {
        const details = await fetchMediaDetails(mediaType, parseInt(mediaId, 10));
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [mediaId, mediaType]);

  if (!mediaDetails) {
    return null;
  }

  return (
    <Box>
      <Container display={mobile ? 'none' : 'block'}>
        <BannerImage aspectRatio={16 / 7} mediaBackdrop={mediaDetails.backdrop_path} />
      </Container>

      <Container pos="relative" top={mobile ? 0 : -40} py="xl" px={mobile ? 50 : 50}>
        <LetterBoxd mediaItem={mediaDetails} mediaType={mediaType} />
        {/* <ColorBanner items={mediaDetails} mediaType="movie" /> */}
        {mediaType === 'tv' && (
          <EpisodesPreview
            numSeasons={mediaDetails.number_of_seasons}
            lastEp={mediaDetails.last_episode_to_air}
          />
        )}

        {mediaDetails.credits ? (
          <MediaCredits
            credits={mediaType === 'movie' ? mediaDetails.credits : mediaDetails.aggregate_credits}
            mediaType={mediaType}
          />
        ) : null}

        {mediaDetails.images.backdrops.length > 4 && mediaDetails.images.posters.length > 4 ? (
          <MediaCarousel images={mediaDetails.images} />
        ) : null}

        <MediaSimilar mediaType={mediaType} similar={mediaDetails.recommendations} />
      </Container>
    </Box>
  );
}
