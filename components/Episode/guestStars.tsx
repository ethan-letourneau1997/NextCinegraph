import { Title, Grid, Flex, Anchor, Box, Text } from '@mantine/core';
import { BsPersonFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { EpisodeDetails } from '../../Types/types';

interface GuestStarsProps {
  mobile?: boolean;
  episodeDetails: EpisodeDetails;
}

export function GuestStars({ mobile, episodeDetails }: GuestStarsProps) {
  return (
    <>
      <Title
        mt={7}
        size={mobile ? 'h4' : 'h3'}
        fw={600}
        pl={8}
        mb="sm"
        inline
        sx={(theme) => ({
          borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
        })}
      >
        Guest Stars
      </Title>
      <Grid mt="xs">
        {episodeDetails.guest_stars &&
          episodeDetails.guest_stars.slice(0, 4).map((castMember) => (
            <Grid.Col key={castMember.id} span={12} xs={6} sm={11} lg={12}>
              <Flex
                gap="sm"
                bg={mobile ? 'dark.9' : 'dark.7'}
                sx={{
                  borderRadius: '4px',
                }}
              >
                {castMember.profile_path ? (
                  <Anchor
                    truncate
                    component={Link}
                    href={`/people/${castMember.id}/${encodeURIComponent(castMember.name || '')}`}
                    underline={false}
                  >
                    <Image
                      style={{
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                      }}
                      height={mobile ? 60 : 80}
                      width={mobile ? 60 : 80}
                      alt=""
                      src={`https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`}
                    />
                  </Anchor>
                ) : (
                  <Box
                    h={mobile ? 60 : 80}
                    w={mobile ? 60 : 80}
                    bg="dark.4"
                    sx={{
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                    }}
                  >
                    <BsPersonFill size={mobile ? 60 : 80} color="#18181B" />
                  </Box>
                )}
                <Box pt={mobile ? 4 : 8}>
                  <Anchor
                    truncate
                    color="gray.4"
                    fz="sm"
                    fw={600}
                    component={Link}
                    href={`/people/${castMember.id}/${encodeURIComponent(castMember.name || '')}`}
                    underline={false}
                  >
                    {castMember.name}
                  </Anchor>
                  <Text lineClamp={2} fz="sm">
                    {castMember.character}
                  </Text>
                </Box>
              </Flex>
            </Grid.Col>
          ))}
      </Grid>
    </>
  );
}
