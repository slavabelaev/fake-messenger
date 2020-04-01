import React from 'react';
import View from "../../layout/View";
import EditProfile from "../../forms/EditProfile";
import LayoutToolbar from "../../layout/LayoutToolbar";
import {Container, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export interface ProfileProps {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

function Profile(props: ProfileProps) {
    const classes = useStyles();
    const toolbar = (
        <LayoutToolbar
            title="Edit Profile"
        />
    );

    const content = (
        <Container
            className={classes.content}
            maxWidth="xs"
        >
            <EditProfile/>
        </Container>
    );

    return (
        <View
            toolbar={toolbar}
        >
            {content}
        </View>
    );
}

export default Profile;
