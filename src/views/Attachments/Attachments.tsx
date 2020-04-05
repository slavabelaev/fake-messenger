import React, {useState} from 'react';
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
import PopoverAction from "../../components/PopoverAction";
import List from "@material-ui/core/List";
import MenuListItem from "../../components/MenuListItem";
import {useDispatch} from "react-redux";
import {removeAttachmentFiles, removeAttachmentLinks} from "../../store/chatsSlice";
import BackButton from "../../layout/BackButton";
import LayoutToolbar from "../../layout/LayoutToolbar";

const FILES_TAB_VALUE = 0;
const LINKS_TAB_VALUE = 1;

function Attachments() {
    const {id: chatId} = useParams();
    const [tabsValue, setTabsValue] = useState(FILES_TAB_VALUE);
    const dispatch = useDispatch();

    if (!chatId) return <ErrorMessage text="Failed fetch chat id" />;

    const popoverMenuButton = (
        <PopoverAction
            renderPopover={onClose => (
                <List>
                    <MenuListItem
                        primary="Delete files"
                        onClick={() => {
                            const action = removeAttachmentFiles({chatId});
                            dispatch(action);
                            onClose();
                        }}
                    />
                    <MenuListItem
                        primary="Delete links"
                        onClick={() => {
                            const action = removeAttachmentLinks({chatId});
                            dispatch(action);
                            onClose();
                        }}
                    />
                </List>
            )}
        />
    );

    const toolbar = (
        <LayoutToolbar
            title="Attachments"
            endAction={popoverMenuButton}
        />
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
            />
            <Tab
                label="Links"
            />
        </Tabs>
    );

    const toolbarWithTabs = (
        <div>
            {toolbar}
            {tabs}
        </div>
    );

    const content = tabsValue === LINKS_TAB_VALUE
        ? <AttachmentLinkList chatId={chatId}/>
        : <AttachmentList chatId={chatId}/>;

    return (
        <View
            toolbar={toolbarWithTabs}
        >
            {content}
        </View>
    )
}

export default Attachments;
