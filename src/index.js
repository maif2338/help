import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQQWCCAB40Nlmk7VSXjRMpoDfark2hm84",
  authDomain: "project2-9a68c.firebaseapp.com",
  projectId: "project2-9a68c",
  storageBucket: "project2-9a68c.appspot.com",
  messagingSenderId: "581458063843",
  appId: "1:581458063843:web:93edbb393ba52f8bbef0d6",
  measurementId: "G-L01BNGP12D"
};

// Initialized Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
 </BrowserRouter>,
  document.getElementById('root')
);
