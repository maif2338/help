import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';

import ANIMALS from '../animal-data.json'; 

export default function AnimalDetail(props) {
    let {animalId} = useParams();

    let animal = _.find(ANIMALS, {id: animalId});

    //render particle effect
    useEffect(() => {
        var sad1 = document.getElementById("sad1");
        var sad2 = document.getElementById("sad2");
        let width = window.innerWidth;
        let height = window.innerHeight;
        let shadow1 = "";
        let shadow2 = "";
        for (let i = 0; i < animal.population / 2; i++) { //2 particles per loop
            let x1 = Math.floor(Math.random() * width);
            let x2 = Math.floor(Math.random() * width);
            let y1 = Math.floor(Math.random() * (height + 400));
            let y2 = Math.floor(Math.random() * (height + 400));
            shadow1 += `${x1}px ${y1}px green, `;
            shadow2 += `${x2}px ${y2}px green, `;
        }
        sad1.style.boxShadow = shadow1.slice(0,-2);
        sad2.style.boxShadow = shadow2.slice(0,-2);
    }, []);

    if (!animal) return <h2>Could not find animal.</h2>
    return (
        <div>
            <body id="sadBody">
                <div id="sad1"></div>
                <div id="sad2"></div>
                <header className="sadHeader">
                    <h1 >{animal.name}</h1>
                    <h3 id="description">{animal.description}<br/><br/>Each ● = 1 {animal.name} left in the wild.</h3>
                </header> 
                
                <div className="under">
                    <img className="animal-img" src={"../" + animal.image} alt={animal.name}></img>
                    <h3 id="estimate">Est. Population: {animal.population}</h3>
                </div>   
            </body>
        </div>
    )

}
