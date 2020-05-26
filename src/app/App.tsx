import React, {useEffect} from "react";
import Routes from "./Routes";
import Layout from "../common/components/layout/Layout";
import ContactsPage from "../features/contacts/ContactsPage";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, authRequest} from "../features/auth/authSlice";
import ErrorMessage from "../common/components/layout/ErrorMessage";
import Loading from "../common/components/layout/Loading";
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
            leftSide={<ContactsPage/>}
        >
            <Routes />
            <ActionSnackbar/>
        </Layout>
    );
}

export default App;