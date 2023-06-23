/* eslint-disable no-await-in-loop */
import { Container, Title, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { MediaItemType } from '../Types/types';
import { fetchReleaseDates } from '../pages/api/dicsoverAPI';
import { fetchSpecific } from '../pages/api/mediaDetailsAPI';
import SingleColumnGrid from './Discover/disoverAccordianComponents/singleColumn/singleColumnGrid';
import SingleColumnSkeleton from './Discover/disoverAccordianComponents/singleColumn/singleColumnSkeleton';

export default function DiscoverSpecific(props: {
  mediaType: string;
  title: string;
  params: string;
  pages: number;
  subject: string;
}) {
  const [media, setMedia] = useState<MediaItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllMedia = async () => {
      const mediaData = [];

      // Fetch the first 5 pages of movies
      for (let page = 1; page <= props.pages; page += 1) {
        const mediaPerPage = await fetchSpecific(props.mediaType, page, props.params);

        const mediaWithDetails = await Promise.all(
          mediaPerPage.map(async (pageMedia: { id: number }) => {
            const { certification, runtimeOrEpisodeLength, lastAirDate, revenue } =
              await fetchReleaseDates(props.mediaType, pageMedia.id);

            // Add the certification and runtime/episode length to the media object
            return {
              ...pageMedia,
              certification,
              runtimeOrEpisodeLength,
              lastAirDate,
              revenue,
            };
          })
        );

        mediaData.push(...mediaWithDetails);
      }

      setMedia(mediaData);
      setIsLoading(false);
    };

    fetchAllMedia();
  }, [props.mediaType, props.params, props.pages]);

  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');

  return (
    <Container
      mt="md"
      size="sm"
      // bg="dark.8"
    >
      <Title c="grey.1" fw={desktop ? 500 : 600} size={desktop ? 'h2' : 'h3'} order={1}>
        {props.title}
      </Title>
      <Box mt="xl">
        {isLoading ? (
          <SingleColumnSkeleton />
        ) : (
          <SingleColumnGrid subject={props.subject} mediaType={props.mediaType} items={media} />
        )}
      </Box>
    </Container>
  );
}
