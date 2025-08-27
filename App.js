  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';

  import TitleScreen from './screens/TitleScreen';
  import AddItemScreen from './screens/AddItemScreen';
  import EditItemScreen from './screens/EditItemScreen';
  import ScanScreen from './screens/ScanScreen';

  import NavBar from './components/NavBar';

  import { PantryProvider } from './context/PantryProvider';
  import { ShoppingProvider } from './context/ShoppingProvider';

  import * as NavigationBar from 'expo-navigation-bar';
  NavigationBar.setVisibilityAsync('hidden');

  const Root = createStackNavigator(); 

  // TO CLEAR CACHE
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // AsyncStorage.clear().then(() => console.log('AsyncStorage cleared'));

  export default function App() { 
    return (
      <PantryProvider> 
        <ShoppingProvider>
          <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
              <Root.Screen name='Title' component={TitleScreen} />
              <Root.Screen name="MainTabs" component={NavBar} />
              <Root.Screen name='AddItem' component={AddItemScreen} />
              <Root.Screen name='EditItem' component={EditItemScreen} />
              <Root.Screen name='Scan' component={ScanScreen} />
            </Root.Navigator>
          </NavigationContainer>
        </ShoppingProvider>
      </PantryProvider>
    );
  };