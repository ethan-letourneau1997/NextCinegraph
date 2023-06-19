import { AspectRatio, Box, Group, Text, Tooltip } from '@mantine/core';

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
  return (
    <Box mt="xl">
      <Text c="dimmed" fz="sm">
        Streaming on
      </Text>
      <Group spacing="sm" pt="xs">
        {providers.flatrate.map((provider) => (
          <Tooltip label={provider.provider_name} color="dark">
            <AspectRatio
              ratio={1 / 1}
              w={40}
              sx={
                {
                  //   border: '1px solid',
                  //   borderColor: theme.colors.dark[4],
                  //   borderRadius: 4,
                }
              }
            >
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
      {/* <Accordion variant="separated" defaultValue="customization" mt="xl">
        <Accordion.Item bg="dark.7" value="customization">
          <Accordion.Control h={10} fz="xs">
            {' '}
            Where to Watch
          </Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion> */}

      {/* <Title fw={600} size="h5" pt="sm">
        Where to Watch
      </Title> */}
      {/* <Text size="h6" pt="sm">
        Streaming
      </Text>
      <Flex gap="md" mt="xs">
        {providers.flatrate.map((provider) => (
          <AspectRatio
            ratio={1 / 1}
            w={45}
            sx={{
              border: '1px solid',
              borderColor: theme.colors.dark[4],
              borderRadius: 4,
            }}
          >
            <Image
              style={{
                borderRadius: '4px',
              }}
              alt="poster"
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              fill
            />
          </AspectRatio>
        ))}
      </Flex> */}
    </Box>
    // <Card mt="xl" bg="dark.7" shadow="md">
    //   <Card.Section p="xs">
    //     <Spoiler maxHeight={85} showLabel="Show more" hideLabel="Hide" fz="sm">
    //       <Text fz="md">Streaming on</Text>
    //       <Group mt="xs" spacing="sm">
    //         {providers.flatrate.map((provider) => (
    //           <Image
    //             style={{
    //               borderRadius: '4px',
    //             }}
    //             alt="poster"
    //             src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
    //             width={40}
    //             height={40}
    //           />
    //         ))}
    //       </Group>
    //       <Title size="h6" mt="md">
    //         Purchase
    //       </Title>
    //       <Group mt="xs" spacing="xs">
    //         {providers.buy.map((provider) => (
    //           <Image
    //             style={{
    //               borderRadius: '4px',
    //             }}
    //             alt="poster"
    //             src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
    //             width={40}
    //             height={40}
    //           />
    //         ))}
    //       </Group>
    //       <Title size="h6" mt="md">
    //         Rent
    //       </Title>
    //       <Group mt="xs" spacing="xs">
    //         {providers.rent.map((provider) => (
    //           <Image
    //             style={{
    //               borderRadius: '4px',
    //             }}
    //             alt="poster"
    //             src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
    //             width={40}
    //             height={40}
    //           />
    //         ))}
    //       </Group>
    //     </Spoiler>
    //   </Card.Section>
    // </Card>
  );
}
