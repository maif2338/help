import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import 'firebase/database';
import AnimalCard from './animal_card';
import Login from "./LogIn";

// uiConfig for Authentication
const uiConfig = {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],

    credentialHelper: 'none',
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false,
        
    },
};

export let userID = "";
export default function Authentication(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log("logged in as " + firebaseUser.email);
                userID = firebaseUser.uid;
                setUser(firebaseUser);
                setIsLoading(false);
            } else {
                console.log("logged out");
                setUser(null)
                setIsLoading(false);
            }
        })

        return function cleanup() {
          authUnregisterFunction();
        }
    }, [])

  // A callback function for logging out the current user
  const handleSignOut = () => {
    setErrorMessage(null); //clear any old errors
    firebase.auth().signOut()
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <i id="spinner" className="fa fa-spinner fa-spin fa-3x"></i>
      </div>
    )
  }

  // Content to render
  let content = null; 

  // If logged out, show signup form
  if(!user) { 
    content = (
      <div className="container">
        <h1> Log in or Sign up</h1>
        <p> Log into an existing account or sign up below. Having an account allows you to access the watch 
          list feature. The feature allows you pick certain species to add to your personal watch list. 
          You can use any email or a Google account.</p>
          <Login />
      </div>
    );
  } 
  
  // If logged in, show welcome message
  else { 
    content = (
      <div>
        <WelcomeHeader user={user}>
          {/* log out button is child element */}
          {user &&
            <button id="logoutButton" className="btn btn-warning" onClick={handleSignOut}>
              Log Out {user.displayName}
            </button>
          }
        </WelcomeHeader>
      </div>
    );
  }

  return (
    <div>
      {errorMessage &&
        <p className="alert alert-danger">{errorMessage}</p>
      }
      {content}
    </div>
  );
}

// Displays a welcome message
function WelcomeHeader(props) {
  return (
    <header className="container">
      <h1>
        Welcome {props.user.displayName}!
        {' '}
      </h1>
      <p id="logoutMessage"> If you would like to log out of your account, come back to this
      page and click the log out button below</p>
      {props.children} {/* for button */}
    </header>
  );
}


