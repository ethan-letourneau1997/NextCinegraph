import { Box, Button, Flex, Text } from '@mantine/core';

import { useStore } from '../../../store/store';
import { movieGenres, tvGenres } from '../../../data/discoverData';

interface GenresType {
  desktop: boolean;

  mediaType: string;
}

export default function Genres({
  desktop,

  mediaType,
}: GenresType) {
  const isMovie = mediaType === 'movie';
  const genresData = isMovie ? movieGenres : tvGenres;

  const [genres, updateGenres] = useStore((state) => [state.genres, state.updateGenres]);

  const isGenreSelected = (genreId: string) => genres.includes(genreId);

  return (
    <Box>
      <Text fw={desktop ? 300 : 500} fz={desktop ? 'md' : 'md'}>
        Genres
      </Text>
      <Flex mt="sm" wrap="wrap" gap="xs">
        {genresData.map((genre) => (
          <Button
            size="xs"
            radius="xl"
            fw={500}
            fz="sm"
            key={genre.value}
            variant={isGenreSelected(genre.value) ? 'outline' : 'outline'}
            color={isGenreSelected(genre.value) ? 'yellow.5' : 'dark.1'}
            onClick={() => updateGenres(genre.value)}
            sx={() => ({
              '&:hover': {
                color: 'hsl(45, 97%, 54%)',
                borderColor: 'hsl(45, 97%, 54%)',
              },
            })}
            styles={() => ({
              inner: {
                '&:hover': {
                  backgroundColor: 'yellow.5',
                },
              },
              label: {
                color: isGenreSelected(genre.value) ? 'yellow.5' : ' gray.4',
              },
            })}
          >
            {genre.label}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
