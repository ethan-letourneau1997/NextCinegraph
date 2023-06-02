import { Box, Checkbox, CheckboxProps, Stack } from '@mantine/core';

import { ImCheckmark } from 'react-icons/im';
import { useStore } from '../../../store/store';

export function ShowMe() {
  const [showMe = '', updateShowMeValue] = useStore((state) => [
    state.showMeValue,
    state.updateShowMeValue,
  ]);

  const handleCheckboxChange = (newValue: string[]) => {
    const updatedValue = newValue.length === 0 ? '' : newValue[newValue.length - 1];
    updateShowMeValue(updatedValue);
  };

  const CheckboxIcon: CheckboxProps['icon'] = ({ className }) => (
    <ImCheckmark color="black" className={className} />
  );

  return (
    <Box>
      <Checkbox.Group value={[showMe]} onChange={handleCheckboxChange}>
        <Stack>
          <Checkbox icon={CheckboxIcon} color="yellow.5" value="all" label="All" />
          <Checkbox icon={CheckboxIcon} color="yellow.5" value="nowPlaying" label="Now Playing" />
          <Checkbox icon={CheckboxIcon} color="yellow.5" value="upcoming" label="Upcoming" />
        </Stack>
      </Checkbox.Group>
    </Box>
  );
}
