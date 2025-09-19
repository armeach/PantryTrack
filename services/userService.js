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
}