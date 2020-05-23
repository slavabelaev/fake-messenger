import Chat from "./Chat";
import Layout from "../../../common/components/layout";
import ChatRoutes from "./ChatRoutes";
import React from "react";
import {useMediaQuery, useTheme} from "@material-ui/core";

export const CHAT_ROUTE_PATH = '/chat/:id';

function ChatContainer() {
    const theme = useTheme();
    const isBreakpointSm = useMediaQuery(theme.breakpoints.down('sm'));

    if (isBreakpointSm) return <Chat/>;

    return (
        <Layout
            rightSide={<ChatRoutes/>}
        >
            <Chat/>
        </Layout>
    );
}

export default ChatContainer;
