// Import Swiper styles

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Group, Image, SegmentedControl, Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';

import Slider from 'react-slick';

import { Poster, Images } from '../../Types/types';
import { TitleLink } from '../BiteSized/titleLink';

type mediaImagesProps = {
  images: Images;
};

export function MediaCarousel({ images }: mediaImagesProps) {
  const [value, setValue] = useState('posters');

  const posterSettings = {
    className: 'slider variable-width',
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const backdropSettings = {
    className: 'slider variable-width',

    infinite: false,

    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<string | null>('posters');

  useEffect(() => {
    if (value === 'posters') {
      setActiveTab('posters');
    } else {
      setActiveTab('backdrops');
    }
  }, [value, images.posters, images.backdrops]);

  return (
    <Box className="media-images">
      <Group spacing="xs" mb="md">
        {/* <Divider my={6} size="sm" color={theme.colors.yellow[5]} orientation="vertical" /> */}
        <Box pl={8}>
          <TitleLink title="Photos" />
        </Box>

        <SegmentedControl
          ml="xl"
          value={value}
          onChange={setValue}
          size="sm"
          data={[
            { label: 'Posters', value: 'posters' },
            { label: 'Backdrops', value: 'backdrops' },
          ]}
        />
      </Group>
      <Tabs keepMounted={false} value={activeTab} onTabChange={setActiveTab}>
        <Tabs.Panel value="posters">
          {' '}
          <Slider {...posterSettings}>
            {images.posters.length > 4 &&
              images.posters.map((posters: Poster) => (
                <Box key={posters.file_path} w="100%">
                  <Box bg="dark.7">
                    <Image
                      height={180}
                      src={`https://image.tmdb.org/t/p/w780${posters.file_path}`}
                      alt=""
                    />
                  </Box>
                </Box>
              ))}
          </Slider>
        </Tabs.Panel>
        <Tabs.Panel value="backdrops">
          <Slider {...backdropSettings}>
            {images.backdrops.length > 4 &&
              images.backdrops.map((posters: Poster) => (
                <Box key={posters.file_path} w="100%">
                  <Box bg="dark.7">
                    <Image
                      height={180}
                      src={`https://image.tmdb.org/t/p/w1280${posters.file_path}`}
                      alt=""
                    />
                  </Box>
                </Box>
              ))}
          </Slider>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
