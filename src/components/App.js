import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalList from './animal_list';
import LandingHeader from './landing_header';
import AnimalDetail from './animal_detail';
import NavbarList from './Navbar'
import Authentication from './Authentication'
import WatchList from './watch_list'
import {Route, Switch} from 'react-router-dom';
import Plotly from './Plotly';

export default function App(props) {
    
    return(
        <div>
            <NavbarList/>
            <Switch>
                <Route exact path="/" render={ () => (
                    <div>
                        <LandingHeader />
                        <AnimalList />
                    </div>
                )}/>
                <Route path="/login" component={Authentication} />
                <Route path="/animals/:animalId" component={AnimalDetail} />
                <Route path="/list" component={WatchList} />
                <Route path="/compare" component={Plotly} />
            </Switch>
        </div>
    )
}

