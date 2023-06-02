import React, { PropsWithChildren } from 'react';

import { Nav } from '../Nav/nav';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
