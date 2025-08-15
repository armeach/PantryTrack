import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TitleScreen({ titleText }) {
    return (
        <View>
            <Text style={styles.title}>{titleText}</Text>
        </View>
    );
};

export const TitleScreenWrapper = ({ navigation }) => (
    <View style={styles.screen}>
        <TitleScreen titleText="PantryTrack" splashText="Tap to Enter"/>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.push('Home');
            }}
        >
            <Text style={styles.text}>Tap to Enter</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
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
      button: {
        padding: 40,
        borderRadius: 4, 
    },
});