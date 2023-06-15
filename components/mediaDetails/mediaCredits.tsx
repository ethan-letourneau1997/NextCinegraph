import { Anchor, Box, Card, Flex, Grid, Group, Text, useMantineTheme } from '@mantine/core';

import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';

import { Credits } from '../../Types/types';
import { TitleLink } from '../BiteSized/titleLink';

interface MediaCreditsProps {
  credits: Credits;
  mediaType: String;
}

export default function MediaCredits({ credits, mediaType }: MediaCreditsProps) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 950px)');
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 500px)');

  const router = useRouter();

  const theme = useMantineTheme();

  return (
    <Box>
      <Group spacing="xs">
        <TitleLink
          title="Top Cast"
          linkPath={`/${mediaType === 'tv' ? 'shows' : 'movies'}/${
            router.query.showId || router.query.movieId
          }/${encodeURIComponent(
            router.query.showName?.toString() || router.query.movieName!.toString()
          )}/cast`}
        />
      </Group>
      <Grid gutter="lg" pt="md">
        {credits.cast?.slice(0, tablet ? 6 : 12).map((castMember) => (
          <Grid.Col key={castMember.id} span={12} xs={12} sm={6} lg={6}>
            <Card w={desktop ? '95%' : '100%'} shadow="sm" radius="sm">
              <Card.Section>
                <Flex
                  maw="100%"
                  bg="dark.7"
                  sx={{
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                  }}
                >
                  <Image
                    style={{
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                    }}
                    height={mobile ? 80 : 75}
                    width={mobile ? 80 : 75}
                    alt=""
                    src={
                      castMember.profile_path
                        ? `https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`
                        : '/person_square_sm.png'
                    }
                  />
                  <Box pl="xs" pt={8} pos="relative" pr="xs">
                    <Anchor
                      component={Link}
                      href={`/people/${castMember.id}/${encodeURIComponent(castMember.name || '')}`}
                      underline
                      sx={() => ({
                        textDecorationThickness: 1,
                        '&:hover': {
                          textDecorationColor: theme.colors.dark[0],
                        },
                      })}
                    >
                      {' '}
                      <Text color="gray.4" fz="sm" fw={600} truncate>
                        {castMember.name}
                      </Text>
                    </Anchor>
                    <Text lineClamp={2} fz="sm">
                      {castMember.character}
                    </Text>
                    {castMember.roles?.slice(0, 1).map((role) => (
                      <Flex direction="column" rowGap={0} key={role.credit_id} mr={10} gap="xs">
                        <Box pos="relative">
                          <Text color="gray.5" fz="sm" truncate>
                            {role.character}
                          </Text>
                        </Box>
                        <Box w="fit-content">
                          <Text fz="xs" c="dimmed" fw={300}>
                            {role.episode_count} episodes
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
