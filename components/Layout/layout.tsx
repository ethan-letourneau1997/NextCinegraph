import React, { PropsWithChildren } from 'react';
import { Box } from '@mantine/core';
import { NavigationLayout } from '../Nav/navigationLayout';

export function Layout({ children }: PropsWithChildren) {
  return (
    <Box pb="xl">
      <NavigationLayout />
      {children}
    </Box>
  );
}
