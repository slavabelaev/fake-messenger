import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContactProfile, {CONTACT_PROFILE_ROUTE_PATH} from "../ContactProfile";
import Attachments, {CHAT_ATTACHMENTS_ROUTE_PATH} from "../Attachments";

function ChatRoutes() {
    return (
        <Switch>
            <Route path={CONTACT_PROFILE_ROUTE_PATH} component={ContactProfile} />
            <Route path={CHAT_ATTACHMENTS_ROUTE_PATH} component={Attachments} />
            <Route component={ContactProfile} />
        </Switch>
    );
}

export default ChatRoutes;
