import React, {ReactNode} from "react";
import List from "@material-ui/core/List";

export interface ListViewProps {
    itemCount: number;
    renderItem: (index: number) => ReactNode;
}

function ListView(props: ListViewProps) {
    const renderItem = (_: null, index: number) => props.renderItem(index);
    return (
        <List>
            {Array(props.itemCount).fill(null).map(renderItem)}
        </List>
    )
}

export default ListView;