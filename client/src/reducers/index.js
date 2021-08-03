import { GET_DOGS, GET_DOG_DETAIL, GET_TEMP, PAGINATE_DOGS, STOP_LOADING, SET_TEMP_DOG, CLEAR_DOG_DETAIL, API_DOGS, DB_DOGS, SET_DOG_API_DB, GET_DOGS_BY_NAME } from "../actions/index";

const initialState = {
    dogs: [],
    apiDB: [],
    apiDogsArr: [],
    dbDogsArr: [],
    dogDetail: {},
    temperaments: [],
    selectedTempDogs: [],
    loading: true,
    currentPage: 1,
    dogsPerPage: 12
}

function rootReducer(state = initialState, action){
    if (action.type === GET_DOGS) {
        return {
            ...state,
            dogs: action.payload,
            apiDB: action.payload,
            apiDogsArr: state.dogs.filter(dog => typeof dog.id === "number"),
            dbDogsArr: state.dogs.filter(dog => typeof dog.id === "string"),
            loading: false
        }
    }
    if (action.type === GET_DOGS_BY_NAME) {
        return {
            ...state,
            dogs: action.payload,
        }
    }
    if (action.type === GET_DOG_DETAIL) {
        return {
            ...state,
            dogDetail: action.payload,
            loading: false
        }
    }
    if (action.type === CLEAR_DOG_DETAIL) {
        return {
            ...state,
            dogDetail: {}        
        }
    }
    if (action.type === GET_TEMP) {
        return {
            ...state,
            temperaments: action.payload
        }
    }
    if (action.type === PAGINATE_DOGS) {
        return {
            ...state,
            currentPage: action.payload
        }
    }
    if (action.type === STOP_LOADING) {
        return {
            ...state,
            loading: false
        }
    }
    if (action.type === SET_TEMP_DOG) {
        return {
            ...state,
            selectedTempDogs: action.payload
        }
    }
    if (action.type === API_DOGS) {
        // console.log("llama apidogs")
        // console.log(state.dogs.filter(dog => dog.id < 300))
        return {
            ...state,
            dogs: state.apiDB,
            apiDogsArr: state.apiDB.filter(dog => typeof dog.id === "number"),
            dogs: state.apiDogsArr,
        }
    }
    if (action.type === DB_DOGS) {
        // console.log("llama dbdogs")
        // console.log(state.dogs.filter(dog => dog.id.length > 1))
        return {
            ...state,
            dogs: state.apiDB,
            dbDogsArr: state.apiDB.filter(dog => typeof dog.id === "string"),
            dogs: state.dbDogsArr,
        }
    }
    if (action.type === SET_DOG_API_DB) {
        // console.log("llama apiDB")
        return {
            ...state,
            dogs: state.apiDB
        }
    }
    
    return state;
}

export default rootReducer;