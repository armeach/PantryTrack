import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkBarCode (barcode) {
    try{
        const item = await AsyncStorage.getItem(barcode); 
        return item ? JSON.parse(item) : null; 
    } catch (e) {
        console.error('Error reading barcode', e);
        return null;
    };
};

export async function saveBarCode(barcode, item) {
    try {
        await AsyncStorage.setItem(barcode, JSON.stringify(item));
    } catch (e) {
        console.error('Error saving barcode', e);
    };
};