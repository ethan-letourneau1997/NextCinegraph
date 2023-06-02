import { Container } from '@mantine/core';
import { useState, useEffect } from 'react';
import { MediaItemType } from '../../Types/types';
import MediaGrid from '../../components/mediaGrid';
import { fetchTrending } from '../api/mediaItemAPI';

export default function Trending() {
  const mediaType = 'tv';

  const [shows, setShows] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="xl">
      <MediaGrid title="Trending Shows" items={shows} />
    </Container>
  );
}
