import { useState } from 'react';
import { Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';

import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';

import { categories, autoDetectCategory } from '../utils/categories';
import { getExpirationDate } from '../utils/getExpirationDate.js';

import InteractionStyles from '../styles/InteractionStyles';

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

export default function EditItem({ item, navigation, onSubmitEditing }) {
    const [text, setText] = useState(item.title);
    const [quantity, setQuantity] = useState(item.quantity);
    const [unit, setUnit] = useState(item.unit);
    const [date, setDate] = useState(new Date(item.dateAdded)); 
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [categoriesOpen, setCategoriesOpen] = useState(false); 
    const [categoryValue, setCategoryValue] = useState(item.category);

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
    const [expirationValue, setExpirationValue] = useState(item.expirationValue);

    const [expirationUnitsOpen, setExpirationUnitsOpen] = useState(false);
    const [expirationUnitsValue, setExpirationUnitsValue] = useState(item.expirationUnitsValue);

    const handleSubmit = () => {
        console.log('handleSubmit called');
        if (!text) return;
        
        console.log('onSubmitEditing is:', onSubmitEditing);

        onSubmitEditing({
            title: text,
            quantity: quantity || "1",
            unit: unit,
            category: categoryValue,
            dateAdded: date,
            expirationValue: expirationValue,
            expirationUnitsValue: expirationUnitsValue,
            expirationDate: getExpirationDate(date, expirationValue, expirationUnitsValue),
        });
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            
            <View style={{ marginBottom: 20, alignItems: 'center', paddingHorizontal: 20 }}>

                {/* Edit Item */}
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

                {/* Edit Quantity */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={String(quantity)}
                        placeholder="Input quantity..."
                        keyboardType="numeric"
                        onChangeText={setQuantity}
                    />
                </View>
                
            </View>

            <View>
                {/* Edit Units */}
                <View style={{ justifyContent: 'center', marginBottom: 60, paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Units:</Text>
                    <UnitSelector selectedUnit={unit} setSelectedUnit={setUnit} />
                </View>
            </View>

            <View>
                {/* Edit Category */}
                <View style={{ justifyContent: 'center', marginBottom: 20, paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20 }}> Category:</Text>
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

            <View>
                {/* Edit Date */}
                <View style={{ justifyContent: 'center', marginBottom: 20, paddingHorizontal: 40 }}>
                    <Text style={{fontSize: 20}}>Select Date Added:</Text>
                    <TouchableOpacity
                        style={[InteractionStyles.dateButton, { width: '95%' }]}
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
            </View>

            <View>
                {/* Edit Shelf Life */}
                <View style={{ justifyContent: 'space-between', paddingHorizontal: 20, }}>
                    <Text style={{ fontSize: 20 }}>Shelf Life:</Text>
                    
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        
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
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SubmitButton handleSubmit={handleSubmit} navigation={navigation} />
            </View>

        </View>
    );
};