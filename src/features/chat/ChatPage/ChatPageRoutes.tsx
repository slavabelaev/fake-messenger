import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ContactProfilePage, {CONTACT_PROFILE_ROUTE_PATH} from "../../contacts/ContactProfilePage";
import AttachmentsPage, {CHAT_ATTACHMENTS_ROUTE_PATH} from "../../attachments/AttachmentsPage";

function ChatPageRoutes() {
    return (
        <Switch>
            <Route path={CONTACT_PROFILE_ROUTE_PATH} component={ContactProfilePage} />
            <Route path={CHAT_ATTACHMENTS_ROUTE_PATH} component={AttachmentsPage} />
            <Route component={AttachmentsPage} />
        </Switch>
    );
}

export default ChatPageRoutes;
