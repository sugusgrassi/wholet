import React, { useState, useEffect } from 'react'
import { POST_DOG_URL } from '../../constants';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./AddDog.css";
import { connect } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions/index';

const AddDog = ({getDogs, getTemperaments, temperaments}) => {
    const [newDog, setNewDog] = useState({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temperament: [],
        image: ""
    })

    const [errorN, setErrorN] = useState("");
    const [errorW, setErrorW] = useState("");
    const [errorH, setErrorH] = useState("");
    const [errorLS, setErrorLS] = useState("");
    const [errorT, setErrorT] = useState("");
    const [error, setError] = useState("");
    let history = useHistory();


    useEffect(() => {
        getTemperaments()
        // getDogs("")
        // setdogApiDB()
      },[getTemperaments])



    function validateDogN(value) {
        if(!/^[-a-zA-Z +]*$/gi.test(value)) {
            setErrorN('↑ Name must be alphabetical');
        } else {
            setErrorN('');
        }
        setNewDog(prevState =>
            ({...prevState, name: value}));
    }

    function validateNumberW(value) {
        if(!/^[0-9- +]*$/gi.test(value)) {
            setErrorW('↑ Weight must be a number');
        } else {
            setErrorW('');
        }
        setNewDog(prevState =>
            ({...prevState, weight: value}));
    }

    function validateNumberH(value) {
        if(!/^[0-9- +]*$/gi.test(value)) {
            setErrorH('↑ Height must be a number');
        } else {
            setErrorH('');
        }
        setNewDog(prevState =>
            ({...prevState, height: value}));
    }

    function validateNumberLS(value) {
        if(!/^[0-9- +]*$/gi.test(value)) {
            setErrorLS('↑ Life span must be a number');
        } else {
            setErrorLS('');
        }
        setNewDog(prevState =>
            ({...prevState, life_span: value}));
    }

    function validateDogT(value) {
        if(!/^[-a-zA-Z+]*$/gi.test(value)) {
            setErrorT('↑ Temperament must be alphabetical');
        } else {
            setErrorT('');
        }
        setNewDog(prevState =>
            ({...prevState, temperament: [value]}));
    }

    function validateImageDog(value) {
        if(!/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(value)) {
          setError('↑ It must be an URL');
        } else {
          setError('');
        }
        setNewDog(prevState =>
            ({...prevState, image: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // postdog(newDog) // Lo llevo a Redux?
        axios.post( POST_DOG_URL, newDog)
          .then(function (response) {
            // console.log(response);
          })
        //   getDogs("")
       history.push('/thanks');
    }
//  console.log(newDog)
    const isEnabled = newDog.name.length > 0 && newDog.weight.length > 0 && newDog.life_span.length > 0 && newDog.temperament.length > 0 && newDog.image.length > 0;
// console.log(temperaments)
    // console.log(newDog.name)
    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }
    return (
        <div >
            <h1>Add a wanted dog</h1>
            <div className="dogCardsContainer">
                <form className="addDogForm" onSubmit={(e) => handleSubmit(e)}>
                    <input name="dogname" value={newDog.name} placeholder="Dog name" onChange={(e)=> validateDogN(e.target.value)} maxlength="20"/>
                    {!errorN ? null : <span className="formError">{errorN}</span>}
                    <input name="weight" value={newDog.weight} placeholder="Dog weight" onChange={(e)=> validateNumberW(e.target.value)} maxlength="20"/>
                    {!errorW ? null : <span className="formError">{errorW}</span>}
                    <input name="height" value={newDog.height} placeholder="Dog height" onChange={(e)=> validateNumberH(e.target.value)} maxlength="20"/>
                    {!errorH ? null : <span className="formError">{errorH}</span>}
                    <input name="life_span" value={newDog.life_span} placeholder="Dog life span" onChange={(e)=> validateNumberLS(e.target.value)} maxlength="20"/>
                    {!errorLS ? null : <span className="formError">{errorLS}</span>}
                    {/* <input name="temperament" value={newDog.temperament} placeholder="Dog temperament" onChange={(e)=> setNewDog(prevState =>
                        ({...prevState, temperament: [e.target.value]}))}/> */}
                    <label style={{textAlign: "left", fontSize: "14px"}}>Choose or create a temperament:</label>
                    <select name="temperament" value={[newDog.temperament]} onChange={(e)=> validateDogT(toTitleCase(e.target.value))} multiple>
                        {temperaments?.map((temp) => (
                            <option 
                            key={temp.id} 
                            value={temp.temperament} 
                            >{temp.temperament}</option>
                        ))}
                    </select>
                    <input name="temperament" value={newDog.temperament} placeholder="Dog temperament" onChange={(e)=> validateDogT(toTitleCase(e.target.value))} maxlength="45"/>
                    {!errorT ? null : <span className="formError">{errorT}</span>}
                    <input name="image" value={newDog.image} placeholder="Dog image URL" onChange={(e)=> validateImageDog(e.target.value)}/>
                    {!error ? null : <span className="formError">{error}</span>}
                    <div className="divSubmit"><input className="inputbutton" type="submit" disabled={!isEnabled || error || errorW}/></div>
                </form>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
      temperaments: state.temperaments
    };
}

export default connect(
    mapStateToProps,
    {getDogs, getTemperaments }
  )(AddDog);

