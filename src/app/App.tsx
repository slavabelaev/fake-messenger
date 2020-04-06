import React, {useEffect} from "react";
import Routes from "./Routes";
import Layout from "../layout/Layout";
import Contacts from "../views/Contacts";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, authRequest} from "../store/authSlice";
import ErrorMessage from "../layout/ErrorMessage";
import Loading from "../layout/Loading";
import ActionSnackbar from "./ActionSnackbar";
import MobileRoutes from "./MobileRoutes";
import {useMediaQuery, useTheme} from "@material-ui/core";

function App() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isBreakpointSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { error, loading, user } = useSelector(selectAuth);

    useEffect(() => {
        const action = authRequest({
            login: 'someLogin',
            password: 'somePassword'
        });
        dispatch(action);
    }, [dispatch]);

    if (loading || !user) return <Loading/>;
    if (error) return <ErrorMessage/>;

    if (isBreakpointSm) return (
        <>
            <MobileRoutes/>
            <ActionSnackbar/>
        </>
    );

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
