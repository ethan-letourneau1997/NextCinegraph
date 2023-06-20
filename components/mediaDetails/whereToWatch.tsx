import { AspectRatio, Box, Group, Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import Image from 'next/image';

interface WhereToWatchProps {
  providers: Providers;
}

interface Providers {
  flatrate: provider[];
}

interface provider {
  provider_name: string;
  logo_path: string;
}

export function WhereToWatch({ providers }: WhereToWatchProps) {
  // responsive styles
  const mobile = useMediaQuery('(max-width: 30em)');
  return (
    <Box mt="xl">
      <Text c="dimmed" fz={mobile ? 'sm' : 'sm'}>
        Streaming on
      </Text>
      <Group spacing="sm" pt="xs">
        {providers.flatrate.map((provider) => (
          <Tooltip label={provider.provider_name} color="dark">
            <AspectRatio ratio={1 / 1} w={40}>
              <Image
                style={{
                  borderRadius: '4px',
                  filter: 'brightness(90%)',
                }}
                alt="poster"
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                fill
              />
            </AspectRatio>
          </Tooltip>
        ))}
      </Group>
    </Box>
  );
}
