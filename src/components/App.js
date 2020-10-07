import React, { Component } from "react";

import Error from "./Error";
import HttpClient from "./HttpClient";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: "asd",
            searchText: "",
            error: undefined,
            isRequestVerbose: true,
            requestUrl: "",
            requestOptions: {
                method: "get",
                accept: "application/json",
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080/"
                },
                timeout: 5000,
            }
        };
    }

    errorClicked() {
        this.setState({ error: undefined });
    }

    handleRequestSuccess(result) {
        this.setState({
            requestUrl: ""
        });
        console.log("request success", result);
    }

    handleRequestError(error) {
        this.setState({
            requestUrl: "",
            error
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (!e.target.searchText.value) {
            return;
        }
        this.setState ({
            requestUrl: "localhost:8080",
            requestData: {
                api_key: this.state.apiKey,
                query: e.target.searchText.value
            }
        });
    }

    render() {
        return (
            <div id="app-container">
                <div className="header">
                    <h1>The Awesome Movie Search App Demo</h1>
                </div>
                <HttpClient
                    url={this.state.requestUrl}
                    options={this.state.requestOptions}
                    data={this.state.requestData}
                    successCallback={this.handleRequestSuccess.bind(this)}
                    errorCallback={this.handleRequestError.bind(this)}
                />
                <div className="search-container">
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="search-input">
                            <input name="searchText" type="text" defaultValue={this.state.searchText} placeholder="What to search for?"/>
                        </div>
                        <div className="search-button">
                            <button type="onSubmit">Search</button>
                        </div>
                    </form>
                </div>
                <Error
                    error={this.state.error}
                    onClick={this.errorClicked.bind(this)}
                />
            </div>
        );
    }
}
