import React, {useState} from 'react';
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import View from "../../layout/View";
import {Link, useParams} from "react-router-dom";
import {
    CHAT_ATTACHMENTS_FILES_ROUTE_PATH,
    CHAT_ATTACHMENTS_LINKS_ROUTE_PATH,
} from "./index";
import ErrorMessage from "../../layout/ErrorMessage";
import AttachmentRoutes from "./AttachmentRoutes";

export interface AttachmentsProps {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginRight: 'auto'
    }
}));

const FILES_TAB_VALUE = 0;

function Attachments(props: AttachmentsProps) {
    const {id: contactId} = useParams();
    const [tabsValue, setTabsValue] = useState(FILES_TAB_VALUE);
    const classes = useStyles();

    if (!contactId) return <ErrorMessage text="Failed fetch contact id" />;

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
                to={CHAT_ATTACHMENTS_FILES_ROUTE_PATH.replace(':id', contactId)}
            />
            <Tab
                label="Links"
                component={Link}
                to={CHAT_ATTACHMENTS_LINKS_ROUTE_PATH.replace(':id', contactId)}
            />
        </Tabs>
    );

    const toolbarWithTabs = (
        <div>
            {toolbar}
            {tabs}
        </div>
    );

    return (
        <View
            toolbar={toolbarWithTabs}
        >
            <AttachmentRoutes/>
        </View>
    )
}

export default Attachments;
