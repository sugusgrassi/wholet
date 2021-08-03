import React, { useEffect, useState} from 'react';
import DogCards from '../DogCards/DogCards.js';
import Find from '../Find/Find';
import Switch from '../Switch/Switch';
import Switchazw from '../Switch/Switchazw';
import Temperaments from '../Temperaments/Temperaments';
import { connect } from 'react-redux';
import { getDogs, apiDogs, dbDogs, getTemperaments, setdogApiDB } from '../../actions/index';
import { FaWeightHanging } from 'react-icons/fa';
import { MdBlock, MdSortByAlpha } from 'react-icons/md';
import { RiFilterOffFill } from 'react-icons/ri';
import { RiFilterFill } from 'react-icons/ri';



const DogContainer = (props) => {
    const [value, setValue] = useState(false);
    const [azWeight, setWeight] = useState(false);
    const [showTemp, setShowTemp] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    
    useEffect(()=>{
        props.getDogs("");
        
    }, [])

    function handleChangeAZW() {
        // props.getDogs("")
        // props.setdogApiDB();
        setWeight(!azWeight)
        }

    function handleChange() {
        // props.getDogs("")
        // props.setdogApiDB();
        setValue(!value)
      }

    const onClick = () => {
        if (showTemp === false){
        setShowTemp(true)
    }   else {
        setShowTemp(false)
    }
    };

    const apiClick = () => {
        props.apiDogs();
    };

    const dbClick = () => {
       props.dbDogs();
    };
    
    const showTempcb = () => {
        setShowTemp(false)
    }

    const handleFilter = () => {
        setShowFilters(true)
    }

    const handleFilterfalse = () => {
        setShowFilters(false)
    }


    return (
        <div >
            <h1>Find the dogs!</h1>
            <div className="flexfilters">
            <div className="flexContainer flexmargin">
                <Find />
                    <button onClick={() => apiClick()} className={props.dogs.length === props.apiDogsArr.length ? "activeButton" : ""}>Api</button>
                    <button onClick={dbClick} className={props.dogs.every(dog => typeof dog.id === "string") === true ? "activeButton" : ""}>DB</button>
                </div>
                <div className="flexContainer flexmargin">
                    
                        <span><strong>Order by: </strong></span> 
                        <div className="flexContainer">
                            <span> Name</span> 
                            <Switchazw
                                azWeight={azWeight}
                                handleToggleazw={() => handleChangeAZW()}
                            />
                            <div className="flexContainer">
                            <span> Weight   </span>
    
                        
                            <span>|    ↑</span>
                            <Switch
                                isOn={value}
                                handleToggle={() => handleChange()}
                            />
                            <span>↓</span>
                        </div>
                    </div>
                </div>
                <div className="flexContainer flexmargin">
                <button onClick={onClick} className={showTemp ? "activeButton" : "" }>{showTemp ? "Hide temperaments" : "Show temperaments"}</button>
                </div>
                { showTemp ? <Temperaments showTempcb={showTempcb}/>  : null }
            </div>

            {/*Responsive Filters*/}
             {/* RiFilterOffFill setShowFilters */}
            {!showFilters ? <div className="flexfiltersRes"> <button onClick={handleFilter}><strong>Filters <RiFilterFill/> </strong></button> </div>
            : <>
            <button className="filterbutton" onClick={handleFilterfalse}><strong>Filters <RiFilterOffFill/> </strong></button> 
            <div className="flexfiltersRes">
                <div className="flexContainerRes flexmargin">
                    <Find />
                        <div>
                            <button onClick={() => apiClick()} className={props.dogs.length === props.apiDogsArr.length ? "activeButton" : ""}>Api</button>
                            <button onClick={dbClick} className={props.dogs.every(dog => typeof dog.id === "string") === true ? "activeButton" : ""}>DB</button>
                        </div>
                    </div>
    
                    <div className="flexContainer flexmargin">
                        
                            <span><strong>Order by: </strong></span> 
                            <div className="flexContainer">
                                <MdSortByAlpha />
                                <Switchazw
                                    azWeight={azWeight}
                                    handleToggleazw={() => handleChangeAZW()}
                                />
                                <div className="flexContainer">
                                <FaWeightHanging />
        
                            
                                
                                <Switch
                                    isOn={value}
                                    handleToggle={() => handleChange()}
                                />
                                
                            </div>
                        </div>
                    </div>
                    <div className="flexContainer flexmargin">
                    <button onClick={onClick} className={showTemp ? "activeButton" : "" }>{showTemp ? "Hide temperaments" : "Show temperaments"}</button>
                    </div>
                    </div>
                    { showTemp ? <Temperaments style={{display: "block"}} showTempcb={showTempcb}/>  : null }
                </>
                }

            <DogCards zA = {value} azWeight = {azWeight} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        apiDogsArr: state.apiDogsArr,
        dbDogsArr: state.dbDogsArr,
        dogs: state.dogs
    };
  }



export default connect(
    mapStateToProps,
    {getDogs, apiDogs, dbDogs, getTemperaments, setdogApiDB }
  )(DogContainer);
