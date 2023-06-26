import { Image, Box, Card, Anchor } from '@mantine/core';
import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import Slider from 'react-slick';
import { TitleLink } from '../BiteSized/titleLink';
import { Result } from '../../Types/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

export function MediaSlider({ mediaCredits, title, color, size }: MediaSliderProps) {
  // responsive styles
  const mobile = useMediaQuery('(max-width: 48em)');

  const posterSettings = {
    swipeToSlide: true,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1184,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <Box maw="100%" className="media-images">
        <Box ml="xs">
          <TitleLink title={title} bottomSpace color={color} size={size} />
        </Box>
        <Slider {...posterSettings}>
          {mediaCredits.length > 4 &&
            mediaCredits.map((item: any) => (
              <Card px={8} py={0} bg="dark.9">
                <Anchor
                  component={Link}
                  href={`/${item.title ? 'movies' : 'shows'}/${item.id}/${encodeURIComponent(
                    item.title || item.name || ''
                  )}`}
                  underline={false}
                  sx={{
                    '&:hover': {
                      opacity: !mobile ? 0.7 : 1,
                      borderRadius: 4,
                    },
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                    alt=""
                    radius="sm"
                  />
                </Anchor>
              </Card>
            ))}
        </Slider>
      </Box>
      {/* <Box>
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
      </Box> */}
    </>
  );
}
