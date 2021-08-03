import React, { useEffect } from 'react';
import Pagination from '../Pagination/Pagination'
import { connect } from 'react-redux';
import { getDogs, paginate, setTempDog, clearDogDetail } from '../../actions/index';
import { Link } from 'react-router-dom';
import './DogCards.css';

function DogCards(props) {
    const {dogs, loading, dogsPerPage, currentPage, selectedTempDogs, zA, azWeight, clearDogDetail} = props;

    useEffect(()=>{
        clearDogDetail()
        
    }, [clearDogDetail])


    
    function compare( a, b ) {
    if (!azWeight) {
        let comparison = 0;
        if ( a.name < b.name ) {
            comparison = -1;
        }
        if ( a.name > b.name ) {
            comparison = 1;
        }
        if (!zA){
            return comparison * 1
        } else {
            return comparison * -1
        } 
    } else {
        let comparison = 0;
        if ( parseInt(a.weight.split(' ')[0]) < parseInt(b.weight.split(' ')[0]) ) {
            comparison = -1;
        }
        if ( parseInt(a.weight.split(' ')[0]) > parseInt(b.weight.split(' ')[0]) ) {
            comparison = 1;
        }
        if (!zA){
            return comparison * 1
        } else {
            return comparison * -1
        }
    }
    }
   

    let currentDogs;
    const indexOfLastDog = currentPage *  dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    if (selectedTempDogs.length > 0){
        selectedTempDogs.sort( compare );
        currentDogs = selectedTempDogs.slice(indexOfFirstDog, indexOfLastDog);
    // falta pasar breedName a redux y hacer un  else if (selectedTempDogs.length === 0 && breedName) y pasar dog a []
    } else {
        dogs.sort( compare );
        currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    }


    if (loading) {
        return <h2>Loading...</h2>
    }


    return (
        <div className="dogCardsContainer">
            {currentDogs.length > 0  ? (<div className="dogCards">
            {currentDogs.map((dog) => (
                <div className="dogCard" key={dog.id}>
                <Link to={`/dogs/${dog.id}`}>
                <div className="imgContainer"><img className="imgCard" src={dog.image} alt={dog.name} /></div>
                </Link>
                <div className="nameTemp">
                    <Link className="dogLink" to={`/dogs/${dog.id}`}>
                        <h2 className="dogName">{dog.name}</h2>
                    </Link>
                    <p className="tempInfo"><strong>T:</strong> {dog.temperament} </p>
                    {/* <span>height:{dog.height} </span>
                    <span>weight: {dog.weight} </span>
                    <span>life_span: {dog.life_span} </span> */}
                </div>
              </div>
            ))}
            </div>) : <h3>We couldn't catch any dog, please press Show all or try later</h3>}
            <div className="pagination" >{
                selectedTempDogs.length > 12  ? <Pagination totalDogs={selectedTempDogs.length} />
                : !selectedTempDogs && dogs.length > 12 ? <Pagination totalDogs={dogs.length} />
                : <></>
            }
            </div> 
        </div>
    )

}

/* if (selectedTempDogs.length > 12) {
<Pagination totalDogs={selectedTempDogs.length} />
}
else if (dogs.length > 12) {
  <Pagination totalDogs={dogs.length} />  
}
else {

}


*/

function mapStateToProps(state) {
    return {
      dogs: state.dogs,
      loading: state.loading,
      dogsPerPage: state.dogsPerPage,
      currentPage: state.currentPage,
      selectedTempDogs: state.selectedTempDogs
    };
  }


export default connect(
    mapStateToProps,
    {getDogs, paginate, setTempDog, clearDogDetail}
)(DogCards);



// const mapDispatchToProps = (dispatch) => {
//     return {
//         getDogs: (dog) => {
//             dispatch(getDogs(dog));
//         },
//         paginate: (pageNumber) => {
//           dispatch(paginate(pageNumber))
//         }
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(DogCards);