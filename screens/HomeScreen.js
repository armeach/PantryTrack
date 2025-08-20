import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavBar from '../components/NavBar';

import filterItems from '../utils/filterItems';

import PantryList from '../components/PantryList';
import { usePantry } from '../context/PantryProvider'

export default function HomeScreen( { homeText } ) {
    return (
        <View>
            <Text style={styles.title}>{homeText}</Text>
        </View>
    );
};

export const HomeScreenWrapper = ({ navigation, route }) => {
    const insets = useSafeAreaInsets(); 
    const [search, setSearch] = useState('');
    const { items, addItem, removeItem } = usePantry(); 

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}> 
                {/*Top Content*/}
                <View style={{ flex: 1, padding: 20 }}>
                    <HomeScreen homeText='Pantry Contents'/>

                    <TextInput
                        style={styles.input}
                        value={search}
                        placeholder='Search...'
                        onChangeText={setSearch}
                    />
                 
                    <PantryList
                        items={filterItems(items, search)}
                        route = {route}
                        enableSwipe = {false}
                    />
                </View>
                
                {/*Navigation Buttons*/}
                <NavBar navigation={navigation} route={route} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor: '#40e46fff',
    },
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
    input: {
        padding: 10, 
        height: 50,
        fontSize: 20,
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