import { BackgroundImage, Box, Center, Flex, Text, Title } from '@mantine/core';
import { MediaItemType } from '../../Types/types';

export default function HomeCard(props: {
  mediaItem: MediaItemType;
  title: string;
  releaseDate?: boolean;
}) {
  return (
    <BackgroundImage
      h="100%"
      radius="lg"
      src={`https://image.tmdb.org/t/p/original${props.mediaItem.backdrop_path}`}
    >
      <Flex h="100%" direction="column" justify="space-between">
        <Box
          px={12}
          py={7}
          h={70}
          display="flex"
          sx={{
            gap: 5,
          }}
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, .8) 0%, transparent 100%)',
            borderRadius: '16px',
          }}
        >
          <Text fw={600} fz="sm">
            {props.mediaItem.title || props.mediaItem.name}
          </Text>
          {props.releaseDate ? (
            <Text fz="sm">
              (
              {props.mediaItem.release_date?.substring(0, 4) ||
                props.mediaItem.first_air_date?.substring(0, 4)}
              )
            </Text>
          ) : null}
        </Box>
        <Box
          p="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, .15)',
            backdropFilter: 'blur(5px)',
            borderRadius: '16px',
          }}
        >
          <Center>
            <Title size="h4">{props.title}</Title>
          </Center>
        </Box>
      </Flex>
    </BackgroundImage>
  );
}
