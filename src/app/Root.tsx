import React from "react";
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {CssBaseline} from "@material-ui/core";
import store from "./store";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import App from "./App";

function Root() {
    return (
        <Router>
            <Provider store={store}>
                <ThemeProvider>
                    <React.StrictMode>
                        <CssBaseline/>
                        <App/>
                    </React.StrictMode>
                </ThemeProvider>
            </Provider>
        </Router>
    )
}

export default Root;
