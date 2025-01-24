import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchInputProps {
  onSubmit: (text: string) => void;
  onChange?: (text: string) => void;
  value?: string;
}

export default function SearchInput({
  onSubmit,
  onChange,
  value
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder="What are you looking for?"
        onSubmitEditing={() => onSubmit(value || '')}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '60%',
    marginRight: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10
  }
});
