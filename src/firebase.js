import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyBY5f3vyzJMVXP1x-Mg4dtHT7vloNrPu2I",
  authDomain: "fierbase-2b8fa.firebaseapp.com",
  projectId: "fierbase-2b8fa",
  storageBucket: "fierbase-2b8fa.appspot.com",
  messagingSenderId: "1010887963595",
  appId: "1:1010887963595:web:554423690d7fcae9903c4e",
  measurementId: "G-Z9RCRTS3V1"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
