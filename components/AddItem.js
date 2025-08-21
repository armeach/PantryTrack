import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';
import { categories, autoDetectCategory } from '../utils/categories';

const getExpirationDate = (dateAdded, value, unit) => {
    const date = new Date(dateAdded);

    switch(unit) {
        case 'days': 
            date.setDate(date.getDate() + value);
            break;
        case 'weeks': 
            date.setDate(date.getDate() + value*7);
            break;
        case 'months': 
            date.setMonth(date.getMonth() + value); 
            break;
        case 'years': 
            date.setFullYear(date.getFullYear() + value); 
            break; 
    };

    return date;
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
        <View style={{ flex: 1 }}>
            
            <View>
                <TextInput
                    style={styles.input}
                    value={text}
                    placeholder="Input an item"
                    onChangeText={(val) => {
                        setText(val);
                        setCategoryValue(autoDetectCategory(val));
                    }}
                />
                
                <TextInput
                    style={styles.input}
                    value={quantity}
                    placeholder="Input a quantity"
                    keyboardType="numeric"
                    onChangeText={setQuantity}
                />
                <Text style={{ fontSize: 20 }}>Select Units: </Text>
                <UnitSelector selectedUnit={unit} setSelectedUnit={setUnit}/>
                
                <Text style={{ fontSize: 20 }}>Category: </Text>
                <DropDownPicker
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropDownContainerStyle={styles.dropdownBox}
                    open={categoriesOpen}
                    value={categoryValue}
                    items={categories}
                    setOpen={setCategoriesOpen}
                    setValue={setCategoryValue}
                />

                <Text style={{fontSize: 20}}>Select Date Added:</Text>
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
            
            </View>

            <Text style={{ fontSize: 20 }}>Expiration:</Text>

            <View style={{ flexDirection: 'row' }}>
                <View>
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownBox}
                        open={expirationTimeOpen}
                        value={expirationValue}
                        items={expirationTimes}
                        setOpen={setExpirationTimeOpen}
                        setValue={setExpirationValue}
                    />
                </View>
                <View>
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownBox}
                        open={expirationUnitsOpen}
                        value={expirationUnitsValue}
                        items={expirationUnits}
                        setOpen={setExpirationUnitsOpen}
                        setValue={setExpirationUnitsValue}
                    />
                </View>
            </View>

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
                {/* <NavButton title='Cancel' destination='Manage' navigation={navigation} route={route}/> */}
                <TouchableHighlight
                    style={styles.button}
                    underlayColor='lightgray'
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.text}>Cancel</Text>
                </TouchableHighlight>
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
    dropdown: {
        height: 50, 
        width: 200,
        borderWidth: 0,
        backgroundColor: '#40e46fff',
        zIndex: 1000,
    },
    dropdownBox: {
        borderRadius: 12,
        backgroundColor: 'white',
        zIndex: 2000,
    },
    dropdownText : {
        fontSize: 20,
        color: 'black',
    },
});