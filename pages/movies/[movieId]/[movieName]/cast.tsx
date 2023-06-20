import { Anchor, Box, Breadcrumbs } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { FullCastAndCrew } from '../../../../components/CastAndCrew/FullCastAndCrew';

export default function CastAndCrew() {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');

  //* Get query params
  const router = useRouter();

  const moviesLink = '/movies/popular';

  const movieLink = `/movies/${router.query.movieId}/${encodeURIComponent(
    router.query.movieName!.toString()
  )}`;

  const items = [
    { title: 'movies', href: moviesLink, underline: false },
    { title: router.query.movieName, href: movieLink },
    { title: 'cast and crew', href: '#', color: 'gray.2', underline: false },
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
      {desktop && (
        <Breadcrumbs pl="sm" separator={<IconChevronRight size={16} />} ml="xl">
          {items}
        </Breadcrumbs>
      )}
      <FullCastAndCrew mediaType="movie" />
    </Box>
  );
}
