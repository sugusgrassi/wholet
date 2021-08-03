import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getDogs, setTempDog, paginate, setdogApiDB, getDogsByName} from '../../actions/index';
import './Find.css';

const Find = (props) => {

    const [breedName, setBreedName] = useState("");
    
    function handleChange(event) {
        setBreedName(event.target.value);
      }
      
      // Solo se usará el reset "Show all" | Usé useEffect para que cambie el estado de breedName a medida que un usuario escribe
      function handleSubmit(event) {
        event.preventDefault();
        props.paginate(1)
        // props.setTempDog("")
        props.getDogs("?name="+breedName)
      }

      useEffect(() => {
        // console.log("Se modificó el state")        
        // props.setTempDog("")
        props.getDogsByName("?name="+breedName)
        // props.setdogApiDB()
        props.setTempDog("")
        props.paginate(1)
      },[breedName])

      function handleFormReset(event) {
        event.preventDefault();
        props.setTempDog("")
        setBreedName("")
        // props.getDogs("")
        // Para que no llame una y otra vez a la api y sea más rápido. resetea dog a apidb con todos los perros
        props.setdogApiDB()
        props.paginate(1)

      }

    return (
        <div >
        <form className="findContainer" onSubmit={(e) => handleSubmit(e)} onReset={(e) => handleFormReset(e)}>
        <div>
          {/* <label className="" htmlFor="breedName" >Breed? </label> */}
          <input
            type="text"
            id="breedName"
            autoComplete="off"
            placeholder="Breed?"
            value={breedName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* <button type="submit">Find</button> */}
        <input className={"inputbutton"}
            type="reset"
            value="Show all"
          />
      </form>
        </div>
    )
}


export default connect(
    null,
    {getDogs, setTempDog, paginate, setdogApiDB, getDogsByName}
  )(Find);