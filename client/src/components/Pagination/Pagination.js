
import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { paginate } from '../../actions/index';
import './Pagination.css';

// totalDogs viene como prop del componente padre = dogs || query.name
// dogsPerPage y paginate del store
const Pagination = ({totalDogs,dogsPerPage, paginate, currentPage}) => {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Cada vez que se renderiza que empiece en 1 para dogs || query.name
    useEffect(() => {
        paginate(1)
        }, [paginate]);

    const handlePagination = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
    
    return (
        <nav>
            <ul>
               {pageNumbers.map(number => (
                   <li key={number} style={{display: "inline", margin: "0 5px"}}>
                       <button 
                       onClick={() => {paginate(number); handlePagination()}} href='!#'
                       className={currentPage === number ? "activeButton" : ""}
                       >
                           {number} 
                       </button>
                   </li>
               ))} 
            </ul>   
        </nav>
    )
}



function mapStateToProps(state) {
    return {
        dogsPerPage: state.dogsPerPage,
        currentPage: state.currentPage
    };
}

export default connect(
    mapStateToProps,
    {paginate}
)(Pagination);