import { Box, Container } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType } from '../../Types/types';
import { fetchMediaDetails } from '../../pages/api/mediaDetailsAPI';
import BannerImage from './bannerImage';

import { LetterBoxd } from './letterboxd';

interface MediaDetailsLayoutProps {
  mediaType: string;
  mediaId: string;
}

export default function MediaDetailsLayout({ mediaType, mediaId }: MediaDetailsLayoutProps) {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 64em)');

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
      <Container display={tablet ? 'none' : 'block'} size="xl" pos="relative">
        <BannerImage aspectRatio={16 / 5} mediaBackdrop={mediaDetails.backdrop_path} />
      </Container>

      <Container
        pos="relative"
        top={tablet ? 0 : -45}
        size="xl"
        py="xl"
        px={tablet ? 40 : 50}
        sx={{
          zIndex: 700,
        }}
      >
        <LetterBoxd mediaItem={mediaDetails} mediaType={mediaType} />
      </Container>
    </Box>
  );
}
