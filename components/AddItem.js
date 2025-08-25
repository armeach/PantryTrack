import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';
import { categories, autoDetectCategory } from '../utils/categories';
import { getExpirationDate } from '../utils/getExpirationDate.js';

import InteractionStyles from '../styles/InteractionStyles.js';

export function SubmitButton({ handleSubmit, navigation }) {
    return (
        <TouchableHighlight 
            style={InteractionStyles.navButton} 
            underlayColor='lightgray'
            onPress={() => {
                handleSubmit();
                navigation.goBack();
            }}
        >
            <Ionicons name={'checkmark'} size={36} />
        </TouchableHighlight>
    );
};

export default function AddItem({ navigation, route, onSubmitEditing }) {
    const [text, setText] = useState('');
    const [quantity, setQuantity] = useState(''); 
    const [unit, setUnit] = useState('pkgs')
    const [date, setDate] = useState(new Date()); // default to today
    const [showDatePicker, setShowDatePicker] = useState(false);

    const expirationTimes = Array.from({ length: 30 }, (_, i) => (
        { label: String(i+1), value: i+1 }
    ));
    const expirationUnits = [
        { label: 'days', value: 'days' },
        { label: 'weeks', value: 'weeks' },
        { label: 'months' , value: 'months' },
        { label: 'years', value: 'years' },
    ];

    const [expirationTimeOpen, setExpirationTimeOpen] = useState(false);
    const [expirationValue, setExpirationValue] = useState(1);

    const [expirationUnitsOpen, setExpirationUnitsOpen] = useState(false);
    const [expirationUnitsValue, setExpirationUnitsValue] = useState('days');

    const [categoriesOpen, setCategoriesOpen] = useState(false); 
    const [categoryValue, setCategoryValue] = useState('misc.');

    const handleSubmit = () => {
        if (!text) return; 

        onSubmitEditing({
            title: text,
            quantity: quantity || 1,
            unit: unit,
            category: categoryValue,
            dateAdded: date,
            expirationDate: getExpirationDate(date, expirationValue, expirationUnitsValue),
        });

        setText('');
        setQuantity('');
        setUnit('pkgs');
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            
            
            <View style={{ marginBottom: 20 }}>

                {/* Input for Item */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={text}
                        placeholder="Input item..."
                        onChangeText={(val) => {
                            setText(val);
                            setCategoryValue(autoDetectCategory(val));
                        }}
                    />
                </View>

                { /* Input for Quantity */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={quantity}
                        placeholder="Input quantity..."
                        keyboardType="numeric"
                        onChangeText={setQuantity}
                    />
                </View>
                
            </View>

            <View>
                {/* Input for Units */}
                <View style={{ justifyContent: 'center', marginBottom: 60 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Units: </Text>
                    <UnitSelector selectedUnit={unit} setSelectedUnit={setUnit} />
                </View>
            </View>

            <View>
                {/* Input for Category */}
                <View style={{ justifyContent: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20 }}>Category: </Text>
                    <DropDownPicker
                        style={InteractionStyles.dropdownPicker}
                        textStyle={InteractionStyles.dropdownText}
                        dropDownContainerStyle={InteractionStyles.dropdownWindow}
                        open={categoriesOpen}
                        value={categoryValue}
                        items={categories.map(cat => ({ label: cat.label, value: cat.value }))}
                        setOpen={setCategoriesOpen}
                        setValue={setCategoryValue}
                    />
                </View>
            </View>

            {/* Input for Date */}
            <View style={{ justifyContent: 'center', marginBottom: 20}}>
                <Text style={{fontSize: 20}}>Select Date Added:</Text>
                <TouchableOpacity
                    style={InteractionStyles.dateButton}
                    onPress={() => {
                        setShowDatePicker(true);
                    }}
                >
                    <Text style={InteractionStyles.dateButtonText}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                
                {showDatePicker && (
                    <DateSelector 
                        date={date} 
                        setDate={setDate} 
                        setShowDatePicker={setShowDatePicker}
                
                    />
                )}
            </View>

            {/* Input for Expiration */}
            <View style={{ marginBottom: 20}}>
                <Text style={{ fontSize: 20 }}>Expiration:</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <DropDownPicker
                            style={InteractionStyles.dropdownPicker}
                            textStyle={InteractionStyles.dropdownText}
                            dropDownContainerStyle={InteractionStyles.dropdownWindow}
                            open={expirationTimeOpen}
                            value={expirationValue}
                            items={expirationTimes}
                            setOpen={setExpirationTimeOpen}
                            setValue={setExpirationValue}
                        />
                    </View>
                    <View>
                        <DropDownPicker
                            style={InteractionStyles.dropdownPicker}
                            textStyle={InteractionStyles.dropdownText}
                            dropDownContainerStyle={InteractionStyles.dropdownWindow}
                            open={expirationUnitsOpen}
                            value={expirationUnitsValue}
                            items={expirationUnits}
                            setOpen={setExpirationUnitsOpen}
                            setValue={setExpirationUnitsValue}
                        />
                    </View>
                </View>
            </View>

            <View style={{ }}>
                <TouchableHighlight 
                    style={[InteractionStyles.navButton]} 
                    underlayColor='lightgray'
                    onPress={() => {
                        handleSubmit();
                        navigation.goBack();
                    }}
                >
                    <Text style={InteractionStyles.dateButtonText}>Submit</Text>
                </TouchableHighlight>
            </View>

        </View>        
    );
}; 