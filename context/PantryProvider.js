import { createContext, useContext, useEffect, useState} from 'react';
import { db } from '../config/FirebaseConfig';  
import { collection, onSnapshot } from 'firebase/firestore'; 

import { useAuth } from './AuthProvider';
import { addItem, removeItem, editItem } from '../services/pantryService';

const PantryContext = createContext(); 

export function PantryProvider({ children }) {
    const [items, setItems] = useState([]); 
    const { user, activePantryId } = useAuth(); 

    // This useEffect hook re-runs if the pantryId changes
    useEffect(() => {
        // Exit if no pantry
        if (!activePantryId || !user) {
            setItems([]); 
            return; 
        }; 

        // Set up reference to Firestore db
        const itemsCollectionRef = collection(db, 'pantries', activePantryId, 'items');
        
        // Set up a real-time listener whose callback runs everytime data in the collection changes
        const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
            const itemsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsList); 
        }); 

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [activePantryId]);

    // Expose items and the Firestore functions to the rest of the app
    const value = {
        items, 
        // These functions call our Firestore API from pantryService.js
        addItem: (item) => addItem(activePantryId, item), 
        removeItem: (itemId) => removeItem(activePantryId, itemId),
        editItem: (updatedData) => editItem(activePantryId, updatedData), 
    }; 

    return (
        <PantryContext.Provider value={value}>
            {children}
        </PantryContext.Provider>
    );
};

export const usePantry = () => useContext(PantryContext); 