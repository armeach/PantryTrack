import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadItems(key) {
    try { 
        const data = await AsyncStorage.getItem(key); 
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Failed to load data.');
        return [];
    };
};

export async function saveItems(key, items) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        console.error('Failed to save data.');
    };
};