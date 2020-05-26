import React from 'react';
import View from "../../../common/components/layout/View";
import EditProfile from "../../../common/components/forms/EditProfile";
import LayoutToolbar from "../../../common/components/layout/LayoutToolbar";
import {Container, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export interface ProfileProps {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

function ProfilePage(props: ProfileProps) {
    const classes = useStyles();
    const toolbar = (
        <LayoutToolbar
            title="Edit ProfilePage"
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

export default ProfilePage;
