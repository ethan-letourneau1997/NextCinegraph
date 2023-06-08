import { useEffect, useState } from 'react';

import { Container } from '@mantine/core';
import MediaGrid from '../../components/mediaGrid';

import { fetchTrending } from '../api/mediaDetailsAPI';
import { MediaItemType } from '../../Types/types';

export default function Trending() {
  const mediaType = 'movie';

  const [movies, setMovies] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="xl">
      <MediaGrid title="Trending Movies" items={movies} />
    </Container>
  );
}
