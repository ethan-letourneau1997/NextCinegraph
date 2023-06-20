import { Box, Flex, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarTime } from '@tabler/icons-react';
import { useStore } from '../../../store/store';

interface CheckBoxTypes {
  desktop: boolean;
}

export default function DatePickers({ desktop }: CheckBoxTypes) {
  const [startDate, setStartDate] = useStore((state) => [state.startDate, state.updateStartDate]);

  const [endDate, setEndDate] = useStore((state) => [state.endDate, state.updateEndDate]);

  const showMeValue = useStore((state) => state.showMeValue);

  return (
    <Box>
      <Text fw={desktop ? 300 : 500} fz={desktop ? 'md' : 'md'}>
        Release Dates
      </Text>
      <Flex mt="sm">
        <Text c="dimmed" fz="sm" w="25%" my="auto">
          From
        </Text>
        <DatePickerInput
          disabled={showMeValue !== 'all'}
          icon={<IconCalendarTime size={16} stroke={1.5} />}
          defaultLevel="decade"
          value={startDate}
          onChange={setStartDate}
          mx="auto"
          styles={(theme) => ({
            label: {
              backgroundColor: theme.colors.dark[8],
            },
            markLabel: {
              fontSize: theme.fontSizes.xs,
            },
          })}
          sx={{
            flexGrow: 1,
          }}
        />
      </Flex>

      <Flex mt="md">
        <Text c="dimmed" fz="sm" w="25%" my="auto">
          To
        </Text>
        <DatePickerInput
          disabled={showMeValue !== 'all'}
          icon={<IconCalendarTime size={16} stroke={1.5} />}
          defaultLevel="year"
          value={endDate}
          onChange={setEndDate}
          mx="auto"
          sx={{
            flexGrow: 1,
          }}
        />
      </Flex>
    </Box>
  );
}
