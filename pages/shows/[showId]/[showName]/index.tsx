import { useRouter } from 'next/router';
import MediaDetailsLayout from '../../../../components/mediaDetails.tsx/mediaDetailsLayout';

export default function MediaItem() {
  const router = useRouter();
  const { showId } = router.query;

  return <MediaDetailsLayout mediaType="tv" mediaId={showId as string} />;
}
