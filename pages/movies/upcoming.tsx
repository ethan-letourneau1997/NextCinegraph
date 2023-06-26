import { useEffect, useState } from 'react';

import { useStore } from '../../store/store';
import DiscoverLayout from '../../components/Discover/discoverLayout';

export default function UpcomingMovies() {
  const updateShowMeValue = useStore((state) => state.updateShowMeValue);
  const [isLoading, setIsLoading] = useState(true);

  // set states for Upcoming
  useEffect(() => {
    updateShowMeValue('upcoming'); // Set the showMeValue as "upcoming" when the component renders
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

  return <DiscoverLayout type="movie" title="Upcoming Movies" />;
}
