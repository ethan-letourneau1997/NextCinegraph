import DiscoverSpecific from '../../components/discoverSpecific';

export default function Top100() {
  const top100Params = '&sort_by=vote_average.desc&vote_count.gte=1000';
  return (
    <DiscoverSpecific
      mediaType="tv"
      title="Top 100 Shows"
      params={top100Params}
      pages={5}
      subject="top100"
    />
  );
}
