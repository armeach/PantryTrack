import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';
import NavBar from '../components/NavBar';

import ShoppingList from '../components/ShoppingList';
import AddPurchasedButton from '../components/AddPurchasedButton';

export default function ShoppingListScreen() {
    return (
        <View>
            <Text style={styles.title}>Shopping List</Text>
        </View>

    );
};

export const ShoppingListScreenWrapper = ({ navigation, route }) => {
    const insets = useSafeAreaInsets(); 
    
    return(
        <SafeAreaView style={[styles.container, {paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1 }}>
                <ShoppingListScreen/>
                <View style={{ flexDirection: 'row' }}>
                    <NavButton title="Add Item to Shopping List" destination="AddItem" navigation={navigation} route={route} />
                    <AddPurchasedButton navigation={navigation} />
                </View>
                <ShoppingList/>
            </View>

            {/*Navigation Buttons*/}
            <NavBar navigation={navigation} route={route} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor: '#40e46fff',
    },
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
});