import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import NavButton from './NavButton';
import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';

export default function AddItem({ navigation, route, onSubmitEditing }) {
    const [text, setText] = useState('');
    const [quantity, setQuantity] = useState(''); 
    const [unit, setUnit] = useState('pkgs')
    const [date, setDate] = useState(new Date()); // default to today
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = () => {
        if (!text) return; 

        onSubmitEditing({
            title: text,
            quantity: quantity || 1,
            unit: unit,
            dateAdded: date,
        });

        setText('');
        setQuantity('');
        setUnit('pkgs');
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
            
            <UnitSelector selectedUnit={unit} setSelectedUnit={setUnit}/>
            
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                    setShowDatePicker(true);
                }}
            >
                <Text style={styles.buttonText}>{date.toISOString().slice(0, 10)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateSelector 
                    date={date} 
                    setDate={setDate} 
                    setShowDatePicker={setShowDatePicker}
                />
            )}

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
    dateButton: {
        height: 50,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 20, 
        textAlign: 'left',
        color: 'black',
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});