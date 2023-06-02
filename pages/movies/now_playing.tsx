import { useEffect, useState } from 'react';

import { Container } from '@mantine/core';
import DiscoverLayout from '../../components/Discover/discoverLayout';
import { useStore } from '../../store/store';

export default function NowPlayingMovies() {
  const updateShowMeValue = useStore((state) => state.updateShowMeValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateShowMeValue('nowPlaying'); // Set the showMeValue as "nowPlaying" when the component renders
    useStore.setState({
      genres: [],
      keywordString: '',
      sortBy: 'popularity',
      selectedProvidersString: '',
      scoreSliderValue: [0, 100],
      runtimeSliderValue: [0, 350],
    });

    setIsLoading(false); // Mark the useEffect as finished
  }, [updateShowMeValue]);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while the useEffect is running
  }

  return (
    <Container fluid>
      <DiscoverLayout type="movie" title="In Theaters Now" />
    </Container>
  );
}
