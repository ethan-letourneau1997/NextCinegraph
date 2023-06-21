import {
  Image,
  Box,
  ScrollArea,
  Flex,
  Card,
  Anchor,
  AspectRatio,
  Skeleton,
  Text,
} from '@mantine/core';
import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import { TitleLink } from '../BiteSized/titleLink';
import { Result } from '../../Types/types';

interface MediaSliderProps {
  mediaCredits: Result[];
  title: string;
  titles?: boolean;
  slice?: number;
  width?: number;
  titlePadding?: number;
  color?: string;
  size?: string;
}

export function MediaSlider({
  mediaCredits,
  title,
  titles,
  slice,
  width,
  titlePadding,
  color,
  size,
}: MediaSliderProps) {
  // responsive styles
  const mobile = useMediaQuery('(max-width: 48em)');

  return (
    <Box>
      <TitleLink title={title} bottomSpace color={color} size={size} />
      <ScrollArea offsetScrollbars mt={titlePadding || 0}>
        <Flex gap="sm">
          {mediaCredits &&
            mediaCredits.slice(0, slice || 10).map((known_for_item) => (
              <Box>
                <Card
                  shadow="md"
                  sx={(theme) => ({
                    border: '1px solid transparent',
                    '&:hover': {
                      border: mobile ? '' : `1px solid ${theme.colors.yellow[5]}`,
                      boxSizing: 'content-box',
                    },
                  })}
                >
                  <Card.Section>
                    <Anchor
                      component={Link}
                      href={`/${known_for_item.title ? 'movies' : 'shows'}/${
                        known_for_item.id
                      }/${encodeURIComponent(known_for_item.title || known_for_item.name || '')}`}
                      underline={false}
                    >
                      <AspectRatio
                        ratio={2 / 3}
                        w={width || 120}
                        mih={180}
                        sx={() => ({
                          transition: mobile ? '' : ' 0.3s all ease-in-out',
                          '&:hover': {
                            transform: mobile ? '' : 'scale(1.04)',
                          },
                        })}
                      >
                        <Skeleton />
                        <Image
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
