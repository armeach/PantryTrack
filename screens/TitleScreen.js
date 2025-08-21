import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function TitleScreen({ titleText }) {
    return (
        <View>
            <Text style={styles.title}>{titleText}</Text>
        </View>
    );
};

export const TitleScreenWrapper = ({ navigation }) => {
    const opacity = useRef(new Animated.Value(1)).current;
    
    useEffect(() => {
        const animation = Animated.loop(
        Animated.sequence([
            Animated.timing(opacity, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 1600, useNativeDriver: true }),
        ]));

        animation.start();
    }, [opacity])

    return (
        // <View 
        //     style={styles.screen}
        // >
        <LinearGradient
            style={styles.screen}
            colors={['#40e46fff', '#076e0cff']}
        >
            <TitleScreen titleText="PantryTrack"/>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('MainTabs');
                }}
            >
                <Animated.Text style={[styles.text, { opacity }]}>
                    Tap to Enter
                </Animated.Text>
            </TouchableOpacity>
        </LinearGradient> 
        // </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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