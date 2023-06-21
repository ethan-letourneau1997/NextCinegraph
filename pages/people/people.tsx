import {
  Anchor,
  AspectRatio,
  Container,
  Grid,
  Skeleton,
  Title,
  Text,
  Card,
  Image,
} from '@mantine/core';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { fetchTrending } from '../api/mediaDetailsAPI';
import { MediaItemType } from '../../Types/types';

export default function People() {
  const mediaType = 'person';

  const [people, setPeople] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="lg">
      <Title mt="xl" size="h2">
        Popular Stars
      </Title>
      <Grid columns={24} gutter="xl" mt="sm">
        {people.map((person) => (
          <Grid.Col span={12} xs={8} sm={6} md={24 / 5} key={person.id}>
            <Card shadow="md" h="100%">
              <Card.Section>
                <Anchor component={Link} href={`/people/${person.id}/${person.name}`}>
                  <AspectRatio ratio={1 / 1} pos="relative">
                    <Skeleton visible />
                    <Image
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w470_and_h470_face${person.profile_path}`
                          : '/person_placeholder_md.png'
                      }
                      alt={person.name ? person.name : 'No name'}
                    />
                  </AspectRatio>
                </Anchor>
              </Card.Section>
              <Card.Section px="xs" pb="xs" pt={5}>
                <Title size="h5">{person.name}</Title>
                <Text fz="sm" truncate>
                  {person.known_for?.map((known_for_item) => (
                    <>{known_for_item.name || known_for_item.title}, </>
                  ))}
                </Text>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
