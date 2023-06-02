import { dateToString } from "./format";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowString = dateToString(tomorrow);

const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

export async function fetchTrendingItems() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US&region=US`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchUpcomingMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&page=1&primary_release_date.gte=${tomorrowString}&region=US&sort_by=popularity.desc&with_origin_country=US`
  );
  const data = await response.json();
  return data.results;
}
export async function fetchNowPlaying() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&region=US`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchTopMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&region=US`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchTopTV() {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&region=US`
  );
  const data = await response.json();
  return data.results;
}
