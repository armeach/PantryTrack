import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const units = [
        'pkgs',
        'bottles',
        'cans',
        'bags',
        'lbs',
        'ozs',
        'units',
    ];

export default function UnitSelector({ selectedUnit, setSelectedUnit }) {
    return (
        <Picker
            style={styles.dropdown}
            itemStyle={styles.text}
            selectedValue={selectedUnit}
            onValueChange={(value) => setSelectedUnit(value)}
        >
            {units.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} /> 
            ))}
            {/* <Picker.Item label="Other" value="Other" /> */}
        </Picker>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 75, 
        width: 200,
    },
    text: {
        fontSize: 20,
    },
});