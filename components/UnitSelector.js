import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const units = [
    { label: 'package', value: 'pkgs' }, 
    { label: 'bottles', value: 'bottles' }, 
    { label: 'cans', value: 'cans' },
    { label: 'bags', value: 'bags' },
    { label: 'pounds', value: 'lbs' },
    { label: 'ounces', value: 'ozs' }, 
    {label: 'units', value: 'units' },
];

export default function UnitSelector({ selectedUnit, setSelectedUnit }) {
    const [open, setOpen] = useState(false); 
    
    return (
        <DropDownPicker
            style={styles.dropdown}
            textStyle={styles.text}
            dropDownContainerStyle={styles.dropdownBox}
            open={open}
            value={selectedUnit}
            items={units}
            setOpen={setOpen}
            setValue={setSelectedUnit}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50, 
        width: 200,
        borderWidth: 0,
        backgroundColor: '#40e46fff',
    },
    dropdownBox: {
        borderRadius: 12,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});