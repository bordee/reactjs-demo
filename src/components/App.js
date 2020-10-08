import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Error from "./Error";
import HttpClient from "./HttpClient";
import DetailsPopup from "./DetailsPopup";

import MovieSearch from "./pages/MovieSearch";
import RelatedMovies from "./pages/RelatedMovies";

let BrowserHistory = createBrowserHistory();

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            /** @TODO load values from config file... */
            tmdbApiKey: "ec3d5572280f99024a448611a8c4bb25",
            tmdbSearchUrl: "https://api.themoviedb.org/3/search/movie",
            tmdbRelatedUrl: "https://api.themoviedb.org/3/movie/{movie_id}/similar",
            wikipediaUrl: "https://en.wikipedia.org/w/api.php",
            searchText: "",
            detailsData: undefined,
            movies: {},
            relatedMovies: undefined,
            error: undefined,
            isRequestVerbose: true,
            requestUrl: "",
            requestOptionsDefault: {
                method: "get",
                accept: "application/json",
                headers: {},
                timeout: 5000,
            },
            requestOptions: {},
            requestCallback: undefined
        };

        this.detailsCloseClicked = this.detailsCloseClicked.bind(this);
        this.handleMovieSelect = this.handleMovieSelect.bind(this);
    }

    errorClicked() {
        this.setState({ error: undefined });
    }

    detailsCloseClicked() {
        this.setState({ detailsData: undefined });
    }

    handleRequestSuccess(response) {
        let callback = this.state.requestSuccessCallback;
        if (!callback) {
            return;
        }

        this.setState({
            requestUrl: "",
            requestData: {},
            requestSuccessCallback: undefined
        }, () => callback(response));
    }

    handleRequestError(error) {
        this.setState({
            requestUrl: "",
            requestData: {},
            requestSuccessCallback: undefined,
            error
        });
    }

    handleMovieSearch(query) {
        if (!query) {
            return;
        }

        this.triggerRequest(
            this.state.tmdbSearchUrl,
            {
                api_key: this.state.tmdbApiKey,
                query
            },
            this.tmdbRequestSuccessCallback.bind(this)
        );
    }

    handleMovieSelect(tmdbData) {
        if (
            !tmdbData
            || !tmdbData.id
        ) {
            console.error("handleMovieSelect", tmdbData);
            return;
        }

        this.triggerRequest(
            this.state.wikipediaUrl,
            {
                action: "opensearch",
                origin: "*",
                search: tmdbData.title
            },
            (response) => this.wikiRequestSuccessCallback(response, tmdbData),
        );
    }

    loadRelatedMovies(tmdbData) {
        if (
            !tmdbData
            || !tmdbData.id
        ) {
            return;
        }

        this.triggerRequest(
            this.state.tmdbRelatedUrl.replace("{movie_id}", tmdbData.id),
            {
                api_key: this.state.tmdbApiKey
            },
            this.loadRelatedMoviesSuccessCallback.bind(this),
        );
    }

    tmdbRequestSuccessCallback(response) {
        if (
            !response.body
            || !response.body.results
        ) {
            console.error("invalid response", response);
            return this.handleRequestError("Something went wrong, please try again.");
        }

        if (!response.body.total_results) {
            return this.handleRequestError("No results found, please try again.");
        }

        this.setState({
            requestUrl: "",
            requestData: {},
            requestSuccessCallback: undefined,
            movies: response.body.results.reduce((a, e) => {
                a[e.id] = e;
                return a;
            }, {})
        });
    }

    wikiRequestSuccessCallback(response, tmdbData) {
        if (
            !response.body
        ) {
            console.error("invalid wikipedia response", response);
            return this.handleRequestError("Something went wrong, please try again.");
        }

        this.setState({
            detailsData: {
                wikiData: response.body,
                tmdbData
            }
        });
    }

    loadRelatedMoviesSuccessCallback(response) {
        if (!response.body.total_results) {
            return this.handleRequestError("No results found, please try again.");
        }

        this.setState({
            requestUrl: "",
            requestData: {},
            requestSuccessCallback: undefined,
            relatedMovies: response.body.results.reduce((a, e) => {
                a[e.id] = e;
                return a;
            }, {})
        });
    }

    triggerRequest(url, data, callback, options) {
        this.setState({
            error: "",
            requestUrl: url,
            requestData: data,
            requestOptions: "object" === typeof options
                && Object.keys(options).length
                ? Object.assign(
                    this.state.requestOptionsDefault,
                    options
                )
                : this.state.requestOptionsDefault,
            requestSuccessCallback: callback
        });
    }

    render() {
        return (<div id="app-container">
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
            <Error
                error={this.state.error}
                onClick={this.errorClicked.bind(this)}
            />
            <Router history={BrowserHistory}>
                <Switch>
                    <Route path="/related/:movie_id" render={(props) =>
                        <RelatedMovies {...props}
                            movies={this.state.relatedMovies}
                            selectCallback={this.handleMovieSelect}
                            loadRelatedMovies={this.loadRelatedMovies.bind(this)}>
                            <DetailsPopup  {...props}
                                data={this.state.detailsData}
                                onCloseClick={this.detailsCloseClicked}/>
                        </RelatedMovies>
                    }/>
                    <Route path="*" render={(props) =>
                        <MovieSearch {...props}
                            searchText={this.state.searchText}
                            searchCallback={this.handleMovieSearch.bind(this)}
                            movies={this.state.movies}
                            selectCallback={this.handleMovieSelect}>
                            <DetailsPopup  {...props}
                                data={this.state.detailsData}
                                onCloseClick={this.detailsCloseClicked}/>
                        </MovieSearch>
                    }/>
                </Switch>
            </Router>
        </div>);
    }
}
