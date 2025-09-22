import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig'; 

// Create a new user document
export const createUserDoc = async (uid, email) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            email,
            pantries: [],
            createdAt: serverTimestamp(),
        });
        console.log("User document created!"); 
    } catch (error) {
        console.error("Error creating user document:", error); 
    }
}; 

// Fetch user doc
export const fetchUserDoc = async (uid) => {
    const userRef = doc(db, 'users', uid); 
    const userSnap = await getDoc(userRef); 
    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return null; 
    }
}; 

// Fetch favorite pantry ID
export const fetchFavoritePantry = async (uid) => {
    const userDoc = await fetchUserDoc(uid); 
    return userDoc?.favoritePantryId || null; 
}; 

// Fetch favorite shopping list ID
export const fetchFavoriteShoppingList = async (uid) => {
    const userDoc = await fetchUserDoc(uid); 
    return userDoc?.favoriteShoppingListId || null; 
}; 