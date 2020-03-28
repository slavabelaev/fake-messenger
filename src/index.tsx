import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {store} from "./app/store";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import {theme} from "./app/theme";

function Root() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <React.StrictMode>
                        <CssBaseline/>
                        <App />
                    </React.StrictMode>
                </Router>
            </ThemeProvider>
        </Provider>
    )
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
