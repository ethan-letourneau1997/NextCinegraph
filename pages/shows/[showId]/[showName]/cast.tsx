import { Anchor, Box, Breadcrumbs, Container } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { FullCastAndCrew } from '../../../../components/CastAndCrew/FullCastAndCrew';

export default function CastAndCrew() {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');

  //* Get query params
  const router = useRouter();

  const showsLink = '/shows/popular';

  const showLink = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}`;

  const items = [
    { title: 'tv', href: showsLink, underline: false },
    { title: router.query.showName, href: showLink },

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
        <Container size="xl" pt="md">
          <Breadcrumbs separator={<IconChevronRight size={16} />}>{items}</Breadcrumbs>
        </Container>
      )}
      <FullCastAndCrew mediaType="tv" />
    </Box>
  );
}
