import { Box, RangeSlider, Text } from '@mantine/core';

import { useStore } from '../../../store/store';
import { scoreMarks } from '../../../data/discoverData';

interface UserScoreTypes {
  desktop: boolean;
}

export default function UserScore({ desktop }: UserScoreTypes) {
  const [scoreValue, setScoreValue] = useStore((state) => [
    state.scoreSliderValue,
    state.updateScoreSlidertValue,
  ]);

  return (
    <Box pb="md">
      {' '}
      <Text fw={desktop ? 300 : 500} fz={desktop ? 'md' : 'md'}>
        User Score
      </Text>
      <Box mb="xl" mt="sm">
        <RangeSlider
          thumbSize={12}
          label={(value) => `${value / 10}`}
          color="yellow.5"
          size="xs"
          step={10}
          min={0}
          max={100}
          value={scoreValue}
          onChange={setScoreValue}
          onChangeEnd={setScoreValue}
          marks={scoreMarks}
          styles={(theme) => ({
            label: {
              backgroundColor: theme.colors.brand[8],
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
