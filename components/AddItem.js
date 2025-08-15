import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import NavButton from '../components/NavButton';

export default function AddItem({ navigation, route, onSubmitEditing }) {
    const [text, setText] = useState('');
    const [quantity, setQuantity] = useState(''); 
    const [quantityUnit, setQuantityUnit] = useState('unit')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // default to today

    const handleSubmit = () => {
        if (!text) return; 

        onSubmitEditing({
            title: text,
            quantity: quantity || 1,
            quantityUnit: quantityUnit,
            dateAdded: date,
        });

        setText('');
        setQuantity('');
        setQuantityUnit('unit');
    };

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={styles.input}
                value={text}
                placeholder="Input an item"
                onChangeText={setText}
            />
            <TextInput
                style={styles.input}
                value={quantity}
                placeholder="Input a quantity"
                keyboardType="numeric"
                onChangeText={setQuantity}
            />
            <TextInput
                style={styles.input}
                value={quantityUnit}
                placeholder="Input unit" // This should be a dropdown long-term
                onChangeText={setQuantityUnit}
            />
            <TextInput
                style={styles.input}
                value={date}
                placeholder="Input date"
                onChangeText={setDate}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableHighlight 
                    style={styles.button} 
                    underlayColor='lightgray'
                    onPress={() => {
                        handleSubmit();
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.text}>Submit</Text>
                </TouchableHighlight>
                <NavButton title='Cancel' destination='Manage' navigation={navigation} route={route}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10, 
        height: 50,
        fontSize: 20,
    },
    button: {
        flex: 1,
        margin: 5,
        padding: 20, 
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});