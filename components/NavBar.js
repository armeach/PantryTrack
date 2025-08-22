import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ManagePantryScreen from '../screens/ManagePantryScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

const Tab = createBottomTabNavigator();

export default function NavBar({ navigation, route }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Manage Pantry') { 
                        iconName = 'cube-outline';
                    } else if (route.name === 'Shopping List') {
                        iconName = 'cart-outline';
                    };

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                headerShown: false,
                tabBarStyle: styles.tabStyle,
                tabBarActiveTintColor: '#F5F5DC',
                tabBarInactiveTintColor: '#D9D9C6',   
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Manage Pantry" component={ManagePantryScreen} />
            <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({ 
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },  
    tabStyle: {
        backgroundColor: '#8AA29E',
        height: 60,
    },
});