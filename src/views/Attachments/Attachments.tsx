import React from 'react';
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

function Attachments(props: AttachmentsProps) {
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
            value={0}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
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
