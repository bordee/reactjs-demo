import React, { Component } from "react";
import { Link } from "react-router-dom";

import MovieList from "../MovieList";

export default class RelatedMovies extends Component {

    constructor(props) {
        super(props);

        this.triggerLoadRelatedMovies(props);

        this.state = props.match.params;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.movie_id === this.props.match.params.movie_id) {
            return;
        }

        this.triggerLoadRelatedMovies(this.props);
    }

    triggerLoadRelatedMovies(props) {
        let history = props.history,
            state = history
                && history.location
                && history.location.state
                ? history.location.state
                : {};

        if(!state.id) {
            return props.history.replace("/");
        }

        props.loadRelatedMovies
            && props.loadRelatedMovies(state);
    }

    propsToDetails(props) {
        let data = props.history.location.state || {};
        return {
            title: data.title || ""
        };
    }

    render() {
        let {
            title
        } = this.propsToDetails(this.props);
        return (<div className="search-container page">
            {this.props.children}
            <div>
                <div className="related-nav-link">
                    <a href="#" onClick={this.props.history.goBack}>Back</a>
                </div>
                <div className="related-nav-link">
                    <Link to={{
                        pathname: "/",
                    }} >Back to Search</Link>
                </div>
            </div>
            <hr/>
            <div>
                <span className="details-name">Movies related to: </span>
                <span className="details-data">{title}</span>
            </div>
            <hr/>
            <MovieList
                movies={this.props.movies}
                selectCallback={this.props.selectCallback.bind(this)}
            />
        </div>);
    }
}
