import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackButton from '../components/BackButton';

import ScreenStyles from '../styles/ScreenStyles';

export default function ScanScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    
    return (
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View>
                <BackButton navigation={navigation} route={route}/>
            </View>

            <View>
                <Text style={styles.title}>SCANNER WILL GO HERE</Text>
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
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
});