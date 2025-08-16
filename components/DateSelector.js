import { StyleSheet, View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateSelector({ date, setDate, setShowDatePicker }) {
    const handleChange = (event, selectedDate) => {
        if (event.type === 'dismissed') {
             setShowDatePicker(false);
             return;
        }
        if (selectedDate) { 
            setDate(selectedDate);
            setShowDatePicker(false);
        }
    };
    
    return (
        <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleChange}
        />
    );
};

const styles = StyleSheet.create({

});