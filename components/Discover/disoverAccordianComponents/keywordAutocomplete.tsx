import { Autocomplete, AutocompleteItem, UnstyledButton } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useStore } from '../../../store/store';

export default function Keywords() {
  // component states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [keywordSearchResults, setKeywordSearchResults] = useState<AutocompleteItem[]>([]);
  const [keywords, setKeywords] = useState<AutocompleteItem[]>([]);

  // store states
  const [, updateKeywordString] = useStore((state) => [
    state.keywordString,
    state.updateKeywordString,
  ]);

  useEffect(() => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4',
      },
    };

    fetch(`https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1`, options)
      .then((response) => response.json())
      .then((response) => {
        const renamedResults: AutocompleteItem[] = response.results.map(
          (result: AutocompleteItem) => ({
            ...result,
            value: result.name,
          })
        );

        // Filter out results with the same ID as an object in the keywords array
        const filteredResults: AutocompleteItem[] = renamedResults.filter(
          (result) => !keywords.some((keyword) => keyword.id === result.id)
        );

        setKeywordSearchResults(filteredResults);
      })
      .catch((err) => console.error(err));
  }, [searchTerm, keywords]);

  const updateKeywords = (newKeyword: AutocompleteItem) => {
    // Check if the new keyword already exists in the keywords array
    const keywordExists = keywords.some((keyword) => keyword.id === newKeyword.id);

    // If the new keyword doesn't exist, add it to the array
    if (!keywordExists) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
    }
  };

  useEffect(() => {
    updateKeywordString(keywords.map((keyword) => keyword.id).join(','));
  }, [keywords, updateKeywordString]);

  function handleSubmit(item: AutocompleteItem): void {
    updateKeywords(item);
    setSearchTerm('');
  }

  // remove a keyword
  function removeKeyword(id: number): void {
    setKeywords(keywords.filter((keyword) => keyword.id !== id));
  }

  return (
    <div>
      <Autocomplete
        value={searchTerm}
        onItemSubmit={handleSubmit}
        onChange={setSearchTerm}
        label="Keywords"
        placeholder="Type keyword"
        data={keywordSearchResults}
      />

      {keywords.map((keyword) => (
        <div key={keyword.id}>
          <span>{keyword.value}</span>
          <UnstyledButton onClick={() => removeKeyword(keyword.id)}>X</UnstyledButton>
        </div>
      ))}
    </div>
  );
}
