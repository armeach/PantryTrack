import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TitleScreen({ navigation }) {
    const opacity = useRef(new Animated.Value(1)).current;
    
    useEffect(() => {
        const animation = Animated.loop(
        Animated.sequence([
            Animated.timing(opacity, { toValue: 0.2, duration: 800, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ]));

        animation.start();
    }, [opacity])

    return (
        <ImageBackground
            source={require('../splash.png')}
            style={styles.screen}
            resizeMode='cover'
        >

            <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 200}}>
                <Text style={styles.title}>PantryTrack</Text>
            
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

            </View>

        </ImageBackground>
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
        textShadowColor: '#333', 
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 2, 
    }, 
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold', 
        textShadowColor: '#333', 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 1, 
    },
      button: {
        padding: 40,
        borderRadius: 4, 
    },
});