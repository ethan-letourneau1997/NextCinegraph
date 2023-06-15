import { Box, ScrollArea, Flex, Card, Anchor, AspectRatio, Skeleton, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { TitleLink } from '../BiteSized/titleLink';
import { Result } from '../../Types/types';

interface MediaSliderProps {
  mediaCredits: Result[];
  title: string;
  titles?: boolean;
  slice?: number;
  width?: number;
}

export function MediaSlider({ mediaCredits, title, titles, slice, width }: MediaSliderProps) {
  return (
    <Box>
      <TitleLink title={title} bottomSpace />
      <ScrollArea offsetScrollbars>
        <Flex gap="sm">
          {mediaCredits &&
            mediaCredits.slice(0, slice || 10).map((known_for_item) => (
              <Box>
                <Card shadow="md">
                  <Card.Section>
                    <Anchor
                      component={Link}
                      href={`/${known_for_item.media_type === 'movie' ? 'movies' : 'shows'}/${
                        known_for_item.id
                      }/${
                        known_for_item.media_type === 'movie'
                          ? encodeURIComponent(known_for_item.title || '')
                          : encodeURIComponent(known_for_item.name || '')
                      }`}
                      underline={false}
                    >
                      <AspectRatio ratio={2 / 3} w={width || 120} mih={180}>
                        <Skeleton />
                        <Image
                          fill
                          alt=""
                          src={
                            known_for_item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${known_for_item.poster_path}`
                              : '/media_placeholder_sm.png'
                          }
                        />
                      </AspectRatio>
                    </Anchor>
                  </Card.Section>
                </Card>
                {titles && (
                  <Text c="dimmed" mt={7} maw={120} truncate fz="sm">
                    {known_for_item.title || known_for_item.name}
                  </Text>
                )}
              </Box>
            ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
}
