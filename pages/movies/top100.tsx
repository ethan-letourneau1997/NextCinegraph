import DiscoverSpecific from '../../components/discoverSpecific';

export default function Top100() {
  const top100Params = '&sort_by=vote_average.desc&vote_count.gte=1000';
  return (
    <DiscoverSpecific
      mediaType="movie"
      title="Top 100 Movies"
      params={top100Params}
      pages={5}
      subject="top100"
    />
  );
}
