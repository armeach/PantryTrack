  import React from 'react';
  import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';

  import { PantryProvider } from './context/PantryProvider'

  import TitleScreen, { TitleScreenWrapper } from './screens/TitleScreen';
  import HomeScreen, { HomeScreenWrapper } from './screens/HomeScreen';
  import ManagePantryScreen, { ManageScreenWrapper } from './screens/ManagePantryScreen';
  import AddPantryItemScreen, { AddItemScreenWrapper } from './screens/AddPantryItemScreen';
  import ShoppingListScreen, { ShoppingListScreenWrapper } from './screens/ShoppingListScreen';
  import ScanScreen, { ScanScreenWrapper } from './screens/ScanScreen'
import { ShoppingProvider } from './context/ShoppingProvider';

  const Root = createStackNavigator(); 

  export default function App() { 
    return (
      <PantryProvider> 
        <ShoppingProvider>
          <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
              <Root.Screen name='Title' component={TitleScreenWrapper} />
              <Root.Screen name='Home' component={HomeScreenWrapper} />
              <Root.Screen name='Manage' component={ManageScreenWrapper} />
              <Root.Screen name='AddItem' component={AddItemScreenWrapper} />
              <Root.Screen name='ShoppingList' component={ShoppingListScreenWrapper} />
              <Root.Screen name='Scan' component={ScanScreenWrapper} />
            </Root.Navigator>
          </NavigationContainer>
        </ShoppingProvider>
      </PantryProvider>
    );
  };