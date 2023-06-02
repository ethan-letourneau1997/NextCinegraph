import DiscoverSpecific from '../../components/discoverSpecific';

export default function HighestGrossingMedia() {
  const discoverParams = '&sort_by=revenue.desc';
  return (
    <DiscoverSpecific
      mediaType="movie"
      title="Highest Grossing Movies"
      params={discoverParams}
      pages={1}
      subject="highestGrossing"
    />
  );
}
