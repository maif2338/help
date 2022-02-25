import React, {useState, useEffect} from 'react';
import ANIMALS from '../animal-data.json';
import Plot from 'react-plotly.js';
import { redraw } from 'plotly.js';

export default function Plotly() {
    // State for first form option
    const [selected, setSelect] = useState("Giant Panda");
    // State for second form option
    const [selected2, setSelect2] = useState("Siberian Tiger");
    // State for third form option
    const [selected3, setSelect3] = useState("Black Rhino");

    // Array which will contain animal names and populations
    let array = [];

    // Index in the array of first form selection
    let index1 = 0;
    // Index in the array of second form selection
    let index2 = 0;
    // Index in the array of third form selection
    let index3 = 0;

    // Map values from animal data to array
    ANIMALS.map((item) => {
        array.push(item.name, item.population);
    });

    // Returns the correct index for the form selections
    for (let i = 0; i < array.length; i++) {
        if (array[i] == selected) {
            index1 = i + 1;
        } 
        
        if (array[i] == selected2) {
            index2 = i + 1;
        } 
        
        if (array[i] == selected3) {
            index3 = i + 1;
        }
    }

    // Handles changes in first form
    let handleChange = (event) => {
        setSelect(event.target.value);
    }

    // Handles changes in second form
    let handleChange2 = (event) => {
        setSelect2(event.target.value);
    }

    // Handles changes in third form
    let handleChange3 = (event) => {
        setSelect3(event.target.value);
    }


    return (
        <div className="item-4 text-center">
        <section>
                <form>
                    <h1> Compare Endangered Animal Populations </h1>
                    <p> Get a better understanding of how endangered species compare in terms of population with the bar graph below. Select up to three species you would like to compare and their populations will be depicted in the bar graph.</p>  
                    <div className="form-group">
                        <label htmlFor="animalFormOne">Select First Animal</label>
                        <select value={selected} className="form-control" id="animalFormOne" onChange={handleChange}>
                            <option value="Giant Panda"> Giant Panda </option>
                            <option value="Siberian Tiger"> Siberian Tiger </option>
                            <option value="Black Rhino"> Black Rhino </option>
                            <option value="Snow Leopard"> Snow Leopard </option>
                            <option value="Eastern Lowland Gorilla"> Eastern Lowland Gorilla </option>
                            <option value="Yangtze Finless Porpoise"> Yangtze Finless Porpoise </option>
                            <option value="Sumatran Elephant"> Sumatran Elephant </option>
                            <option value="Sumatran Orangutan"> Sumatran Orangutan </option>
                        </select>
                    <div className="form-group">
                        <label htmlFor="animalFormTwo">Select Second Animal</label>
                        <select value={selected2} className="form-control" id="animalFormTwo" onChange={handleChange2}>
                            <option value="Giant Panda"> Giant Panda </option>
                            <option value="Siberian Tiger"> Siberian Tiger </option>
                            <option value="Black Rhino"> Black Rhino </option>
                            <option value="Snow Leopard"> Snow Leopard </option>
                            <option value="Eastern Lowland Gorilla"> Eastern Lowland Gorilla </option>
                            <option value="Yangtze Finless Porpoise"> Yangtze Finless Porpoise </option>
                            <option value="Sumatran Elephant"> Sumatran Elephant </option>
                            <option value="Sumatran Orangutan"> Sumatran Orangutan </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="animalFormThree">Select Third Animal</label>
                        <select value={selected3} className="form-control" id="animalFormThree" onChange={handleChange3}>
                            <option value="Giant Panda"> Giant Panda </option>
                            <option value="Siberian Tiger"> Siberian Tiger </option>
                            <option value="Black Rhino"> Black Rhino </option>
                            <option value="Snow Leopard"> Snow Leopard </option>
                            <option value="Eastern Lowland Gorilla"> Eastern Lowland Gorilla </option>
                            <option value="Yangtze Finless Porpoise"> Yangtze Finless Porpoise </option>
                            <option value="Sumatran Elephant"> Sumatran Elephant </option>
                            <option value="Sumatran Orangutan"> Sumatran Orangutan </option>
                        </select>
                    </div>
                        <Plot
                            data= {[{},
                                {type: 'bar', x:[selected, selected2, selected3], y: [array[index1], array[index2], array[index3]], marker: {color: 'green'}, useResizeHandler: true },
                                ]}
                            layout={ { title: selected + " vs. " + selected2 + " vs. " + selected3} }
                        /> 
                    </div>
                </form>
            </section>
        </div>       
    )
}