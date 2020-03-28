import React from "react";
import {Switch, Route} from "react-router-dom";
import Welcome from "../views/Welcome";
import NotFound from "../views/NotFound";
import Chat, {CHAT_ROUTE_PATH} from "../views/Chat";
import Settings, {SETTINGS_ROUTE_PATH} from "../views/Settings";
import Profile, {PROFILE_ROUTE_PATH} from "../views/Profile";

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
