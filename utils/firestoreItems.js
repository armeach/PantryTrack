import { db } from '../config/FirebaseConfig';
import { collection, doc, addDoc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'; 
import { createItem } from './items';

// Retrieve Firestore collection based on user UID - type = 'pantry' or 'shopping'
const getItemsRef = (uid, type) => collection(db, `users/${uid}/${type}`); 

// Fetch all items from the user's collection
export async function getItems(uid, type) { 
    const querySnapshot = await getDocs(collection(db, `${type}_${uid}`));
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
};

// generic add
export async function addItem(uid, type) { 
    const docRef = await addDoc(collection(db, `${type}_${uid}`), {
        first: 'John',
        last: 'Doe', 
        born: 1815
    });
    console.log('Added an item!')
}