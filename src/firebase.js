import { initializeApp } from 'firebase/app';
import { getFirestore,query, orderBy, getDocs, collection, limit, onSnapshot, addDoc ,serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged,signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Filter from 'bad-words'

import {ref, onUnmounted, computed }  from "vue";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLAkohvveR8KudpaMmK1IL2zC6pXr4IWI",
    authDomain: "vue-chat-6e770.firebaseapp.com",
    projectId: "vue-chat-6e770",
    storageBucket: "vue-chat-6e770.appspot.com",
    messagingSenderId: "682581855863",
    appId: "1:682581855863:web:57c8e3caff30149aaa0072",
    measurementId: "G-LXQSHBQ3WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

export function useAuth() {
    const user = ref(null)
    const unsubscribe = onAuthStateChanged(auth,_user => (user.value = _user))
    onUnmounted(unsubscribe)

    const isLogin = computed(() => user.value !== null)

    const onAuthStateChange = () => {
        onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                user.value = authUser;
            } else {
                user.value = null;
            }
        });
    };

    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithPopup(auth, googleProvider)
    }

    const signOut = () => signOut()

    return {user, isLogin, onAuthStateChange, signIn, signOut}
}

//firestoreHook
const firestore = getFirestore(app)
const messagesCollection = collection(firestore, 'messages')
const orderedQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(100));
const messagesQuery = getDocs(orderedQuery);
const filter = new Filter()

export function useChat() {
    const messages = ref([])
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
        messages.value = snapshot.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        ).reverse()
    });

    onUnmounted(unsubscribe)

    const { user, isLogin } = useAuth()
    const sendMessage = text => {
        if (!isLogin.value) return
        const { photoURL, uid, displayName } = user.value

       addDoc(messagesCollection,{
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: filter.clean(text),
            createdAt: serverTimestamp(),
        })
    }
    return {sendMessage, messages}
}