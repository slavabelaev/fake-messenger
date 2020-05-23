import React from "react";
import {Switch, Route} from "react-router-dom";
import Chat, {CHAT_ROUTE_PATH} from "../features/views/Chat";
import Settings, {SETTINGS_ROUTE_PATH} from "../features/views/Settings";
import Profile, {PROFILE_ROUTE_PATH} from "../features/views/Profile";
import Contacts, {CONTACTS_ROUTE_PATH} from "../features/views/Contacts";
import ContactProfile, {CONTACT_PROFILE_ROUTE_PATH} from "../features/views/ContactProfile";
import Attachments, {CHAT_ATTACHMENTS_ROUTE_PATH} from "../features/views/Attachments";

function MobileRoutes() {
    return (
        <Switch>
            <Route exact={true} path="/" component={Contacts} />
            <Route exact={true} path={CHAT_ROUTE_PATH} component={Chat} />
            <Route path={CONTACTS_ROUTE_PATH} component={Contacts} />
            <Route path={SETTINGS_ROUTE_PATH} component={Settings} />
            <Route path={PROFILE_ROUTE_PATH} component={Profile} />
            <Route path={CONTACT_PROFILE_ROUTE_PATH} component={ContactProfile} />
            <Route path={CHAT_ATTACHMENTS_ROUTE_PATH} component={Attachments} />
            <Route component={Contacts} />
        </Switch>
    )
}

export default MobileRoutes;
