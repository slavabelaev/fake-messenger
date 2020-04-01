import React, {useState} from 'react';
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import View from "../../layout/View";
import {Link, Route, Switch, useParams} from "react-router-dom";
import {
    CHAT_ATTACHMENTS_FILES_ROUTE_PATH,
    CHAT_ATTACHMENTS_LINKS_ROUTE_PATH,
} from "./index";
import ErrorMessage from "../../layout/ErrorMessage";
import AttachmentList from "../../components/AttachmentList";
import AttachmentLinkList from "../../components/AttachmentLinkList";

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginRight: 'auto'
    }
}));

const FILES_TAB_VALUE = 0;

function Attachments() {
    const {id: chatId} = useParams();
    const [tabsValue, setTabsValue] = useState(FILES_TAB_VALUE);
    const classes = useStyles();

    if (!chatId) return <ErrorMessage text="Failed fetch chat id" />;

    const toolbar = (
        <Toolbar>
            <Typography className={classes.title}>
                Attachments
            </Typography>
            <IconButton
                edge="end"
            >
                <MoreVert/>
            </IconButton>
        </Toolbar>
    );

    const tabs = (
        <Tabs
            value={tabsValue}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(event, value) => setTabsValue(value)}
        >
            <Tab
                label="Files"
                component={Link}
                to={CHAT_ATTACHMENTS_FILES_ROUTE_PATH.replace(':id', chatId)}
            />
            <Tab
                label="Links"
                component={Link}
                to={CHAT_ATTACHMENTS_LINKS_ROUTE_PATH.replace(':id', chatId)}
            />
        </Tabs>
    );

    const toolbarWithTabs = (
        <div>
            {toolbar}
            {tabs}
        </div>
    );

    const content = (
        <Switch>
            <Route
                path={CHAT_ATTACHMENTS_FILES_ROUTE_PATH}
                render={() => <AttachmentList chatId={chatId}/>}
            />
            <Route
                path={CHAT_ATTACHMENTS_LINKS_ROUTE_PATH}
                render={() => <AttachmentLinkList chatId={chatId}/>}
            />
            <Route
                render={() => <AttachmentList chatId={chatId}/>}
            />
        </Switch>
    );

    return (
        <View
            toolbar={toolbarWithTabs}
        >
            {content}
        </View>
    )
}

export default Attachments;
