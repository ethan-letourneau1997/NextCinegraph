export type SearchResults = MediaItemType[];

export interface MediaItemType {
  last_episode_to_air: EpisodeDetails;
  aggregate_credits: Credits;
  number_of_episodes: number;
  recommendations: Similar;
  tagline: string;
  directingCrew?: Crew[];
  budget?: string;
  genres?: Genre[];
  formattedRuntime: string;
  number_of_seasons: number;
  lastAirDate: string;
  runtimeOrEpisodeLength: string;
  certification: string;
  biography?: string;
  id: number;
  adult?: boolean;
  backdrop_path?: string;
  name?: string;
  original_language?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  popularity?: number;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
  credits?: Credits;
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
  known_for?: KnownFor[];
  similar: Similar;
  revenue?: number;
  videos: Videos;
  images: Images;
  created_by?: CreatedBy[];
}

export interface Images {
  backdrops: Backdrop[];
  logos: Logo[];
  posters: Poster[];
}

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Poster {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Videos {
  results: Video[];
}

export interface Video {
  title: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Credits {
  length?: number;
  slice: any;
  cast?: Cast[];
  crew?: Crew[];
  id?: number;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PersonDetails {
  adult?: boolean;
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: any;
  gender?: number;
  homepage?: any;
  id: number;
  imdb_id?: string;
  known_for_department?: string;
  name?: string;
  place_of_birth?: string;
  popularity?: number;
  profile_path?: string;
  combined_credits?: CombinedCredits;
}

export interface CombinedCredits {
  cast: Cast[];
  crew: Crew[];
}

// TV Root
export interface TVRoot {
  adult?: boolean;
  backdrop_path?: string;
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres?: Genre[];
  homepage?: string;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: NextEpisodeToAir;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: SeasonType[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
  credits?: Credits;
  similar?: Similar;
}

export interface CreatedBy {
  id: number;
  credit_id?: string;
  name?: string;
  gender?: number;
  profile_path?: string;
}

export interface Genre {
  id: number;
  name?: string;
}

export interface LastEpisodeToAir {
  id: number;
  name?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  air_date?: string;
  episode_number?: number;
  production_code?: string;
  runtime?: number;
  season_number?: number;
  show_id?: number;
  still_path?: any;
}

export interface NextEpisodeToAir {
  id: number;
  name?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  air_date?: string;
  episode_number?: number;
  production_code?: string;
  runtime?: any;
  season_number?: number;
  show_id?: number;
  still_path?: any;
}

export interface Network {
  id: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}

export interface ProductionCountry {
  iso_3166_1?: string;
  name?: string;
}

export interface SpokenLanguage {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
}

export interface Cast {
  total_episode_count: number;
  roles: Role[];
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  character?: string;
  credit_id?: string;
  order?: number;
  release_date?: string;
  first_air_date?: string;
  title?: string;
}

export interface Role {
  credit_id?: number;
  character?: string;
  episode_count?: number;
}

export interface Similar {
  page?: number;
  results?: Result[];
  total_pages?: number;
  total_results?: number;
}

export interface Result {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  first_air_date?: string;
  release_date?: string;
  name?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface SimilarResult {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
}

export interface Seasons {
  map(arg0: (season: any) => JSX.Element): import('react').ReactNode;
  forEach(arg0: (season: any) => void): unknown;
  seasons?: SeasonType[];
  length: number;
}

export interface SeasonType {
  _id: string;
  air_date?: string;
  episodes?: EpisodeDetails[];
  name?: string;
  overview?: string;
  id: number;
  poster_path?: string;
  season_number: number;
  episode_count: number;
}

export interface EpisodeDetails {
  credits: Credits;
  air_date?: string;
  episode_number?: number;
  id: number;
  name?: string;
  overview?: string;
  production_code?: string;
  runtime?: number;
  season_number?: number;
  show_id?: number;
  still_path?: string;
  vote_average?: number;
  vote_count?: number;
  crew?: Crew[];
  guest_stars?: GuestStar[];
  images?: EpisodeImages;
}

export interface EpisodeImages {
  stills: Still[];
}

export interface Still {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Crew {
  jobs: Job[];
  job?: string;
  department: string;
  credit_id?: string;
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
}

export interface Job {
  credit_id: string;
  episode_count: 43;
  job: string;
}

export interface GuestStar {
  character?: string;
  credit_id?: string;
  order?: number;
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
}

export interface WatchProviders {
  watchProvider?: WatchProvider[];
}

export interface WatchProvider {
  provider_id: string;
  provider_name?: string;
  logo_path?: string;
}

export interface Department {
  department: string;
  jobs: string[];
}
