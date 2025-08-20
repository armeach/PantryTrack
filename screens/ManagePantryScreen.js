import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';
import NavBar from '../components/NavBar';

import PantryList from '../components/PantryList';
// import { usePantry } from '../context/PantryProvider';

export default function ManagePantryScreen() {
    return (
        <View>
            <Text style={styles.title}>Modify Pantry</Text>
        </View>
    );
};

export const ManageScreenWrapper = ({ navigation, route }) => {
    const insets = useSafeAreaInsets(); 

    // const { items, addItem, removeItem } = usePantry(); 

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center'}}> 
                {/*Top Content*/}
                <View style={{ flex: 1 }}>
                    <ManagePantryScreen/>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <NavButton title="Add Item to Pantry" destination='AddItem' navigation={navigation} route={route} />
                        <NavButton title="Scan Item" destination='Scan' navigation={navigation} route={route}/>
                    </View>
                    
                    <PantryList/>
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