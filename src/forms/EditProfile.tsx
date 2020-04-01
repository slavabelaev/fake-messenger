import React from 'react';
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";
import {authSelector} from "../app/authSlice";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";

export interface EditProfileProps {}

function EditProfile(props: EditProfileProps) {
    const {user} = useSelector(authSelector);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Avatar"
                    defaultValue={user?.avatarUrl}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Avatar
                                    style={{width: 24, height: 24}}
                                    src={user?.avatarUrl}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="text"
                                    size="small"
                                    component="label"
                                    htmlFor="avatar"
                                >
                                    Choose
                                </Button>
                            </InputAdornment>
                        ),
                        readOnly: true
                    }}
                    fullWidth
                />
                <input
                    id="avatar"
                    type="file"
                    hidden
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="First Name"
                    defaultValue={user?.firstName}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Last Name"
                    defaultValue={user?.lastName}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    defaultValue={user?.email}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Phone number"
                    defaultValue={user?.phoneNumber}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                >Save</Button>
            </Grid>
        </Grid>
    );
}

export default EditProfile;
