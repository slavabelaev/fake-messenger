import React from "react";
import {Switch, Route} from "react-router-dom";
import WelcomePage from "../features/auth/WelcomePage";
import NotFoundPage from "../common/pages/NotFoundPage/NotFoundPage";
import Chat, {CHAT_ROUTE_PATH} from "../features/chat/ChatPage";
import SettingsPage, {SETTINGS_ROUTE_PATH} from "../features/settings/SettingsPage";
import ProfilePage, {PROFILE_ROUTE_PATH} from "../features/auth/ProfilePage";

function Routes() {
    return (
        <Switch>
            <Route exact={true} path="/" component={WelcomePage} />
            <Route path={SETTINGS_ROUTE_PATH} component={SettingsPage} />
            <Route path={CHAT_ROUTE_PATH} component={Chat} />
            <Route path={PROFILE_ROUTE_PATH} component={ProfilePage} />
            <Route component={NotFoundPage} />
        </Switch>
    )
}

export default Routes;
