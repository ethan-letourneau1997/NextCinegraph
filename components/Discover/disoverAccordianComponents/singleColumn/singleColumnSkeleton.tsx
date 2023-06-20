import { AspectRatio, Box, Divider, Grid, Paper, Skeleton } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

export default function SingleColumnSkeleton() {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');
  return (
    <Box>
      <Grid>
        <Grid.Col span="content" px="sm">
          <Paper shadow="xl">
            <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
              <Skeleton />
            </AspectRatio>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Skeleton mt={desktop ? 12 : 10} height={desktop ? 12 : 10} w="10%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />

          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
        </Grid.Col>
      </Grid>
      <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
      <Grid>
        <Grid.Col span="content" px="sm">
          <Paper shadow="xl">
            <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
              <Skeleton />
            </AspectRatio>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Skeleton mt={desktop ? 12 : 10} height={desktop ? 12 : 10} w="10%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />

          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
        </Grid.Col>
      </Grid>
      <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
      <Grid>
        <Grid.Col span="content" px="sm">
          <Paper shadow="xl">
            <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
              <Skeleton />
            </AspectRatio>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Skeleton mt={desktop ? 12 : 10} height={desktop ? 12 : 10} w="10%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />

          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
        </Grid.Col>
      </Grid>
      <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
      <Grid>
        <Grid.Col span="content" px="sm">
          <Paper shadow="xl">
            <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
              <Skeleton />
            </AspectRatio>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Skeleton mt={desktop ? 12 : 10} height={desktop ? 12 : 10} w="10%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />

          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
        </Grid.Col>
      </Grid>
      <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
      <Grid>
        <Grid.Col span="content" px="sm">
          <Paper shadow="xl">
            <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
              <Skeleton />
            </AspectRatio>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Skeleton mt={desktop ? 12 : 10} height={desktop ? 12 : 10} w="10%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} w="30%" radius="xl" />

          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
          <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
        </Grid.Col>
      </Grid>
      <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
    </Box>
  );
}
