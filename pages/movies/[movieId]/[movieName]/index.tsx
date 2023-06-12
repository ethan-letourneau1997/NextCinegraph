import { useRouter } from 'next/router';
import { Anchor, Box, Breadcrumbs } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import MediaDetailsLayout from '../../../../components/mediaDetails/mediaDetailsLayout';

export default function MediaItem() {
  const router = useRouter();
  const { movieId } = router.query;

  //* Breadcrumbs
  const moviesLink = '/movies/popular';

  const items = [
    { title: 'movies', href: moviesLink, underline: false },

    { title: router.query.movieName, href: '#', color: 'gray.2', underline: false },
  ].map((item, index) => (
    <Anchor
      underline={item.underline}
      c={item.color || 'dimmed'}
      fz="sm"
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box>
      <Breadcrumbs mb="md" separator={<IconChevronRight size={16} />} ml="xl">
        {items}
      </Breadcrumbs>
      <MediaDetailsLayout mediaType="movie" mediaId={movieId as string} />
    </Box>
  );
}
