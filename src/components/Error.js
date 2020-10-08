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

    handleClick(e) {
        e.preventDefault();
        this.props.onClick && this.props.onClick(e);
    }

    render() {
        return this.props.error
            ? (<div className="error clickable" onClick={this.handleClick.bind(this)}>
                {this.errorToMessage(this.props.error)}
            </div>)
            : "";
    }
}
