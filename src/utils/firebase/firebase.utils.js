// firebase is a suite of tools, and this suite, you can bring down from libarary this thing called the app
// initializeApp function creates an app instance for you based on some type of config- config is an object that allows us to attach Firebase app instance we have online

import { initializeApp } from "firebase/app";

// using signInWithRedirect,signInWithPopup, and GoogleAuthProvider, we can create our Google sign in
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// getFirestore instantiates
// doc method allows us to retrieve documents inside of our firestore database
// getDoc = accessing the data- getting document's data, and setDoc means setting the document's data

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANBm_m_GquhYjdga5vckGzrvAE_iL-dF4",
  authDomain: "crwn-clothing-db-74942.firebaseapp.com",
  projectId: "crwn-clothing-db-74942",
  storageBucket: "crwn-clothing-db-74942.appspot.com",
  messagingSenderId: "842623762593",
  appId: "1:842623762593:web:0163ab8784ad290e7d30e0",
};

// above config identifies the SDK, essentially a developer kit that we're using

// Below code initializes Firebase, allowing for CRUD
const firebaseApp = initializeApp(firebaseConfig);

// calling new GoogleAuthProvider will give you back a provider instance
const provider = new GoogleAuthProvider();

// any time someone interacts with our provider, we want to force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// getting firestorm
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // first parameter: db is the database, which is instantiated above, second parameter: name of collections, third parameter: unique identifier
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
