import { useRouter } from 'next/router';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Container,
  Flex,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { FaChevronLeft } from 'react-icons/fa';
import Season from '../../../../../../components/tvComponents/season';
import { MediaItemType } from '../../../../../../Types/types';

export default function SeasonLayout() {
  // responsive styles
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 600px)');

  const router = useRouter();
  const seasonNumber = parseInt(router.query.seasonNumber!.toString(), 10);
  const { showId, showName } = router.query;

  const [nextSeason, setNextSeason] = useState<boolean>(false);
  const [prevSeason, setPrevSeason] = useState<boolean>(false);

  const apiKey = '0fd7a8764e6522629a3b7e78c452c348';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data: MediaItemType) => {
        if (data && seasonNumber < data.number_of_seasons) {
          setNextSeason(true);
        } else setNextSeason(false);
        if (seasonNumber > 1) {
          setPrevSeason(true);
        } else setPrevSeason(false);
      })
      .catch((errorFetchingData) => {
        console.error(errorFetchingData);
      });
  }, [showId, seasonNumber, apiKey]);

  // breadcrumbs
  const showsLink = '/shows/popular';

  const showLink = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}`;

  const seasonsLink = `/shows/${router.query.showId}/${encodeURIComponent(
    router.query.showName!.toString()
  )}/seasons`;

  const items = [
    { title: 'tv', href: showsLink, underline: false },
    { title: showName, href: showLink },
    { title: 'seasons', href: seasonsLink },
    { title: `season ${seasonNumber}`, href: '#', color: 'gray.2', underline: false },
  ].map((item, index) => (
    <Anchor
      underline={item.underline}
      c={item.color || 'dimmed'}
      fz="sm"
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      {tablet ? (
        <Flex
          sx={{
            position: tablet ? 'static' : 'absolute',
          }}
          bg={tablet ? 'dark.7' : 'transparent'}
          p="xs"
          pl={30}
          pt={tablet ? 'xs' : 0}
        >
          <Anchor
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              color: theme.colors.gray[5],
            })}
            component={Link}
            href={{
              pathname: `/shows/${showId}/${
                typeof showName === 'string' ? encodeURIComponent(showName) : ''
              }/seasons`,
            }}
          >
            <FaChevronLeft size={tablet ? 12 : 14} />
            <Space w={3} />
            <Text fz={mobile ? 'sm' : 'md'}>Back to Seasons</Text>
          </Anchor>
        </Flex>
      ) : (
        <Breadcrumbs separator={<IconChevronRight size={16} />} ml="xl">
          {items}
        </Breadcrumbs>
      )}
      <Container size="md">
        <Flex justify="space-between" mb="xl" mt="sm">
          <Box miw={30}>
            {prevSeason && (
              <Anchor
                underline={false}
                component={Link}
                c="gray.5"
                href={{
                  pathname: `/shows/${showId}/${
                    typeof showName === 'string' ? encodeURIComponent(showName) : ''
                  }/season/${seasonNumber - 1}`,
                }}
              >
                <Center h="100%">
                  <BsChevronLeft size={26} />
                </Center>
              </Anchor>
            )}
          </Box>

          <Box>
            <Text fz={tablet ? 'sm' : 'md'} align="center">
              season
            </Text>
            <Text align="center">{seasonNumber}</Text>
          </Box>

          <Box miw={30}>
            {nextSeason && (
              <Anchor
                underline={false}
                c="gray.5"
                component={Link}
                href={{
                  pathname: `/shows/${showId}/${
                    typeof showName === 'string' ? encodeURIComponent(showName) : ''
                  }/season/${seasonNumber + 1}`,
                }}
              >
                <Center h="100%">
                  <BsChevronRight size={26} />
                </Center>
              </Anchor>
            )}
          </Box>
        </Flex>
        <Title size="h2" mt="sm" mb="md">
          {showName}
        </Title>
        <Season seasonNumber={seasonNumber} />
      </Container>
    </>
  );
}
