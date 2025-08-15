import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PantryProvider from './components/PantryProvider'

import TitleScreen, { TitleScreenWrapper } from './screens/TitleScreen';
import HomeScreen, { HomeScreenWrapper } from './screens/HomeScreen';
import ManagePantryScreen, { ManageScreenWrapper } from './screens/ManagePantryScreen';
import ScanScreen, { ScanScreenWrapper } from './screens/ScanScreen'

const Root = createStackNavigator(); 

export default function App() { 
  return (
    <PantryProvider> 
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen name='Title' component={TitleScreenWrapper}/>
          <Root.Screen name='Home' component={HomeScreenWrapper}/>
          <Root.Screen name='Manage' component={ManageScreenWrapper}/>
          <Root.Screen name='Scan' component={ScanScreenWrapper}/>
        </Root.Navigator>
      </NavigationContainer>
    </PantryProvider>
  );
};