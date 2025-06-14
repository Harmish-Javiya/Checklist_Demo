import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ChecklistApp from './screens/CheckListAppScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0a0a0a' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name='AddScreen' component={AddScreen} />
          <Stack.Screen name="ChecklistApp" component={ChecklistApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}