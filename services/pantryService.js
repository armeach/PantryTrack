import { Alert } from 'react-native'; 

import { db } from '../config/FirebaseConfig';
import { collection, doc, addDoc, deleteDoc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore'; 

// Create a new pantry
export const createPantry = async (uid, pantryName) => {
    try { 
        // Create a new pantry document and get its id
        const newPantryRef = await addDoc(collection(db, 'pantries'), {
            name: pantryName,
            description: '', // optional
            ownerId: uid,
            createdAt: serverTimestamp(),
        });

        // Add the creator as the owner in the members subcollection
        const memberDocRef = doc(db, 'pantries', newPantryRef.id, 'members', uid); 
        await setDoc(memberDocRef, {
            userId: uid,
            role: 'owner',
        });

        // Add pantry to users collection
        await setDoc(doc(db, 'users', uid), {
        pantries: arrayUnion(newPantryRef.id)  // add pantry ID to array
        }, { merge: true });

        // Return the new pantry ID to use as a shareable link
        return newPantryRef.id; 

    } catch (error) {
        console.error('Error creating pantry:', error); 
        return null;
    }
}; 

// Join existing pantry
export const joinPantry = async (uid, pantryId, role='editor') => {
    // Check if the pantry exists
    const pantryDocRef = doc(db, 'pantries', pantryId); 
    const pantryDoc = await getDoc(pantryDocRef); 
    if (!pantryDoc.exists()) {
        throw new Error('Pantry not found.');
    };

    // Check if the user is already a member
    const memberDocRef = doc(db, 'pantries', pantryId, 'members', uid); 
    const memberDoc = await getDoc(memberDocRef); 
    if (memberDoc.exists()) {
        throw new Error('You are already a member of this pantry.'); 
    }; 

    // Add user to the members subcollection
    await setDoc(memberDocRef, {
        userId: uid,
        role: role,
    }); 

    // Add pantry to users collection
    await setDoc(doc(db, 'users', uid), {
        pantries: arrayUnion(pantryId)  // add pantry ID to array
    }, { merge: true });

    return true; 
};

// Fetch All User Pantries
export const fetchUserPantries = async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid); 
        const userDocSnap = await getDoc(userDocRef); 

        if (userDocSnap.exists()) {
            return userDocSnap.data().pantries || []; 
        } else { 
            console.log("No user document found!"); 
            return []; 
        }

    } catch (error) {
        console.error("Error fetching user's pantries:", error);
        return []; 
    }
}; 

// Fetch Pantry by ID
export const fetchPantryById = async (pantryId) => {
    try {
        const pantryRef = doc(db, 'pantries', pantryId); 
        const pantrySnap = await getDoc(pantryRef); 
        return pantrySnap.exists() ? { id: pantrySnap.id, ...pantrySnap.data() } : null; 

    } catch (error) {
        console.error(`Error fetching pantry ${pantryId}`, error);
        return;  
    }
}; 

// Add an item to a pantry
export const addItem = async (pantryId, item) => {
    try { 
        const itemsCollectionRef = collection(db, 'pantries', pantryId, 'items'); 
        await addDoc(itemsCollectionRef, {
            ...item,
            createdAt: serverTimestamp(),
        }); 
    } catch (error) {
        console.error("Error adding item:", error);
    }
}; 

// Remove an item from a pantry
export const removeItem = async (pantryId, itemId) => {
    try { 
        const itemRef = doc(db, 'pantries', pantryId, 'items', itemId); 
        await deleteDoc(itemRef);
        console.log('Item deleted!');  
    } catch (error) {
        console.error("Error removing item:", error); 
    }
}; 

// Edit an item in a pantry
export const editItem = async (pantryId, updatedItem) => {
    try {
        const itemRef = doc(db, 'pantries', pantryId, 'items', updatedItem.id); 
        await (updateDoc(itemRef, updatedItem)); 
    } catch (error) {
        console.error("Error editing item:", error); 
    }
}; 