import { Box, RangeSlider, Text } from '@mantine/core';

import { useStore } from '../../../store/store';
import { runtimeMarks } from '../../../data/discoverData';

interface GenreTypes {
  desktop: boolean;
}

export default function Runtime({ desktop }: GenreTypes) {
  const [runtimeValue, setRuntimeValue] = useStore((state) => [
    state.runtimeSliderValue,
    state.updateRuntimeSliderValue,
  ]);
  return (
    <Box>
      <Text fw={desktop ? 300 : 500} fz={desktop ? 'md' : 'md'}>
        Runtime
      </Text>

      <Box mt="sm">
        <RangeSlider
          thumbSize={10}
          showLabelOnHover
          label={(value) => `${value} min`}
          color="yellow.5"
          step={25}
          size="xs"
          min={50}
          max={350}
          value={runtimeValue}
          onChange={setRuntimeValue}
          marks={runtimeMarks}
          styles={(theme) => ({
            label: {
              backgroundColor: theme.colors.dark[8],
            },
            markLabel: {
              marginTop: 3,
              fontSize: theme.fontSizes.xs,
            },
          })}
        />
      </Box>
    </Box>
  );
}
