import { Anchor, Box, Card, Image } from '@mantine/core';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from '@mantine/hooks';
import { Result } from '../../Types/types';
import { TitleLink } from '../BiteSized/titleLink';

interface HomeCarouselTypes {
  mediaItems: Result[];
  title: string;
}

export function HomeCarousel({ mediaItems, title }: HomeCarouselTypes) {
  const mobile = useMediaQuery('(max-width: 30em)');
  const posterSettings = {
    swipeToSlide: true,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 7,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1184,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <Box maw="100%" px="md">
      <Box ml="xs">
        <TitleLink title={title} size={mobile ? 'h4' : 'h3'} bottomSpace />
      </Box>
      <Slider {...posterSettings}>
        {mediaItems.length > 4 &&
          mediaItems.map((item: any) => (
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
  );
}
