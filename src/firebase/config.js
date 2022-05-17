import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCGD1ZX-CRbgfNpKR3uWA_ExPGIbANJeQE',
  authDomain: 'study-pet.firebaseapp.com',
  projectId: 'study-pet',
  storageBucket: 'study-pet.appspot.com',
  messagingSenderId: '250083154978',
  appId: '1:250083154978:web:7714871f4762741c627e7b',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

// eslint-disable-next-line import/prefer-default-export
export { projectFirestore }
