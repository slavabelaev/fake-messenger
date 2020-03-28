import React, {useEffect} from 'react';
import Routes from "./Routes";
import Layout from "../layout/Layout";
import Contacts from "../views/Contacts";
import Attachments from "../views/Attachments";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, signIn} from "./authSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

function App() {
    const dispatch = useDispatch();
    const { error, loading, user } = useSelector(authSelector);

    useEffect(() => {
        signIn('someLogin', 'secretPassword')(dispatch);
    }, [dispatch]);

    if (loading) return (
        <CircularProgress />
    );

    if (error) return (
        <Typography color="error">
            Error
        </Typography>
    );

    return user && (
        <Layout
            title="Fake Messenger"
            leftSide={<Contacts/>}
            rightSide={<Attachments/>}
        >
            <Routes />
        </Layout>
    );
}

export default App;
