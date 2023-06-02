import { useMantineTheme, Box, Group, Divider, Title, Grid, AspectRatio } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { Similar } from '../../Types/types';

export default function MediaSimilar(props: { similar: Similar }) {
  const { similar } = props;

  // responsive styles

  const tablet = useMediaQuery('(max-width: 950px)');

  // Sort the similar results by vote_count in descending order
  // similar.results.sort((a, b) => b.vote_count - a.vote_count);

  const theme = useMantineTheme();

  return (
    <Box mt={75}>
      <Group spacing="xs">
        <Divider my={6} size="sm" color={theme.colors.yellow[5]} orientation="vertical" />
        <Title size="h3">More like this</Title>
      </Group>
      <Grid pt="sm">
        {similar.results &&
          similar.results
            .filter((credit) => credit.original_language === 'en' && credit.poster_path)
            .slice(0, tablet ? 4 : 6)
            .map((credit) => (
              <Grid.Col key={credit.id} span={6} xs={3} md={2}>
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
                    src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                  />
                </AspectRatio>

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
