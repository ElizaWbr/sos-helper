import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import router from './router'

import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import '@/assets/main.css'

loadFonts()

const firebaseConfig = {
  apiKey: "AIzaSyAwSvFgX4K_qlZJgPJgoPvZ9urKD-Se82o",
  authDomain: "soshelper-37ad5.firebaseapp.com",
  projectId: "soshelper-37ad5",
  storageBucket: "soshelper-37ad5.appspot.com",
  messagingSenderId: "543027992390",
  appId: "1:543027992390:web:48ab6f37588ab3d4b8f747"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = firebase.auth();

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

export { auth, db };