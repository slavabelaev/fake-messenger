import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) return (
            <Typography color="error">
                This is error
            </Typography>
        );

        return this.props.children;
    }
}

export default ErrorBoundary;
