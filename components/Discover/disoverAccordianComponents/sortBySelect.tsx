import { Select } from '@mantine/core';
import { sortByData } from '../../../data/discoverData';
import { useStore } from '../../../store/store';

interface SortByProps {
  desktop: boolean;
}

export default function SortBy({ desktop }: SortByProps) {
  const sortBy = useStore((state) => state.sortBy);
  const updateSortBy = useStore((state) => state.updateSortBy);

  const handleSortByChange = (value: string) => {
    updateSortBy(value ?? '');
  };

  return (
    <Select
      label="Sort Results By"
      size={desktop ? 'sm' : 'sm'}
      defaultValue="popularity"
      placeholder="Pick one"
      value={sortBy}
      onChange={handleSortByChange}
      data={sortByData}
      styles={(theme) => ({
        label: {
          fontSize: desktop ? theme.fontSizes.md : theme.fontSizes.md,
          fontWeight: 300,
          marginBottom: 8,
        },
      })}
    />
  );
}
