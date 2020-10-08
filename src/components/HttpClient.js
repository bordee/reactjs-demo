import React, { Component } from "react";
import Request from "react-http-request";

import Loader from "./Loader";

export default class HttpClient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            optionsDefault: {
                method: "get",
                accept: "application/json",
                headers: {},
                timeout: 5000,
            }
        };
    }

    requestCallback({error, result, loading}) {
        switch (true) {
            case !!error:
                this.props.errorCallback
                    && setTimeout(() => this.props.errorCallback(error), 1);
                return null;
            case loading:
                return <Loader/>;
            default:
                this.props.successCallback
                    && setTimeout(() => this.props.successCallback(result), 1);
                return null;
        }
    }

    render() {
        if (
            !this.props.url
            || !this.props.data
        ) {
            return "";
        }

        let options = Object.assign(
            this.state.optionsDefault,
            this.props.options
        );

        return  (<Request
            url={this.props.url}
            method={options.method}
            accept={options.accept}
            headers={options.headers}
            verbose={this.state.isRequestVerbose}
            query={("get" === options.method) ? this.props.data : ""}
            send={("post" === options.method) ? this.props.data : ""}
        >
            {this.requestCallback.bind(this)}
        </Request>);
    }
}
