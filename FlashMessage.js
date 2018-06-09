import React from "react";
import Store from "./Store";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class FlashMessage extends React.Component {
  startFlashMessageTimeout = () => {
    setTimeout(() => {
      if (this.props.flashMessage) {
        setFlashMessage("");
      }
    }, 5000);
  };

  componentDidMount = () => {
    this.startFlashMessageTimeout();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.flashMessage !== this.props.flashMessage) {
      this.startFlashMessageTimeout();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.flashMessage && (
            <div
              className={
                this.props.className
                  ? "alert " + this.props.className
                  : "alert alert-" + this.props.flashMessageSeverity
              }
            >
              {this.props.flashMessage}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    flashMessage: state.flashMessage,
    flashMessageSeverity: state.flashMessageSeverity
  };
}

export default withRouter(connect(mapStateToProps)(FlashMessage));

export function setFlashMessage(message, severity) {
  Store.dispatch({ type: "SET_FLASH_MESSAGE", value: message, severity });
}
