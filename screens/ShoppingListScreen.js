import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';
import NavBar from '../components/NavBar';

import ShoppingList from '../components/ShoppingList';
import AddPurchasedButton from '../components/AddPurchasedButton';

import ScreenStyles from '../styles/ScreenStyles';

export default function ShoppingListScreen({ navigation, route }) {
    const insets = useSafeAreaInsets(); 
    
    return(
        <SafeAreaView style={ScreenStyles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <NavButton title="Add Item to Shopping List" destination="AddItem" navigation={navigation} route={route} params={{ listType: 'shopping' }} />
                    <AddPurchasedButton navigation={navigation} />
                </View>
                <ShoppingList/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
});