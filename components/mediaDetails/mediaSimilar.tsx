import { useMantineTheme, Box, Group, Title, Grid, AspectRatio, Anchor } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { Similar } from '../../Types/types';

export default function MediaSimilar(props: { similar: Similar; mediaType: string }) {
  const { similar } = props;

  // responsive styles

  const tablet = useMediaQuery('(max-width: 64em)');

  // Sort the similar results by vote_count in descending order
  // similar.results.sort((a, b) => b.vote_count - a.vote_count);

  const theme = useMantineTheme();

  return (
    <Box mt={75}>
      <Group spacing="xs">
        <Title
          c="gray.2"
          size="h3"
          pl={8}
          inline
          sx={{
            borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
          }}
        >
          More Like This
        </Title>
      </Group>
      <Grid pt="md">
        {similar.results &&
          similar.results
            .filter((credit) => credit.original_language === 'en' && credit.poster_path)
            .slice(0, tablet ? 4 : 6)
            .map((credit) => (
              <Grid.Col key={credit.id} span={6} xs={3} md={2}>
                <Anchor
                  component={Link}
                  href={`/${props.mediaType === 'movie' ? 'movies' : 'shows'}/${credit.id}/${
                    credit.title
                      ? encodeURIComponent(credit.title)
                      : encodeURIComponent(credit.name || '')
                  }`}
                  underline={false}
                >
                  <AspectRatio
                    ratio={2 / 3}
                    sx={() => ({
                      border: '.5px solid',
                      borderColor: theme.colors.dark[4],
                      borderRadius: '4px',
                      '&:hover': {
                        color: 'hsl(45, 97%, 54%)',
                        borderColor: 'hsl(45, 97%, 54%)',
                      },
                    })}
                  >
                    <Image
                      style={{
                        borderRadius: '4px',
                      }}
                      fill
                      alt=""
                      src={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w500${credit.poster_path}`
                          : '/media_placeholder_lg.png'
                      }
                    />
                  </AspectRatio>
                </Anchor>

                {/* <Text c="dark.1" fw="500" truncate fz="sm">
                  {" "}
                  {credit.title || credit.name}
                </Text> */}
              </Grid.Col>
            ))}
      </Grid>
    </Box>
  );
}
