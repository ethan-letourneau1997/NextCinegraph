import { useRouter } from 'next/router';
import MediaDetailsLayout from '../../../../components/mediaDetails/mediaDetailsLayout';

export default function MediaItem() {
  const router = useRouter();
  const { showId } = router.query;
  console.log(showId);

  return <MediaDetailsLayout mediaType="tv" mediaId={showId as string} />;
}
