import { SeasonType } from '../../Types/types';

const apiKey = '0fd7a8764e6522629a3b7e78c452c348';

export const fetchShowData = async (showId: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&append_to_response=seasons, episodes`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch show data.');
  }
  const data = await response.json();
  const filteredSeasons = data.seasons.filter((season: SeasonType) => season.season_number !== 0);
  return filteredSeasons.reverse();
};

export const fetchSeasonDetails = async (showId: number, seasonNumber: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching season details: ', error);
    throw error;
  }
};

// api.js

export const fetchEpisodeDetails = async (
  showId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apiKey}&append_to_response=credits&language=en-US`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching episode details: ', error);
    throw error;
  }
};
