import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers que seran los encargados de manejar la data de la aplicación
import rootReducer from "./Reducers/rootReducers";
// en cargado de controlar los side effects o api calls
import rootSaga from "./Sagas/rootSagas";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: false,
      traceLimit: 25,
    })) ||
  composeWithDevTools;

const configureStore = () => {
  // crea el  redux-saga middleware
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    // run index sagas saga: Function: a Generator function
    runSaga: sagaMiddleware.run(rootSaga, {}),
  };
};

export default configureStore;
