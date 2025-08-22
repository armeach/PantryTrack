import { useState } from 'react';
import { Text, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import InteractionStyles from '../styles/InteractionStyles';

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
            style={[InteractionStyles.dropdownPicker, { flex: 1 }]}
            textStyle={InteractionStyles.dropdownText}
            dropDownContainerStyle={InteractionStyles.dropdownWindow}
            open={open}
            value={selectedUnit}
            items={units}
            setOpen={setOpen}
            setValue={setSelectedUnit}
        />            
    );
};