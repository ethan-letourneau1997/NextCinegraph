import React, { PropsWithChildren } from 'react';
import { NavigationLayout } from '../Nav/navigationLayout';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationLayout />
      {children}
    </>
  );
}
