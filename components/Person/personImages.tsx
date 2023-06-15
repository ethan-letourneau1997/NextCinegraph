import { useState, useEffect } from 'react';
import { Box, Image } from '@mantine/core';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PersonImage {
  aspect_ratio: 0.667;
  height: 861;
  iso_639_1: null;
  file_path: '/eOh4ubpOm2Igdg0QH2ghj0mFtC.jpg';
  vote_average: 5.326;
  vote_count: 7;
  width: 574;
}

interface EpisodeImagesProps {
  episodeImages: PersonImage[];
}

export function PersonImages({ episodeImages }: EpisodeImagesProps) {
  // state to force component re-render when key changes
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Update the key whenever episodeImages change
    setKey((prevKey) => prevKey + 1);
  }, [episodeImages]);

  const posterSettings = {
    key, // Use the key as a prop to force component re-render

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

  return (
    <Slider {...posterSettings}>
      {episodeImages.length >= 2 &&
        episodeImages.map((episodeImage) => (
          <Box key={episodeImage.file_path} w="100%">
            <Box bg="dark.7">
              <Image
                height={258}
                alt=""
                src={`https://image.tmdb.org/t/p/w780${episodeImage.file_path}`}
              />
            </Box>
          </Box>
        ))}
    </Slider>
  );
}
