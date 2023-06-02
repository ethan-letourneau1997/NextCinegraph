import { useRouter } from 'next/router';
import MediaDetailsLayout from '../../../../components/mediaDetails.tsx/mediaDetailsLayout';

export default function MediaItem() {
  const router = useRouter();
  const { movieId } = router.query;

  return <MediaDetailsLayout mediaType="movie" mediaId={movieId as string} />;
}
