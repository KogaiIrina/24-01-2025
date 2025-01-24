import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { newsApi } from '@/utils/newsApi';
import { NewsResponse } from '../../../types/news';

interface SearchBarProps {
  onSearchComplete: (response: NewsResponse) => void;
  onSearchStart: () => void;
  onSearchError: (error: string) => void;
  onSearchEnd: () => void;
}

export default function SearchBar({
  onSearchComplete,
  onSearchStart,
  onSearchError,
  onSearchEnd
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    if (!searchText.trim()) {
      onSearchError('Please enter a search term');
      return;
    }

    try {
      onSearchStart();
      const result = await newsApi.searchNews(searchText.trim());
      onSearchComplete(result);
    } catch (err) {
      onSearchError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      onSearchEnd();
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onSubmit={handleSearch}
        />
        <SearchButton onPress={handleSearch} disabled={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },
  loader: {
    marginTop: 10
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  }
});
