import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddPurchasedButton({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                underlayColor='lightgray'
                onPress={() => {
                    navigation.pop();
                }}
            >  
                <Text style={styles.text}>
                    Batch Move to Pantry {'\n'} 
                    (not yet working)
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1, 
        margin: 5, 
        padding: 20, 
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'gray',
    },  
    text: {
        textAlign: 'center',
        color: 'white',
    },
});