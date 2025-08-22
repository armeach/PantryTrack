import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

import ScreenStyles from '../styles/ScreenStyles';

export default function ScanScreen() {
    return (
        <View>
            <Text style={styles.title}>SCANNER WILL GO HERE</Text>
        </View>
    );
};

export const ScanScreenWrapper = ({ navigation, route }) => {
    return (
        <SafeAreaView style={ScreenStyles.container}>
            {/*Top Content*/}
            <ScanScreen/>
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