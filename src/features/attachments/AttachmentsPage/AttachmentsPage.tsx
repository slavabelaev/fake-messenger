import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import View from "../../../common/components/layout/View";
import ErrorMessage from "../../../common/components/layout/ErrorMessage";
import AttachmentList from "../AttachmentList";
import AttachmentLinkList from "../../links/LinkList";
import PopoverAction from "../../../common/components/PopoverAction";
import MenuListItem from "../../../common/components/MenuListItem";
import {removeAttachmentsSuccess, removeLinksSuccess} from "../../chat/chatsSlice";
import LayoutToolbar from "../../../common/components/layout/LayoutToolbar";

const FILES_TAB_VALUE = 0;
const LINKS_TAB_VALUE = 1;

function AttachmentsPage() {
    const { id: chatId } = useParams();
    const [tabsValue, setTabsValue] = useState(FILES_TAB_VALUE);
    const dispatch = useDispatch();

    if (!chatId) return <ErrorMessage text="Failed fetch chat id" />;

    const popoverMenuButton = (
        <PopoverAction
            renderPopover={onClose => (
                <List>
                    <MenuListItem
                        primary="Remove all files"
                        onClick={() => {
                            const action = removeAttachmentsSuccess({chatId});
                            dispatch(action);
                            onClose();
                        }}
                    />
                    <MenuListItem
                        primary="Remove all links"
                        onClick={() => {
                            const action = removeLinksSuccess({chatId});
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
            title="AttachmentsPage"
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

export default AttachmentsPage;
