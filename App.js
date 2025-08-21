  import React from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';

  import TitleScreen, { TitleScreenWrapper } from './screens/TitleScreen';
  import AddItem, { AddItemScreenWrapper } from './screens/AddItemScreen';
  import ScanScreen, { ScanScreenWrapper } from './screens/ScanScreen'

  import NavBar from './components/NavBar';

  import { PantryProvider } from './context/PantryProvider';
  import { ShoppingProvider } from './context/ShoppingProvider';

  const Root = createStackNavigator(); 

  export default function App() { 
    return (
      <PantryProvider> 
        <ShoppingProvider>
          <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
              <Root.Screen name='Title' component={TitleScreenWrapper} />
              <Root.Screen name="MainTabs" component={NavBar} />
              <Root.Screen name='AddItem' component={AddItemScreenWrapper} />
              <Root.Screen name='Scan' component={ScanScreenWrapper} />
            </Root.Navigator>
          </NavigationContainer>
        </ShoppingProvider>
      </PantryProvider>
    );
  };