import { Accordion, Box, Divider, Text } from '@mantine/core';

import { BsChevronRight } from 'react-icons/bs';
import DatePickers from './disoverAccordianComponents/datePickers';
import Genres from './disoverAccordianComponents/genreToggles';
import Keywords from './disoverAccordianComponents/keywordAutocomplete';
import Runtime from './disoverAccordianComponents/runtimeSlider';
import { ShowMe } from './disoverAccordianComponents/showMeRadio';
import SortBy from './disoverAccordianComponents/sortBySelect';
import UserScore from './disoverAccordianComponents/userScoreSlider';
import WhereToWatch from './disoverAccordianComponents/whereToWatch';
import { useStore } from '../../store/store';

interface DiscoverPropTypes {
  type: string;

  desktop: boolean;
}

export default function Discover({
  type,

  desktop,
}: DiscoverPropTypes) {
  const isMovie = type === 'movie';

  const showMeValue = useStore((state) => state.showMeValue);

  return (
    <>
      <Box miw={desktop ? 250 : '90vw'} maw={desktop ? 250 : '90vw'} mx={desktop ? 'md' : 0}>
        {desktop !== undefined && (
          <Accordion
            variant="separated"
            chevron={<BsChevronRight size={desktop ? 14 : 12} />}
            defaultValue={desktop ? 'filters' : ''}
            styles={(theme) => ({
              label: {
                paddingTop: desktop ? '' : 12,
                paddingBottom: desktop ? '' : 12,
                fontSize: desktop ? theme.fontSizes.md : theme.fontSizes.md,
              },
              chevron: {
                '&[data-rotate]': {
                  transform: 'rotate(90deg)',
                },
              },
              content: {
                paddingTop: desktop ? '' : 0,
                backgroundColor: theme.colors.dark[8],
                paddingLeft: 0,
                paddingRight: 0,
              },
              control: {
                '&[data-active]': {
                  backgroundColor: theme.colors.dark[8],
                },
              },
            })}
          >
            <Accordion.Item value="sort by">
              <Accordion.Control px="md" disabled={showMeValue !== 'all'}>
                {' '}
                <Text fw={500}>Sort by</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Divider mb={desktop ? 'lg' : 'sm'} />

                <Box px="md">
                  <SortBy desktop={desktop} />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="where to watch">
              <Accordion.Control px="md" disabled={showMeValue !== 'all'}>
                <Text fw={500}>Where to Watch</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Divider mb="lg" />
                <Box px="md">
                  <WhereToWatch desktop={desktop} />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="filters">
              <Accordion.Control px="md">
                <Text fw={500}>Filters</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Divider mb="lg" />
                {isMovie ? (
                  <>
                    <Box px="md">
                      <ShowMe />
                    </Box>

                    <Divider my="lg" />
                  </>
                ) : null}

                <Box px="md">
                  <Keywords />
                </Box>
                <Divider my="lg" />

                <Box px="md">
                  <DatePickers desktop={desktop} />
                </Box>

                <Divider my="lg" />
                <Box px="md">
                  <UserScore desktop={desktop} />
                </Box>

                {isMovie ? (
                  <Box pb="xl">
                    <Divider mb="lg" />
                    <Box px="md">
                      <Runtime desktop={desktop} />
                    </Box>
                  </Box>
                ) : null}
                <Divider my="lg" />

                <Box px="md">
                  <Genres mediaType={type} desktop={desktop} />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Box>
    </>
  );
}
