import { Affix, Button, Container, Flex, Text, Title, Transition, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';

import InfiniteScroll from 'react-infinite-scroll-component';
import { IconArrowUp } from '@tabler/icons-react';
import Discover from './discoverAccordian';
import DiscoverGrid from './discoverGrid';
import DiscoverGridLoading from './discoverGridLoading';
import { useStore } from '../../store/store';
import { MediaItemType } from '../../Types/types';
import { movieCertifications } from '../../data/discoverData';
import { fetchDiscover } from '../../pages/api/dicsoverAPI';
import { dateToString } from '../../utils/utils';

interface DiscoverLayoutProps {
  type: string;
  title: string;
}

export default function DiscoverLayout({ type, title }: DiscoverLayoutProps) {
  const [items, setItems] = useState<MediaItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [scroll, scrollTo] = useWindowScroll();

  // responsive styles
  const desktop = useMediaQuery('(min-width: 48em)');

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // * --------------- retrieve states from useStore ----------------------

  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const genres = useStore((state) => state.genres);
  const keywords = useStore((state) => state.keywordString);
  const sortBy = useStore((state) => state.sortBy);
  const providersString = useStore((state) => state.selectedProvidersString);
  const scoreSliderValue = useStore((state) => state.scoreSliderValue);
  const runtimeSliderValue = useStore((state) => state.runtimeSliderValue);

  // * --------------- Certifications (MPAA ratings) ----------------------

  const [certifications] = useState<string[]>(movieCertifications);

  const certificationString = certifications.map((certification) => certification).join('|');

  // * API calls
  useEffect(() => {
    setIsLoading(true);
    setHasMore(true);
    fetchDiscover(
      type,
      sortBy,
      genres.map((genre) => genre).join(', '),
      dateToString(startDate),
      dateToString(endDate),
      (scoreSliderValue[0] / 10).toString(),
      (scoreSliderValue[1] / 10).toString(),
      runtimeSliderValue[0].toString(),
      runtimeSliderValue[1].toString(),
      keywords,
      providersString,
      certificationString,
      1
    )
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    type,
    certificationString,
    setIsLoading,
    startDate,
    endDate,
    genres,
    keywords,
    sortBy,
    providersString,
    scoreSliderValue,
    runtimeSliderValue,
  ]);

  const fetchMoreItems = () => {
    const nextPage = Math.ceil(items.length / 20) + 1; // Adjust the page size as per your API's response

    fetchDiscover(
      type,
      sortBy,
      genres.map((genre) => genre).join(', '),
      dateToString(startDate),
      dateToString(endDate),
      (scoreSliderValue[0] / 10).toString(),
      (scoreSliderValue[1] / 10).toString(),
      runtimeSliderValue[0].toString(),
      runtimeSliderValue[1].toString(),
      keywords,
      providersString,
      certificationString,
      nextPage
    )
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Affix position={{ bottom: rem(10), right: rem(15) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size="1rem" />}
              color="yellow.5"
              fw={800}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              sx={(theme) => ({
                color: theme.colors.dark[9],
              })}
            >
              To Top
            </Button>
          )}
        </Transition>
      </Affix>
      <Flex mt="xl" direction={desktop ? 'row' : 'column'}>
        <Discover type={type} desktop={desktop} />
        <Container
          mt={desktop ? 0 : 'xl'}
          fluid
          size="md"
          px={desktop ? 'xl' : 'xs'}
          sx={{
            flexGrow: 1,
          }}
        >
          <Title size="h2">{title}</Title>
          {isLoading ? (
            <DiscoverGridLoading />
          ) : items.length === 0 ? (
            <Text>No results to display</Text>
          ) : (
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreItems}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>} // Replace with your loading indicator
              endMessage={<Text>No more results to display</Text>} // Replace with your end message
            >
              <DiscoverGrid mediaType={type} items={items} />
            </InfiniteScroll>
          )}
        </Container>
      </Flex>
    </div>
  );
}
