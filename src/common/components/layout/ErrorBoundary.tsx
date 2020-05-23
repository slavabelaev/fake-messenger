import React, {Component} from "react";
import ErrorMessage from "./ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) return <ErrorMessage/>;
        return this.props.children;
    }
}

export default ErrorBoundary;
