import { AspectRatio, BackgroundImage, Box, Group, Skeleton } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import { MediaItemType } from '../../Types/types';

interface BannerImageProps {
  mediaBackdrop: MediaItemType['backdrop_path'];
  aspectRatio: number;
}

// responsive styles

export default function BannerImage({ mediaBackdrop, aspectRatio }: BannerImageProps) {
  const mobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box>
      <AspectRatio ratio={aspectRatio}>
        <Skeleton
          display={mobile ? 'none' : 'block'}
          sx={{
            zIndex: -10,
          }}
        />
        <BackgroundImage
          // sx={{
          //   zIndex: -10,
          // }}
          src={`https://image.tmdb.org/t/p/original${mediaBackdrop}`}
        >
          <Group position="apart" h="100%" w="100%">
            <Box h="100%" w={15} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage: 'linear-gradient(to bottom, #101113, transparent)',
                }}
              />
            </Box>
            <Box h="100%" w={15} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage: 'linear-gradient(to left, #101113, transparent)',
                }}
              />
            </Box>
          </Group>
        </BackgroundImage>
      </AspectRatio>

      <Box pos="relative">
        <Box
          pos="absolute"
          top={-50}
          w="100%"
          h={50}
          sx={{
            backgroundImage: 'linear-gradient(to top, #101113, transparent)',
          }}
        />
      </Box>
    </Box>
  );
}
