import { useRouter } from 'next/router';
import { Box } from '@mantine/core';
// import { IconChevronRight } from '@tabler/icons-react';
import MediaDetailsLayout from '../../../../components/mediaDetails/mediaDetailsLayout';

export default function MediaItem() {
  const router = useRouter();
  const { showId } = router.query;

  //* Breadcrumbs
  // const showsLink = '/shows/popular';

  // const items = [
  //   { title: 'tv', href: showsLink, underline: false },

  //   { title: router.query.showName, href: '#', color: 'gray.2', underline: false },
  // ].map((item, index) => (
  //   <Anchor
  //     underline={item.underline}
  //     c={item.color || 'dimmed'}
  //     fz="sm"
  //     href={item.href}
  //     key={index}
  //   >
  //     {item.title}
  //   </Anchor>
  // ));

  return (
    <Box>
      {/* <Breadcrumbs mb="md" separator={<IconChevronRight size={16} />} ml="xl">
        {items}
      </Breadcrumbs> */}
      <MediaDetailsLayout mediaType="tv" mediaId={showId as string} />
    </Box>
  );
}
