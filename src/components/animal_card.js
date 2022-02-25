import React, { useState } from 'react'; 
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Authentication, {userID} from './Authentication';

export default function AnimalCard(props) {
    let id = props.id;
    let name = props.name;
    let population = props.population;
    let status = props.status;
    let habitat = props.habitat;
    let image = props.image;

    const [redirectTo, setRedirectTo] = useState(undefined)

    const handleClick = () => {
        setRedirectTo(id)
        console.log("You clicked on", name);
    }

    if (redirectTo) {
        return <Redirect push to={"/animals/" + id}/>;
    } else {
        return(
            <div className="col-12 col-sm-6 col-md-4 container-item no-padding clickable">
                <img src={"../" + image} alt={name} onClick={handleClick}></img>
                {/* <div className="animal-details" >
                    <div className="detail-text">
                        <h2 className="card-name">{name}</h2>
                        <h3 className="card-detail">Estimated Population: <br />{population}</h3>
                        <h3 className="card-detail">Status: <br /> {status}</h3>
                        <h3 className="card-detail">Habitat: <br /> {habitat}</h3>
                    </div>
                </div> */}
                <WatchListButton id={id} name={name}/>
            </div>
        )
    }
}

function WatchListButton(props) {

    let watchRef = firebase.database().ref(userID + "/watchList/" + props.id);

    let inWL;
    watchRef.on('value', (snapshot) => {
        inWL = snapshot.val();
    });

    const handleButtonClick = (event) => {
        event.preventDefault();
        if (userID) {
            console.log(inWL);
            const tempRef = firebase.database().ref(userID + "/watchList");
            if (inWL) {
                tempRef.child(props.id).set(null);
                alert(props.name + ' successfully removed from your watch list!')
            } else {
                tempRef.child(props.id).set(props.name);
                alert(props.name + ' successfully added to your watch list!')
            }
        }

    }
    if (userID) {
        return (
            <button type="button" className="btn btn-light btn-lg btn-block" onClick={handleButtonClick}>
                Add/Remove from Watchlist
            </button>  
        )
    } else {
        return (
            <div></div>
        )
    }
}