import React from "react";
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
        <form onSubmit={console.log}>
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
                        name="avatarUrl"
                        type="file"
                        hidden
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="firstName"
                        variant="outlined"
                        size="small"
                        label="First Name"
                        defaultValue={user?.firstName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="lastName"
                        variant="outlined"
                        size="small"
                        label="Last Name"
                        defaultValue={user?.lastName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="dateOfBirth"
                        variant="outlined"
                        size="small"
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={user?.dateOfBirth.toISOString().split('T')[0]}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        type="email"
                        variant="outlined"
                        size="small"
                        label="Email"
                        defaultValue={user?.email}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phoneNumber"
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
                        type="submit"
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditProfile;
