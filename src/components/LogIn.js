import React from 'react'; 
import Authentication, {userID} from './Authentication'
import firebase from 'firebase/app';
import { FirebaseAuth } from 'react-firebaseui';

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px"
  };

export default function Login() {
  
    
    let emailInput;
    let passwordInput;
  
    let signUpWithEmailPassword = (event) => {
      event.preventDefault()
      firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then((userCredentials) => {
            let userAuth = userCredentials.user;
            console.log('User created: ' + user.uid);
            userID = user.uid;
            var user = {
                email: userAuth.email,
                password: userAuth.password,
                uid: userAuth.uid,
            }
            writeUserData(user);
            firebase.database().ref().child(userID).set(user);
          
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
              firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value);
          }
        });
    }
  
    return (
      <div style={loginStyles}>
          <hr style={{marginTop: "10px", marginBottom: "10px"}} />
          <form onSubmit={(event) => signUpWithEmailPassword(event)}>
              <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
                  <h5>Note</h5>
                  If you don't have an account already, this form will create your account.
              </div>
              <label className="pt-label">
                  Email
                  <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => {emailInput = input}} placeholder="Email"></input>
              </label>
              <label className="pt-label">
                  Password
                  <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => {passwordInput = input}} placeholder="Password"></input>
              </label>
              <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
          </form>
        </div>
      )
  }

  function writeUserData(user) {
    firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        console.log(error.message)
    });
}   

