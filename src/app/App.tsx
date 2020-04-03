import React, {useEffect} from 'react';
import Routes from "./Routes";
import Layout from "../layout/Layout";
import Contacts from "../views/Contacts";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, signIn} from "./authSlice";
import ErrorMessage from "../layout/ErrorMessage";
import Loading from "../layout/Loading";
import ActionSnackbar from "./ActionSnackbar";

function App() {
    const dispatch = useDispatch();
    const { error, loading, user } = useSelector(authSelector);

    useEffect(() => {
        signIn('someLogin', 'secretPassword')(dispatch);
    }, [dispatch]);

    if (loading || !user) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <Layout
            title="Fake Messenger"
            leftSide={<Contacts/>}
        >
            <Routes />
            <ActionSnackbar/>
        </Layout>
    );
}

export default App;
