import React, {useState, useEffect} from 'react'; 
import AnimalCard from "./animal_card";

export default function AnimalList(props) {

    const [data, setData] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchInput, setSearchInput] = useState("");
    
    useEffect(() => {
        fetch("animal-data.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //let d = data.animals;
            let filtered = filterList(data);
            let searched = searchList(filtered);
            setData(searched);
        });
    },[filterStatus, searchInput]);

    let filterList = (list) => {
        if (filterStatus !== "all") {
            let newData = list.filter((element) => {
                return element.status === filterStatus;
            })
            return newData;
        }
        return list;
    }

    let searchList = (list) => {
        if (searchInput != "") {
            let newData = list.filter((element) => {
                let n = element.name.toLowerCase();
                return n.includes(searchInput.toLowerCase());
            })
            return newData;
        }
        return list;
    }

    let handleFilter = (event) => {
        setFilterStatus(event.target.value);
    }

    let handleSearch = (event) => {
        setSearchInput(event.target.value);
    }
    return(
        <div className="mainList">
            <div id="filters" >
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <label htmlFor="status">Filter by Provider!: </label>
                    <select id="status" name="status" value={filterStatus} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="Vulnerable">Athena</option>
                        <option value="Endangered">UnitedHealthcare</option>
                        <option value="Critically Endangered">Kaiser Permanente</option>
                    </select>
                </form>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <input className="form-control" type="text" placeholder="Search..." onChange={handleSearch}/>
                </form>         
            </div>
            <div className="container cards">
                <div className="row">
                    {data.map((item) => {
                        return <AnimalCard 
                            key={item.name}
                            name={item.name}
                            population={item.population} 
                            status={item.status} 
                            habitat={item.habitat} 
                            image={item.image} 
                            description={item.description}
                            id={item.id}
                        />
                    })}
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