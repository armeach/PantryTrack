import { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedPicker from 'react-native-segmented-picker';

import UnitSelector from './UnitSelector';
import DateSelector from './DateSelector';
import BackButton from './BackButton.js';
import SubmitButton from './SubmitButton.js';

import { useAuth } from '../context/AuthProvider';

import { categories, autoDetectCategory } from '../utils/categories';
import { getExpirationDate } from '../utils/getExpirationDate.js';

import useInteractionStyles from '../styles/InteractionStyles.js';
import { useTheme } from '../context/ThemeProvider';

export default function AddItem({ navigation, route, onSubmitEditing, barcode=null, item=null }) {     
    const InteractionStyles = useInteractionStyles(); 
    const theme = useTheme();  

    const [text, setText] = useState(item?.title || '');
    const [brand, setBrand] = useState(item?.brand || '');
    const [quantity, setQuantity] = useState(item?.quantity || ''); 
    const [unit, setUnit] = useState(item?.unit || '')

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date()); // default to today

    const [categoriesOpen, setCategoriesOpen] = useState(false); 
    const [categoryValue, setCategoryValue] = useState(item?.category || 'misc.');

    const expirationTimes = [{ label: 'None', value: null }, ...Array.from({ length: 30 }, (_, i) => (
        { label: String(i+1), value: i+1}
    ))];
    const expirationUnits = [
        { label: 'None', value: null}, 
        { label: 'days', value: 'days' },
        { label: 'weeks', value: 'weeks' },
        { label: 'months' , value: 'months' },
        { label: 'years', value: 'years' },
    ];

    const [expirationTimeOpen, setExpirationTimeOpen] = useState(false);
    const [expirationValue, setExpirationValue] = useState(item?.expirationValue || null);

    const [expirationUnitsOpen, setExpirationUnitsOpen] = useState(false);
    const [expirationUnitsValue, setExpirationUnitsValue] = useState(item?.expirationUnitsValue || null);

    const shelfLifePickerRef = useRef(null);
    const openShelfLifePicker = () => shelfLifePickerRef.current?.show(); 
    const shelfLifeOnConfirm = (selection) => {
        setExpirationValue(selection.col1);
        setExpirationUnitsValue(selection.col2);
    };

    const [barcodeValue, setBarcodeValue] = useState(barcode || null);
    
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState(''); 

    const handleSubmit = () => {
        if (!text) {
            setSnackbarText("Please input item name..."); 
            setSnackbarVisible(true); 
            return false;
        } 

        else {
            // Conditionally calculate expirationDate
            const calculatedExpirationDate = (expirationValue && expirationUnitsValue)
                ? getExpirationDate(date, expirationValue, expirationUnitsValue)
                : null;

            onSubmitEditing({
                title: text,
                brand: brand || null,
                quantity: parseInt(quantity) || 1,
                unit: unit,
                category: categoryValue,
                dateAdded: date,
                expirationValue: expirationValue,
                expirationUnitsValue: expirationUnitsValue,
                expirationDate: calculatedExpirationDate,
                barcode: barcodeValue,
            });
            return true; 
        }
        
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: 20, paddingHorizontal: 10 }}>
                <BackButton navigation={navigation} route={route} />
                <SubmitButton handleSubmit={handleSubmit} navigation={navigation} />
            </View>
            
            <View style={{ marginBottom: 20, alignItems: 'center' }}>

                {/* Input for Item */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={text}
                        placeholder="Input item..."
                        placeholderTextColor={theme.text}
                        onChangeText={(val) => {
                            setText(val);
                            setCategoryValue(autoDetectCategory(val));
                        }}
                    />
                </View>

                {/* Input for Brand */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput 
                        style={InteractionStyles.inputText}
                        value={brand}
                        placeholder="Input brand (optional)..."
                        placeholderTextColor={theme.text}
                        onChangeText={setBrand}
                    />
                </View>

                { /* Input for Quantity */}
                <View style={InteractionStyles.inputWrapper}>
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={quantity}
                        placeholder="Input quantity..."
                        placeholderTextColor={theme.text}
                        keyboardType="numeric"
                        onChangeText={setQuantity}
                    />
                </View>
                
            </View>

            <View>
                {/* Input for Units */}
                <View style={{ justifyContent: 'center', marginBottom: 60, paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Units: </Text>
                    <UnitSelector selectedUnit={unit} setSelectedUnit={setUnit} />
                </View>
            </View>

            <View>
                {/* Input for Category */}
                <View style={{ justifyContent: 'center', marginBottom: 20, paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Category: </Text>
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

            {/* Input for Shelf Life */}
            <View style={{ justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Shelf Life:</Text>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={[InteractionStyles.dateButton, { width: '95%' }]}
                        onPress={openShelfLifePicker}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {expirationValue || 'None'} {expirationUnitsValue}
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
                            toolbarBackgroundColor={theme.secondary}
                            backgroundColor={theme.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Input for Date */}
            <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
                <Text style={{fontSize: 20, marginBottom: 10}}>Select Date Added:</Text>
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

            {/* Notifications */}
            <View>
                <Snackbar
                    style={{ backgroundColor: theme.secondary, borderRadius: 12 }}
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                >
                    {snackbarText}
                </Snackbar>
            </View>

        </View>        
    );
}; 