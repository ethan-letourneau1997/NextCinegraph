import {
  Anchor,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

import { BsPersonFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';

import { IconChevronRight } from '@tabler/icons';
import { Credits } from '../../Types/types';

interface MediaCreditsProps {
  credits: Credits;
  mediaType: String;
}

export default function MediaCredits({ credits, mediaType }: MediaCreditsProps) {
  const router = useRouter();

  let mediaId: string | string[] | undefined;
  let mediaName: string | string[] | undefined;

  if (mediaType === 'movie') {
    mediaId = router.query.movieId;
    mediaName = router.query.movieName;
  } else if (mediaType === 'tv') {
    mediaId = router.query.showId;
    mediaName = router.query.showName;
  }

  const theme = useMantineTheme();

  // responsive styles
  const desktop = useMediaQuery('(min-width: 950px)');
  const tablet = useMediaQuery('(max-width: 950px)');

  return (
    <Box mt={75}>
      <Group spacing="xs">
        <Divider my={6} size="sm" color={theme.colors.yellow[5]} orientation="vertical" />
        <Anchor
          component={Link}
          href={{
            pathname: `/${mediaType === 'tv' ? 'shows' : 'movies'}/${mediaId}/${
              typeof mediaName === 'string' ? encodeURIComponent(mediaName) : ''
            }/cast`,
          }}
          sx={{
            // change color on hover
            '&:hover': {
              color: theme.colors.yellow[5],
            },
          }}
        >
          <Flex align="center" c="gray.0">
            <Title size="h3">Top Cast</Title>

            <IconChevronRight size={28} style={{ paddingBottom: 1.5 }} />
          </Flex>
        </Anchor>
      </Group>
      <Grid gutter="lg" pt="sm">
        {credits.cast?.slice(0, tablet ? 6 : 12).map((castMember) => (
          <Grid.Col key={castMember.id} span={11} xs={11} sm={6} lg={6}>
            <Grid
              gutter={0}
              maw="100%"
              bg="dark.7"
              w={desktop ? '95%' : '100%'}
              sx={{
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
              }}
            >
              <Grid.Col span="content">
                {castMember.profile_path ? (
                  <Image
                    style={{
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                    }}
                    height={80}
                    width={80}
                    alt=""
                    src={`https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`}
                  />
                ) : (
                  <Box
                    h={80}
                    w={80}
                    bg="dark.4"
                    sx={{
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                    }}
                  >
                    <BsPersonFill size={80} color="#18181B" />
                  </Box>
                )}
              </Grid.Col>
              <Grid.Col pl="xs" span={7} xs={9} pt={8} pos="relative" pr="xs">
                <Anchor
                  component={Link}
                  href={`/people/${castMember.id}/${encodeURIComponent(castMember.name || '')}`}
                  underline={false}
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
              </Grid.Col>
            </Grid>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
