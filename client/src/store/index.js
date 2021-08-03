import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

// thunk: modulo de Redux para llamadas asincrónicas
// Cada vez que queremos hacer un llamado a una API con REDUX debemos usar applyMiddleware y en este caso con thunk | otro es redux-saga


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
    applyMiddleware(thunk))
  );

export default store;