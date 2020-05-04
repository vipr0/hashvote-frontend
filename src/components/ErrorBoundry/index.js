import React, { Component } from "react";

class ErrorBoundry extends Component {
  state = {
    hasError: false,
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ hasError: true, error: error.message });
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({ hasError: true, error: this.props.error });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>{this.state.error}</p>
          <button onClick={() => this.setState({})}>Close error</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
