import { AspectRatio, Box, Overlay, SimpleGrid, Spoiler, Text, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useElementSize } from '@mantine/hooks';
import { useStore } from '../../../store/store';
import { WatchProvider } from '../../../Types/types';

interface WhereToWatchTypes {
  desktop: boolean;
}

function WhereToWatchSection({ desktop }: WhereToWatchTypes) {
  // height ref for spoiler
  const { ref, height } = useElementSize();

  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const [, updateSelectedProviderString] = useStore((state) => [
    state.selectedProvidersString,
    state.updateSelectedProvidersString,
  ]);

  const handleProviderClick = (providerId: string) => {
    if (selectedProviders.includes(providerId)) {
      // Remove id from providers
      setSelectedProviders(selectedProviders.filter((value) => value !== providerId));
    } else {
      // Add id to providers
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  useEffect(() => {
    updateSelectedProviderString(selectedProviders.map((provider) => provider).join('|'));
  }, [selectedProviders, updateSelectedProviderString]);

  // clear selected providers when "all" is not selected
  const showMeValue = useStore((state) => state.showMeValue);
  useEffect(() => {
    if (showMeValue !== 'all') {
      setSelectedProviders([]);
    }
  }, [showMeValue]);

  useEffect(() => {
    updateSelectedProviderString(selectedProviders.map((provider) => provider).join('|'));
  }, [selectedProviders, updateSelectedProviderString]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=US',
      options
    )
      .then((response) => response.json())
      .then((response) => setProviders(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box>
      <Text fz={desktop ? 'md' : 'md'} mb={desktop ? '' : 'xl'}>
        Sort results by provider:
      </Text>
      <Spoiler
        mt="xs"
        maxHeight={desktop ? 220 : height * 3.6}
        showLabel="See all"
        fz={desktop ? 'md' : 'md'}
        hideLabel="Hide"
        transitionDuration={0}
        styles={() => ({
          control: {},
        })}
        sx={{
          flexGrow: 1,
        }}
      >
        {/* Content here */}
        <SimpleGrid cols={desktop ? 4 : 5} spacing={desktop ? 'xs' : 'md'}>
          {providers.map((provider) => (
            <Tooltip fz="xs" label={provider.provider_name} key={provider.provider_id}>
              <AspectRatio
                // handle provider click and add or remove from selectedProviders
                onClick={() => handleProviderClick(provider.provider_id)}
                ratio={1 / 1}
                sx={{
                  border: selectedProviders.includes(provider.provider_id)
                    ? '2px solid #fcc419'
                    : 'none', // Add border if ID is in state
                  borderRadius: '6px',
                  '&:hover': {
                    border: '2px solid #fcc419',
                  },
                }}
              >
                <Overlay
                  ref={ref}
                  color="#fcc419"
                  sx={{
                    opacity: selectedProviders.includes(provider.provider_id) ? 0.5 : 0, // Add border if ID is in state
                    borderRadius: '6px',
                    '&:hover': {
                      border: '2px solid #fcc419',
                    },
                  }}
                />
                <Image
                  fill
                  style={{
                    borderRadius: '4px',
                  }}
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                />
              </AspectRatio>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Spoiler>
    </Box>
  );
}

export default WhereToWatchSection;
