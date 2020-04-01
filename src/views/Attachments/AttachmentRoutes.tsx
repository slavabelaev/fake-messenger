import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {CHAT_ATTACHMENTS_FILES_ROUTE_PATH, CHAT_ATTACHMENTS_LINKS_ROUTE_PATH} from "./index";
import AttachmentList from "../../components/AttachmentList";
import AttachmentLinkList from "../../components/AttachmentLinkList";

function AttachmentRoutes() {
    return (
        <Switch>
            <Route path={CHAT_ATTACHMENTS_FILES_ROUTE_PATH} component={AttachmentList} />
            <Route path={CHAT_ATTACHMENTS_LINKS_ROUTE_PATH} component={AttachmentLinkList} />
            <Route component={AttachmentList} />
        </Switch>
    );
}

export default AttachmentRoutes;
