import React, { PropsWithChildren } from 'react';
import { Box, Space } from '@mantine/core';

import { NavHeader } from '../Nav/navHeader';

export function Layout({ children }: PropsWithChildren) {
  return (
    <Box pb="xl">
      <NavHeader />
      <Space h={62} />

      {children}
    </Box>
  );
}
