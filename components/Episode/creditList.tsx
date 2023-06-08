import { Box, Flex, Anchor, Divider, Text } from '@mantine/core';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Cast, Crew } from '../../Types/types';

interface CreditListProps {
  title: string;
  credits: Cast[] | Crew[];
  mobile?: boolean;
}

export const CreditList = ({ title, credits, mobile }: CreditListProps) => {
  if (!credits || credits.length === 0) {
    return null;
  }

  const sliceAmount = mobile ? 2 : 3;

  return (
    <>
      <Box>
        <Flex wrap="wrap">
          <Text fz={mobile ? 'sm' : 'md'} c="gray.1" fw={600} mr="xs">
            {title}
            {
              // !mobile &&
              credits.length > 1 ? 's' : ''
            }
          </Text>

          {credits.slice(0, sliceAmount).map((credit, index) => (
            <Fragment key={credit.id}>
              <Anchor
                fz={mobile ? 'sm' : 'md'}
                truncate
                fw={300}
                component={Link}
                href={`/people/${credit.id}/${encodeURIComponent(credit.name || '')}`}
                underline={false}
              >
                {credit.name}
              </Anchor>
              {index + 1 !== credits.length && index + 1 < sliceAmount ? '\u00A0\u00A0\u00B7' : ''}
              &nbsp;&nbsp;
            </Fragment>
          ))}
        </Flex>
        <Divider my={mobile ? 6 : 'xs'} />
      </Box>
    </>
  );
};
