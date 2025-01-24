import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './index';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
