import React, {useState} from 'react';
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import AttachmentsGrid from "../../components/AttachmentList";
import View from "../../layout/View";

export interface AttachmentsProps {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginRight: 'auto'
    }
}));

const FILES_TAB_VALUE = 0;

function Attachments(props: AttachmentsProps) {
    const [tabsValue, setTabsValue] = useState(FILES_TAB_VALUE);
    const classes = useStyles();

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
            <Tab label="Files" />
            <Tab label="Links" />
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
            <AttachmentsGrid/>
        </View>
    )
}

export default Attachments;
