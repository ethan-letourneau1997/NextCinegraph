import { Center, Text } from '@mantine/core';
import { BiCameraMovie } from 'react-icons/bi';

interface PlaceholderProps {
  iconSize: number;
}

export function PlaceholderMovie({ iconSize }: PlaceholderProps) {
  return (
    <Center
      bg="dark.6"
      sx={{
        borderRadius: '4px',
      }}
    >
      <Text>
        <BiCameraMovie color="#909296" size={iconSize} />
      </Text>
    </Center>
  );
}
