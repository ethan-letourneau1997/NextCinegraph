import { PersonType } from '../../Types/personTypes';
import { MediaItemType } from '../../Types/types';

const TMDB_API_KEY = '0fd7a8764e6522629a3b7e78c452c348';

// * Fetches trending media items from TMDB API
export async function fetchTrending(mediaType: string): Promise<MediaItemType[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${TMDB_API_KEY}&with_original_language=en`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

// * Fetches popular media items from TMDB API
export async function fetchPopular(mediaType: string): Promise<MediaItemType[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${TMDB_API_KEY}&page=1&with_original_language=en`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

// * Fetches person items from TMDB API
export async function fetchPersonDetails(mediaID: number): Promise<PersonType> {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${mediaID}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=combined_credits,images`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// * Fetches media details from TMDB API
export async function fetchMediaDetails(
  mediaType: string,
  mediaId: number
): Promise<MediaItemType> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=hi,es,vi,ar,he,bn,en,null&append_to_response=credits,similar,seasons,release_dates,recommendations,videos,content_ratings,aggregate_credits,watch/providers`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}/images?api_key=${TMDB_API_KEY}`
  );

  if (!imageResponse.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const imageData = await imageResponse.json();

  if (data) {
    data.images = imageData;
  }

  // Find the US certification (MPAA rating) for the media
  let certification;

  if (mediaType === 'movie') {
    const usRelease = data.release_dates.results.find(
      (release: any) => release.iso_3166_1 === 'US'
    );

    if (usRelease) {
      certification = usRelease.release_dates.find(
        (date: any) => date.certification !== ''
      )?.certification;
    } else {
      const ukRelease = data.release_dates.results.find(
        (release: any) => release.iso_3166_1 === 'GB'
      );

      if (ukRelease) {
        certification = ukRelease.release_dates.find(
          (date: any) => date.certification !== ''
        )?.certification;
      } else {
        certification = '';
      }
    }

    data.certification = certification; // Append certification to data
  } else if (mediaType === 'tv') {
    const usRelease = data.content_ratings.results.find(
      (release: any) => release.iso_3166_1 === 'US'
    );

    if (usRelease) {
      certification = usRelease.rating;
    } else {
      const ukRelease = data.content_ratings.results.find(
        (release: any) => release.iso_3166_1 === 'GB'
      );

      if (ukRelease) {
        certification = ukRelease.rating;
      } else {
        certification = '';
      }
    }

    data.certification = certification; // Append certification to data
  } else {
    certification = '';
    data.certification = certification; // Append certification to data
  }

  let formattedRuntime;

  if (mediaType === 'movie') {
    const runtimeInMinutes = data.runtime;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    formattedRuntime = `${hours}h ${minutes}m`;

    data.formattedRuntime = formattedRuntime; // Append formattedRuntime to data
  } else if (mediaType === 'tv' && data.episode_runtime) {
    formattedRuntime = `${data.episode_runtime}m`;
    data.formattedRuntime = formattedRuntime; // Append formattedRuntime to data
  } else if (mediaType === 'tv' && !data.episode_runtime) {
    formattedRuntime = '60m';
    data.formattedRuntime = formattedRuntime; // Append formattedRuntime to data
  }

  // Find director(s) of the media
  const directingCrew = data.credits.crew.filter(({ job }: { job: string }) => job === 'Director');
  data.directingCrew = directingCrew;

  return data;
}

// * Fetches specific media items from TMDB API
export const fetchSpecific = async (
  mediaType: string,
  page: number,

  params: string
) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=vote_average.desc${params}&with_original_language=en&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    return [];
  }
};

export async function getHighestRatedEpisode(
  showId: string | string[] | undefined,
  numSeasons: number
): Promise<any> {
  let highestRatedEpisode: any = null;
  let highestVoteAverage = 0;

  for (let season = 1; season <= numSeasons; season += 1) {
    const url = `https://api.themoviedb.org/3/tv/${showId}/season/${season}?api_key=${TMDB_API_KEY}`;

    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url);
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();

      const { episodes } = data;

      // Find the episode with the highest vote_average in the current season
      const highestRatedInSeason = episodes.reduce(
        (highest: { vote_average: number }, episode: { vote_average: number }) => {
          if (episode.vote_average > highest.vote_average) {
            return episode;
          }
          return highest;
        }
      );

      // Update highestRatedEpisode if the current season's highest-rated episode has a higher vote_average
      if (highestRatedInSeason.vote_average > highestVoteAverage) {
        highestRatedEpisode = highestRatedInSeason;
        highestVoteAverage = highestRatedInSeason.vote_average;
      }
    } catch (error) {
      console.error(`Error fetching episodes for season ${season}:`, error);
    }
  }

  return highestRatedEpisode;
}

export async function getHighestRatedEpisodes(
  showId: string | string[] | undefined,
  numSeasons: number
): Promise<any[]> {
  const episodes: any[] = [];

  for (let season = 1; season <= numSeasons; season += 1) {
    const url = `https://api.themoviedb.org/3/tv/${showId}/season/${season}?api_key=${TMDB_API_KEY}`;

    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url);
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();

      const { episodes: seasonEpisodes } = data;

      // Push all episodes of the current season into the episodes array
      episodes.push(...seasonEpisodes);
    } catch (error) {
      console.error(`Error fetching episodes for season ${season}:`, error);
    }
  }

  // Sort episodes by highest to lowest vote_average

  episodes.sort((a, b) => b.vote_average - a.vote_average);

  return episodes;
}
