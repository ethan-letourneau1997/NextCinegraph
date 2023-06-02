export const sortByData = [
  { value: "popularity", label: "popularity" },
  { value: "revenue", label: "revenue" },
  { value: "vote_average", label: "vote average" },
  { value: "vote_count", label: "vote count" },
];

interface Genre {
  label: string;
  value: string;
}

export const movieGenres: Genre[] = [
  { label: "Action", value: "28" },
  { label: "Adventure", value: "12" },
  { label: "Animation", value: "16" },
  { label: "Comedy", value: "35" },
  { label: "Crime", value: "80" },
  { label: "Documentary", value: "99" },
  { label: "Drama", value: "18" },
  { label: "Family", value: "10751" },
  { label: "Fantasy", value: "14" },
  { label: "History", value: "36" },
  { label: "Horror", value: "27" },
  { label: "Music", value: "10402" },
  { label: "Mystery", value: "9648" },
  { label: "Romance", value: "10749" },
  { label: "Science Fiction", value: "878" },
  { label: "TV Movie", value: "10770" },
  { label: "Thriller", value: "53" },
  { label: "War", value: "10752" },
  { label: "Western", value: "37" },
];

export const tvGenres: Genre[] = [
  { label: "Action & Adventure", value: "10759" },
  { label: "Animation", value: "16" },
  { label: "Comedy", value: "35" },
  { label: "Crime", value: "80" },
  { label: "Documentary", value: "99" },
  { label: "Drama", value: "18" },
  { label: "Family", value: "10751" },
  { label: "Kids", value: "10762" },
  { label: "Mystery", value: "9648" },
  { label: "News", value: "10763" },
  { label: "Reality", value: "10764" },
  { label: "Sci-Fi & Fantasy", value: "10765" },
  { label: "Soap", value: "10766" },
  { label: "Talk", value: "10767" },
  { label: "War & Politics", value: "10768" },
  { label: "Western", value: "37" },
];

export const scoreMarks = [
  { value: 0, label: "0" },
  { value: 50, label: "5" },
  { value: 100, label: "10" },
];

export const runtimeMarks = [
  { value: 50, label: "50" },
  { value: 200, label: "200" },
  { value: 350, label: "350" },
];

export const movieCertifications = ["G", "PG", "PG-13", "R", "NC-17", "NR"];

export const tvCertifications = [
  "TV-Y",
  "TV-Y7",
  "TV-G",
  "TV-PG",
  "TV-14",
  "TV-MA",
  "NR",
];
