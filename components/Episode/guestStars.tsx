import { Grid, Flex, Anchor, Box, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { EpisodeDetails } from '../../Types/types';
import { TitleLink } from '../BiteSized/titleLink';

interface GuestStarsProps {
  mobile?: boolean;
  episodeDetails: EpisodeDetails;
}

export function GuestStars({ mobile, episodeDetails }: GuestStarsProps) {
  //* router
  const router = useRouter();

  return (
    <>
      {router.query.showName &&
        episodeDetails.guest_stars &&
        episodeDetails.guest_stars.length > 0 && (
          <TitleLink
            title="Guest Stars"
            linkPath={`/shows/${router.query.showId}/${encodeURIComponent(
              router.query.showName!.toString()
            )}/season/${router.query.seasonNumber}/episode/${router.query.episodeNumber}/cast`}
          />
        )}
      <Grid>
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
                    src={
                      castMember.profile_path
                        ? `https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`
                        : '/person_square_md.png'
                    }
                  />
                </Anchor>

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
