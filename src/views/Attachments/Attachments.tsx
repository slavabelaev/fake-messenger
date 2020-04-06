import React, {useState} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import View from "../../layout/View";
import {useParams} from "react-router-dom";
import ErrorMessage from "../../layout/ErrorMessage";
import AttachmentList from "../../components/AttachmentList";
import AttachmentLinkList from "../../components/AttachmentLinkList";
import PopoverAction from "../../components/PopoverAction";
import List from "@material-ui/core/List";
import MenuListItem from "../../components/MenuListItem";
import {useDispatch} from "react-redux";
import {removeAttachmentFiles, removeAttachmentLinks} from "../../store/chatsSlice";
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
                        primary="Delete all files"
                        onClick={() => {
                            const action = removeAttachmentFiles({chatId});
                            dispatch(action);
                            onClose();
                        }}
                    />
                    <MenuListItem
                        primary="Delete all links"
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
