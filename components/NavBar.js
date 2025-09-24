import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

import { useTheme } from '../context/ThemeProvider';

const Tab = createBottomTabNavigator();

export default function NavBar({ navigation, route }) {
    const theme = useTheme(); 

    const styles = StyleSheet.create({ 
        buttonView: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },  
        tabStyle: {
            backgroundColor: theme.navBar,
            height: 60,
        },
    });

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Pantry') { 
                        iconName = 'cube-outline';
                    } else if (route.name === 'Shopping List') {
                        iconName = 'cart-outline';
                    };

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                headerShown: false,
                tabBarStyle: styles.tabStyle,
                tabBarActiveTintColor: theme.navBarActiveColor,
                tabBarInactiveTintColor: theme.navBarInactiveColor,   
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Pantry" component={PantryScreen} />
            <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
        </Tab.Navigator>
    );
}; 