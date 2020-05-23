import React from "react";
import {Switch, Route} from "react-router-dom";
import Welcome from "../features/views/Welcome";
import NotFound from "../features/views/NotFound";
import Chat, {CHAT_ROUTE_PATH} from "../features/views/Chat";
import Settings, {SETTINGS_ROUTE_PATH} from "../features/views/Settings";
import Profile, {PROFILE_ROUTE_PATH} from "../features/views/Profile";

function Routes() {
    return (
        <Switch>
            <Route exact={true} path="/" component={Welcome} />
            <Route path={SETTINGS_ROUTE_PATH} component={Settings} />
            <Route path={CHAT_ROUTE_PATH} component={Chat} />
            <Route path={PROFILE_ROUTE_PATH} component={Profile} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes;
