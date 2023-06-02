import { Container } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import DiscoverLayout from '../../components/Discover/discoverLayout';

export default function UpcomingMovies() {
  const updateShowMeValue = useStore((state) => state.updateShowMeValue);
  const [isLoading, setIsLoading] = useState(true);

  // set states for Upcoming
  useEffect(() => {
    updateShowMeValue('all'); // Set the showMeValue as "upcoming" when the component renders
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
      <DiscoverLayout type="tv" title="Popular Shows" />
    </Container>
  );
}
