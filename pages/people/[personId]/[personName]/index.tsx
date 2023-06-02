import { Container, Center, Title, Flex, Box, Text, AspectRatio } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PersonDetails, MediaItemType } from '../../../../Types/types';
import { fetchPersonDetails } from '../../../api/mediaItemAPI';

export default function MediaItem() {
  const router = useRouter();
  const { personId } = router.query;

  const [mediaDetails, setMediaDetails] = useState<PersonDetails | null>(null);
  const [crewDepartments, setCrewDepartments] = useState<Record<string, MediaItemType[]>>({});

  type Department =
    | 'Editing'
    | 'Costume & Make-Up'
    | 'Lighting'
    | 'Production'
    | 'Directing'
    | 'Visual Effects'
    | 'Art'
    | 'Sound'
    | 'Camera'
    | 'Actors'
    | 'Writing';

  useEffect(() => {
    if (!personId) {
      return;
    }

    async function fetchDetails() {
      try {
        const id = personId as string;
        const details = await fetchPersonDetails(parseInt(id, 10));
        setMediaDetails(details);

        if (details.combined_credits) {
          const departments: { [key in Department]: any[] } = details.combined_credits.crew.reduce(
            (acc, credit) => {
              const department = credit.department as Department;
              if (!acc[department]) {
                acc[department] = [];
              }
              acc[department].push(credit);
              acc[department].sort((a, b) => {
                const releaseDateA = a.release_date ?? a.first_air_date;
                const releaseDateB = b.release_date ?? b.first_air_date;
                if (!releaseDateA && !releaseDateB) return 0;
                if (!releaseDateA) return 1;
                if (!releaseDateB) return -1;
                const releaseYearA = parseInt(releaseDateA.slice(0, 4), 10);
                const releaseYearB = parseInt(releaseDateB.slice(0, 4), 10);
                return releaseYearB - releaseYearA;
              });
              return acc;
            },
            {} as { [key in Department]: any[] }
          );

          setCrewDepartments(departments);
        } else {
          console.error('details.combined_credits is undefined');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [personId]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

  if (mediaDetails.combined_credits && mediaDetails.combined_credits.cast) {
    mediaDetails.combined_credits.cast.sort((a, b) => {
      const releaseDateA = a.release_date ?? a.first_air_date;
      const releaseDateB = b.release_date ?? b.first_air_date;
      if (!releaseDateA && !releaseDateB) return 0;
      if (!releaseDateA) return 1;
      if (!releaseDateB) return -1;
      const releaseYearA = parseInt(releaseDateA.slice(0, 4), 10);
      const releaseYearB = parseInt(releaseDateB.slice(0, 4), 10);
      return releaseYearB - releaseYearA;
    });
  }

  return (
    <Container>
      <Center>
        <Title>{mediaDetails.name}</Title>
      </Center>
      <Flex mt="xl" gap="xl">
        <AspectRatio ratio={1 / 1} h={250} w={250}>
          <Image
            fill
            src={`https://image.tmdb.org/t/p/original${mediaDetails.profile_path}`}
            alt="alt text"
          />
        </AspectRatio>
        <Text my="auto">{mediaDetails.biography}</Text>
      </Flex>
      <Flex>
        <Box>
          <Title>Actor</Title>
          {mediaDetails.combined_credits &&
            mediaDetails.combined_credits.cast.map((credit) => (
              <div key={credit.id}>
                {credit.title}
                {credit.name} - {credit.character} - {credit.release_date?.slice(0, 4)}
              </div>
            ))}
        </Box>
        <Box>
          {Object.entries(crewDepartments).map(([department, credits]) => (
            <div key={department}>
              <Title>{department}</Title>
              {credits.map((credit) => (
                <div key={credit.id}>
                  {credit.title}
                  {credit.name}- {credit.release_date?.slice(0, 4)}
                  {credit.first_air_date?.slice(0, 4)}
                </div>
              ))}
            </div>
          ))}
        </Box>
      </Flex>
    </Container>
  );
}
