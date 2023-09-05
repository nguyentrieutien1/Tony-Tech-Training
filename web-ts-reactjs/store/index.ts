import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./../reducers/index"; // Replace with your root reducer file path

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
