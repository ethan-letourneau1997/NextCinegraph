import { useState, useEffect } from 'react';
import { Box, Image } from '@mantine/core';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Still } from '../../Types/types';

interface EpisodeImagesProps {
  episodeImages: Still[];
}

export function ImagesFromEpisode({ episodeImages }: EpisodeImagesProps) {
  // state to force component re-render when key changes
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Update the key whenever episodeImages change
    setKey((prevKey) => prevKey + 1);
  }, [episodeImages]);

  const backdropSettings = {
    key, // Use the key as a prop to force component re-render

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

  return (
    <Slider {...backdropSettings}>
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
