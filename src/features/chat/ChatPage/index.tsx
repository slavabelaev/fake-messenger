import ChatPage from "./ChatPage";
import Layout from "../../../common/components/layout";
import ChatPageRoutes from "./ChatPageRoutes";
import React from "react";
import {useMediaQuery, useTheme} from "@material-ui/core";

export const CHAT_ROUTE_PATH = '/chat/:id';

function ChatContainer() {
    const theme = useTheme();
    const isBreakpointSm = useMediaQuery(theme.breakpoints.down('sm'));

    if (isBreakpointSm) return <ChatPage/>;

    return (
        <Layout
            rightSide={<ChatPageRoutes/>}
        >
            <ChatPage/>
        </Layout>
    );
}

export default ChatContainer;
