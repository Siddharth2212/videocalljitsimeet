import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import VideocallScreen from '../screens/VideocallScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue' },
      }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Call" component={VideocallScreen} />
      </Tab.Navigator>
  );
}
