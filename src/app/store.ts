import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {rootReducer} from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const defaultMiddleware = getDefaultMiddleware({
    thunk: true,
    immutableCheck: true,
    serializableCheck: true
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [
        ...defaultMiddleware,
        sagaMiddleware
    ],
});

sagaMiddleware.run(rootSaga);

export default store;