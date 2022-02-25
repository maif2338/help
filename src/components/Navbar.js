import Dropdown from 'react-bootstrap/Dropdown';
import {Button} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import ANIMALS from '../animal-data.json'; 
import {AiOutlineHome, AiOutlineOrderedList} from 'react-icons/ai';
import {GoGraph} from 'react-icons/go';

export default function NavbarList(props){
    let dropDownItemList = ANIMALS.map((animalItem) => {
        let dropDownItem = <Dropdown.Item key={animalItem.id}><NavLink push to={"/animals/" + animalItem.id} activeClassName="activeLink"><i>{animalItem.name}</i></NavLink></Dropdown.Item>
        return dropDownItem;
    })
    return(
        <nav className="navbar-nav">
            <ul>
                <li><NavLink to="/" activeClassName="activeLink" className="homeLink"><AiOutlineHome /></NavLink></li>
                <li><NavLink to="/list" activeClassName="activeLink"><AiOutlineOrderedList /></NavLink></li>
                <li><NavLink to="/compare" activeClassName="activeLink"><GoGraph /></NavLink></li>
                <li>
                <Dropdown>
                    <Dropdown.Toggle className="toggle" variant="success" ><i>Species</i></Dropdown.Toggle>
                    <Dropdown.Menu className="menu">
                       {dropDownItemList}
                    </Dropdown.Menu>
                </Dropdown>
                </li>
                <li id="login"><NavLink to="/login" activeClassName="activeLink"><i>Login</i></NavLink></li>
            </ul>    
        </nav>
    )
 }
 

