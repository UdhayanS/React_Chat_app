import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove, get, set } from "firebase/database"; // Import 'set'
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1nqwOqHun1p7nMY8MXQ2euqtJUNEsFLA",
    authDomain: "chat-app-bcf66.firebaseapp.com",
    projectId: "chat-app-bcf66",
    storageBucket: "chat-app-bcf66.appspot.com",
    messagingSenderId: "898072927427",
    appId: "1:898072927427:web:08e71dd5e62b1209cf5676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of services
const database = getDatabase(app);
const storage = getStorage(app);

// Export the database and storage instances along with necessary functions
export { database, storage, ref, push, onValue, remove, get, set }; // Make sure 'set' is included
