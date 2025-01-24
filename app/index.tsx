import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import SearchBar from './components/SearchBar';
import NewsList from './components/News/NewsList';
import { NewsResponse } from '../types/news';

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<NewsResponse | null>(null);

  return (
    <SafeAreaView style={styles.wrapper}>
      <SearchBar
        onSearchComplete={response => {
          console.log('Search results:', response);
          setResults(response);
          setError(null);
        }}
        onSearchStart={() => {
          setIsLoading(true);
          setError(null);
        }}
        onSearchError={err => {
          setError(err);
          setResults(null);
        }}
        onSearchEnd={() => setIsLoading(false)}
      />

      <View style={styles.content}>
        {isLoading && (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#1C70BA" />
          </View>
        )}

        {error && (
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!isLoading && !error && results?.articles && (
          <NewsList articles={results.articles} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  content: {
    flex: 1
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});
