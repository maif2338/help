import React, {useState, useEffect} from 'react'; 
import AnimalList from './animal_list';
import firebase from 'firebase/app';
import 'firebase/database';
import AnimalCard from './animal_card.js';
import Authentication, {userID} from './Authentication';
import ANIMALS from "../animal-data.json"
import {Button} from "react-bootstrap"
import {NavLink} from 'react-router-dom'

export default function WatchList(props) {
    if (userID) {
        return (
            <div>
            {/* WatchListHeader component*/}
            <header className="watch-list">
                <div style={{backgroundImage: 'url("/img/elephant-landing.jpg")'}}>
                    <h1 className="text-justify text-center text-white">My Watchlist</h1>         
                </div>
            </header>
            {/* AnimalWatchList that renders animal cards here*/}
            <body className="watch-list-page">
                <AnimalWatchList/>
            </body>       
            </div>
        )
    } else {
        return (
            <div>
                <h1>Need to Login</h1>
                <Authentication />
            </div>
        )
    }
}

function AnimalWatchList(props) {
    let userKey = userID;
    console.log(userKey);
    const userRef = firebase.database().ref(userKey);

    const [data, setData] = useState([]);

    // To read the data located at ref. A DataSnapshot is passed to the event callbacks you attach with on() or once(). 
    // You can extract the contents of the snapshot as a JavaScript object by calling the val() method.
    useEffect(() => {
        let authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //firebaseUser defined: is logged in
                userRef.once('value')
                .then((dataSnapshot) => {
                    // Turns snapshot to JSON
                    return dataSnapshot.val();
                })
                .then((userData) => {
                    if (userData !== null) {
                        if (userData["watchList"]){
                            setData(userData["watchList"]);
                        }
                    } else {
                        userRef.child("watchList").set({});
                        setData(null);
                    }
                });
            } else { //firebaseUser undefined: is not logged in
                console.log('logged out');

            }
            return function cleanup() {
                authUnregisterFunction();
              }
        });
        
    }, [data]);

    return(
        <div>
            <div className="container cards">
                <div className="row">
                    {(data !== null) ?
                     ANIMALS.map((item) => {
                        if (item.id in data) {
                            return <AnimalCard 
                                key={item.name}
                                name={item.name}
                                population={item.population} 
                                status={item.status} 
                                habitat={item.habitat} 
                                image={item.image}
                                id={item.id} 
                            />
                        }
                    }) : (
                    <div className="goHome">
                        <div className="alert alert-info" role="alert">
                            <NavLink to="/" class="alert-link"> <div>You currently have no animals stored in your watchlist, click here to add animals.</div></NavLink>
                        </div>
                    </div>)
                }
                </div>
            </div>
            <footer>
                <p>
                    Portions of this page &copy;2020 INFO 340
                    All other attributions cited in page source.
                </p>
            </footer>
        </div>
    )
}