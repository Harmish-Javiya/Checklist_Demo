import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChecklistApp from './screens/CheckListAppScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='AddScreen' component={AddScreen} />
        <Stack.Screen name="ChecklistApp" component={ChecklistApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
