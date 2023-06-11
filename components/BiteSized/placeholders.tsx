import { Center, Text } from '@mantine/core';
import { BiCameraMovie } from 'react-icons/bi';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface PlaceholderProps {
  iconSize: number;
}

export function PlaceholderMedia({ iconSize }: PlaceholderProps) {
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

interface MediaPlaceholderProps {
  radius: number;
}

export function MediaPlaceholder({ radius }: MediaPlaceholderProps) {
  const style: CSSProperties = {
    borderRadius: radius,
  };

  return <Image alt="" fill src="/still_placeholder.png" style={style} />;
}
