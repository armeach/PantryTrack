import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';

import PantryList from '../components/PantryList';

import ScreenStyles from '../styles/ScreenStyles';

export default function ManagePantryScreen({ navigation, route }) {
    const insets = useSafeAreaInsets(); 

    return (
        <SafeAreaView style={ScreenStyles.container}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center'}}> 
                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <NavButton title="Add Item to Pantry" destination='AddItem' navigation={navigation} route={route} params={{ listType: 'pantry' }} />
                        <NavButton title="Scan Item" destination='Scan' navigation={navigation} route={route}/>
                    </View>
                    
                    <PantryList/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40e46fff',
    },  
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
    },
    navButton: {
        padding: 40,
        borderRadius: 4, 
    },
    button: {
        padding: 40, 
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
});