import React, { Component } from "react";
import Request from "react-http-request";

import Loader from "./Loader";

export default class HttpClient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: Object.assign({
                method: "get",
                accept: "application/json",
                headers: {},
                timeout: 5000,
            }, this.props.options)
        };
    }

    requestCallback({error, result, loading}) {
        // console.log("response error:", error, ", result: ", result, ", loading: ", loading);
        switch (true) {
            case !!error:
                this.props.errorCallback
                    && setTimeout(() => this.props.errorCallback(error), 1);
                return null;
            case loading:
                return <Loader/>;
            default:
                this.setState(
                    { requestUrl: "" },
                    () => this.props.successCallback
                        && this.props.successCallback(result)
                );
                return null;
        }
    }

    render() {
        return this.props.url && this.props.data
            ? (<Request
                url={this.props.url}
                method={this.state.options.method}
                accept={this.state.options.accept}
                headers={this.state.options.headers}
                verbose={this.state.isRequestVerbose}
                query={("get" === this.state.options.method) ? this.props.data : ""}
                send={("post" === this.state.options.method) ? this.props.data : ""}
            >
                {this.requestCallback.bind(this)}
            </Request>)
            : "";
    }
}
