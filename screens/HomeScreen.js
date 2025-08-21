import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import filterItems from '../utils/filterItems';

import PantryList from '../components/PantryList';
import { usePantry } from '../context/PantryProvider'

import ScreenStyles from '../styles/ScreenStyles';

export default function HomeScreen({ navigation, route })  {
    const insets = useSafeAreaInsets(); 
    const [search, setSearch] = useState('');
    const { items, addItem, removeItem } = usePantry(); 

    return (
        <SafeAreaView style={ScreenStyles.container}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}> 
                
                <View style={styles.searchWrapper}> 
                    <TextInput
                        style={styles.input}
                        value={search}
                        placeholder='Search...'
                        onChangeText={setSearch}
                    />
                </View>
                
                <View style={{ paddingHorizontal: 20 }}>
                    <PantryList
                        items={filterItems(items, search)}
                        route = {route}
                        enableSwipe = {false}
                    />
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
        color: 'black',
        fontWeight: 'bold',
        fontSize: 52,
    },
    searchWrapper: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5, 
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    input: {
        padding: 10, 
        height: 50,
        fontSize: 20,
        textAlign: 'left',
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