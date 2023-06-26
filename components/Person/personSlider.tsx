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

export function PersonSlider({ mediaCredits, title, color, size }: MediaSliderProps) {
  // responsive styles
  const mobile = useMediaQuery('(max-width: 48em)');

  const posterSettings = {
    swipeToSlide: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        <Box>
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
    </>
  );
}
