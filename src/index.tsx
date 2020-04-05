import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import {CssBaseline} from "@material-ui/core";
import ThemeProvider from "./components/ThemeProvider";

function Root() {
    return (
        <Router>
            <Provider store={store}>
                <ThemeProvider>
                    <React.StrictMode>
                        <CssBaseline/>
                        <App />
                    </React.StrictMode>
                </ThemeProvider>
            </Provider>
        </Router>
    )
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
