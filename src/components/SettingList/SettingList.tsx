import React from 'react';
import {List} from "@material-ui/core";
import SettingListItem from "./SettingListItem";

export interface SettingListProps {}

function SettingList(props: SettingListProps) {
    const renderItem = (_: null, index: number) => (
        <SettingListItem
            key={index}
            primary={'Setting Name'}
            secondary={'some description'}
        />
    );

    return (
        <List>
            {Array(12).fill(null).map(renderItem)}
        </List>
    );
}

export default SettingList;
