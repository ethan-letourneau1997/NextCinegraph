import { MediaItemType } from '../../Types/types';

const TMDB_API_KEY = '0fd7a8764e6522629a3b7e78c452c348';

export const fetchReleaseDates = async (mediaType: string, mediaId: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&append_to_response=release_dates,content_ratings,revenue`
  );
  const data = await response.json();

  let runtimeOrEpisodeLength;

  if (mediaType === 'movie') {
    const runtimeInMinutes = data.runtime;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
    runtimeOrEpisodeLength = `${hours}h ${minutes}m`;
  } else if (mediaType === 'tv') {
    runtimeOrEpisodeLength = `${data.number_of_episodes}eps`;
  }

  // Find the US certification (MPAA rating) for the media
  let certification;
  if (mediaType === 'movie') {
    const usRelease = data.release_dates.results.find(
      (release: any) => release.iso_3166_1 === 'US'
    );
    certification = usRelease?.release_dates.find(
      (date: any) => date.certification !== ''
    )?.certification;
  } else if (mediaType === 'tv') {
    const usRelease = data.content_ratings.results.find(
      (release: any) => release.iso_3166_1 === 'US'
    );
    certification = usRelease?.rating;
  } else {
    certification = '';
  }

  // Find last episode air date
  let lastAirDate;
  if (mediaType === 'tv' && data.last_episode_to_air) {
    lastAirDate = data.last_episode_to_air.air_date;
  } else {
    lastAirDate = '';
  }

  // Fetch revenue data
  let revenue;
  if (mediaType === 'movie' && data.revenue) {
    revenue = data.revenue;
  } else {
    revenue = 0;
  }

  return { certification, runtimeOrEpisodeLength, lastAirDate, revenue };
};

export async function fetchDiscover(
  mediaType: string,
  sortBy: string,
  genres: string,
  startDate: string,
  endDate: string,
  bottomScore: string,
  topScore: string,
  runtimeMin: string,
  runtimeMax: string,
  keywords: string,
  providers: string,
  certifications: string,
  page: number
): Promise<MediaItemType[]> {
  let extras = '';

  if (sortBy === 'vote_average') {
    extras = '&vote_count.gte=3000';
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}${extras}&sort_by=${sortBy}.desc&with_genres=${genres}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&vote_average.gte=${bottomScore}&vote_average.lte=${topScore}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}&air_date.gte=${startDate}&air_date.lte=${endDate}&with_keywords=${keywords}&watch_region=US&with_watch_providers=${providers}&certification=${certifications}&certification_country=US&&with_original_language=en&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  const mediaWithDetails = await Promise.all(
    data.results.map(async (media: { id: number; popularity: number }) => {
      const { certification, runtimeOrEpisodeLength, lastAirDate } = await fetchReleaseDates(
        mediaType,
        media.id
      );

      // Filter out media items with popularity less than 10
      if (media.popularity < 10) {
        return null;
      }

      return {
        ...media,
        certification,
        runtimeOrEpisodeLength,
        lastAirDate,
      };
    })
  );

  // Remove any null values from the filtered media array
  const filteredMedia = mediaWithDetails.filter((media) => media !== null);

  return filteredMedia;
}
