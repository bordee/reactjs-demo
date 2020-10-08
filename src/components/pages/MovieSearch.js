import React, { Component } from "react";

import SearchForm from "../SearchForm";
import MovieList from "../MovieList";

export default class MovieSearch extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="search-container page">
            {this.props.children}
            <SearchForm
                defaultValue={this.props.searchText}
                submitCallback={this.props.searchCallback}
            />
            <MovieList
                movies={this.props.movies}
                selectCallback={this.props.selectCallback}
            />
        </div>);
    }
}
