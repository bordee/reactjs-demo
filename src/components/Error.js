import React, { Component } from "react";

export default class Error extends Component {

    constructor(props) {
        super(props);
    }

    errorToMessage(error) {
        switch(true) {
            case !error:
                return "";
            case ("string" === typeof error):
                return error;
            case ("function" === typeof error.toString):
                return error.toString();
            default:
                return JSON.stringify(error);
        }
    }

    render() {
        return this.props.error
            ? (<div className="error" onClick={this.props.onClick}>
                {this.errorToMessage(this.props.error)}
            </div>)
            : "";
    }
}
