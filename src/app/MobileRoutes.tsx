import React from "react";
import {Switch, Route} from "react-router-dom";
import Chat, {CHAT_ROUTE_PATH} from "../features/chat/ChatPage";
import SettingsPage, {SETTINGS_ROUTE_PATH} from "../features/settings/SettingsPage";
import ProfilePage, {PROFILE_ROUTE_PATH} from "../features/auth/ProfilePage";
import ContactsPage, {CONTACTS_ROUTE_PATH} from "../features/contacts/ContactsPage";
import ContactProfilePage, {CONTACT_PROFILE_ROUTE_PATH} from "../features/contacts/ContactProfilePage";
import AttachmentsPage, {CHAT_ATTACHMENTS_ROUTE_PATH} from "../features/attachments/AttachmentsPage";

function MobileRoutes() {
    return (
        <Switch>
            <Route exact={true} path="/" component={ContactsPage} />
            <Route exact={true} path={CHAT_ROUTE_PATH} component={Chat} />
            <Route path={CONTACTS_ROUTE_PATH} component={ContactsPage} />
            <Route path={SETTINGS_ROUTE_PATH} component={SettingsPage} />
            <Route path={PROFILE_ROUTE_PATH} component={ProfilePage} />
            <Route path={CONTACT_PROFILE_ROUTE_PATH} component={ContactProfilePage} />
            <Route path={CHAT_ATTACHMENTS_ROUTE_PATH} component={AttachmentsPage} />
            <Route component={ContactsPage} />
        </Switch>
    )
}

export default MobileRoutes;
