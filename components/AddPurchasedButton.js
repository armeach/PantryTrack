import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import InteractionStyles from '../styles/InteractionStyles';

export default function AddPurchasedButton({ icon, navigation }) {
    return (
        <View>
            <TouchableOpacity
                style={InteractionStyles.addItemsButton}
                underlayColor='lightgray'
                onPress={() => {
                    navigation.pop();
                }}
            >  
                {/* <Text style={styles.text}>
                    Batch Move to Pantry {'\n'} 
                    (not yet working)
                </Text> */}
                <Ionicons name={icon} size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
    },
});