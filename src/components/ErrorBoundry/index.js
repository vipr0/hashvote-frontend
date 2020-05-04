import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import { showError, hideError } from "../../redux/actions/app";

const mapStateToProps = (state) => ({
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(showError(error)),
  removeError: () => dispatch(hideError()),
});

class ErrorBoundry extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.props.setError(error.message);
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({ error: this.props.error });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="404"
          title="Oops, there is an error"
          subTitle={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);
