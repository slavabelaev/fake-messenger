import React, {ChangeEvent, useState} from "react";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, updateProfile} from "../store/authSlice";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import {UserProfile} from "../models/AuthUser";

export interface EditProfileProps {}

type FieldName = 'firstName' | 'lastName' | 'avatarUrl' | 'email' | 'phoneNumber' | 'bio' | 'dateOfBirth';

function EditProfile(props: EditProfileProps) {
    const {user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<UserProfile>({
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatarUrl: user?.avatarUrl,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.bio,
        dateOfBirth: user?.dateOfBirth
    });
    const getChangeHandler = (fieldName: FieldName) => (event: ChangeEvent<HTMLInputElement>) => setProfile({
        ...profile,
        [fieldName]: event.target.value
    });

    return (
        <form onSubmit={event => {
            event.preventDefault();
            const action = updateProfile(profile);
            dispatch(action);
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Avatar"
                        value={profile.avatarUrl}
                        onChange={getChangeHandler('avatarUrl')}
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
                                        disabled={true}
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
                        required
                        value={profile.firstName}
                        onChange={getChangeHandler('firstName')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="lastName"
                        variant="outlined"
                        size="small"
                        label="Last Name"
                        required
                        value={profile.lastName}
                        onChange={getChangeHandler('lastName')}
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
                        disabled={true}
                        InputLabelProps={{
                            shrink: true
                        }}
                        required
                        value={profile.dateOfBirth?.toISOString().split('T')[0]}
                        //onChange={getChangeHandler('dateOfBirth')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="bio"
                        variant="outlined"
                        size="small"
                        label="Bio"
                        placeholder="A few words about yourself"
                        required
                        value={profile.bio}
                        onChange={getChangeHandler('bio')}
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
                        required
                        value={profile.email}
                        onChange={getChangeHandler('email')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phoneNumber"
                        variant="outlined"
                        size="small"
                        label="Phone number"
                        required
                        value={profile.phoneNumber}
                        onChange={getChangeHandler('phoneNumber')}
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
