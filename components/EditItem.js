import { useRef, useState } from 'react';
import { Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedPicker from 'react-native-segmented-picker';

import { Ionicons } from '@expo/vector-icons';

import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';
import BackButton from './BackButton.js';

import { categories, autoDetectCategory } from '../utils/categories';
import { getExpirationDate } from '../utils/getExpirationDate.js';

import InteractionStyles from '../styles/InteractionStyles';

export function SubmitButton({ handleSubmit, navigation }) {
    return (
        <TouchableOpacity 
            style={InteractionStyles.backButton} 
            onPress={() => {
                handleSubmit();
                navigation.goBack();
            }}
        >
            <Ionicons name={'checkmark'} size={36} color='black' />
        </TouchableOpacity>
    );
};

export default function EditItem({ item, navigation, route, onSubmitEditing }) {
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

    const shelfLifePickerRef = useRef(null);
    const openShelfLifePicker = () => shelfLifePickerRef.current?.show(); 
    const shelfLifeOnConfirm = (selection) => {
        setExpirationValue(selection.col1);
        setExpirationUnitsValue(selection.col2);
    };

    const handleSubmit = () => {
        if (!text) return;

        onSubmitEditing({
            id: item.id,
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
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: 20, paddingHorizontal: 10 }}>
                <BackButton navigation={navigation} route={route} />    
                <SubmitButton handleSubmit={handleSubmit} navigation={navigation} />
            </View>


            <View style={{ marginBottom: 20, alignItems: 'center' }}>

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
                    <Text style={{ fontSize: 20, marginBottom: 10 }}> Category:</Text>
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
                {/* <View style={{ justifyContent: 'center', marginBottom: 20, paddingHorizontal: 40 }}>
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
                </View> */}
            </View>

                {/* Edit Shelf Life */}
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 20, }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Shelf Life:</Text>
                
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={[InteractionStyles.dateButton, { width: '95%' }]}
                        onPress={openShelfLifePicker}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {expirationValue} {expirationUnitsValue}
                        </Text>
                        <SegmentedPicker
                            ref={shelfLifePickerRef}
                            onConfirm={shelfLifeOnConfirm}
                            options={[
                                { key: 'col1', items: expirationTimes, flex: 1 },
                                { key: 'col2', items: expirationUnits, flex: 1 },
                            ]}

                            defaultSelections={[
                                {'col1': expirationValue},
                                {'col2': expirationUnitsValue},
                            ]}

                            size={.4}
                            confirmTextColor='white'
                            toolbarBackgroundColor='#8AA29E'
                            backgroundColor='#FFFFFF'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};