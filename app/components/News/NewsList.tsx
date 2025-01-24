import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NewsArticle } from '../../../types/news';
import NewsCard from './NewsCard';

interface NewsListProps {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text>No articles found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => <NewsCard article={item} />}
        keyExtractor={item => item.url}
        contentContainerStyle={styles.list}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  flatList: {
    flex: 1
  },
  list: {
    paddingVertical: 16
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});
