import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

import NavBar from '../components/NavBar';

import PantryList from '../components/PantryList';
import AddItem from '../components/AddItem';
import { actionCreators, reducer, initialState } from '../components/pantry';

export default function ScanScreen() {
    return (
        <View>
            <Text style={styles.title}>SCANNER WILL GO HERE</Text>
        </View>
    );
};

export const ScanScreenWrapper = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/*Top Content*/}
            <ScanScreen/>
            {/*Navigation Buttons*/}
            <NavBar navigation={navigation} route={route}/>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor: 'lightgreen',
    },
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
});