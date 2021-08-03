import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDogDetail, clearDogDetail } from '../../actions/index';
import './Dog.css';

function Dog(props) {

    useEffect(()=>{
        
        const dogId = props.match.params.id;
        props.getDogDetail(dogId);
    }, [])



    return (
        <div>
            <h1>Dog detail</h1>
            {/* si el props esta definido como undefined agregar un cargando */}
            {props.dogDetail.name ? (
            <div className="dogDetailContainer">
            <img className="dogImage" src={props.dogDetail.image} alt={props.dogDetail.name} />
            <div className="dogInfoContainer">
                <h2 className="dogNameDetail" >{props.dogDetail.name}</h2>
                <ul className="dogList">
                    <li><strong>Height:</strong> {props.dogDetail.height ? (
                        props.dogDetail.height) : (
                    <span>Loading...</span>
                    )} cm.</li>
                    <li><strong>Weight:</strong> {props.dogDetail.weight} kg.</li>
                    <li><strong>Life span:</strong> {props.dogDetail.life_span}.</li>
                    <li><strong>Temperament:</strong> {props.dogDetail.temperament}.</li>
                </ul>
            </div>
            </div>
            ) : (
            <h4>Loading...</h4>
            )}
        </div>
    )
}

function mapStateToProps(state) {
    return {
      dogDetail: state.dogDetail
    };
  }

export default connect(
    mapStateToProps,
    {getDogDetail, clearDogDetail}
  )(Dog);
