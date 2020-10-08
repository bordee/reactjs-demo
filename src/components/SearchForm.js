import React, { Component } from "react";

export default class Loader extends Component {

    constructor(props) {
        super(props);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (!e.target || !e.target.searchText) {
            return;
        }
        let searchText = e.target.searchText.value;
        this.setState(
            { searchText },
            () => this.props.submitCallback(searchText)
        );
    }

    render() {
        return (<div className="search-form">
            <form onSubmit={this.handleFormSubmit.bind(this)}>
                <div className="search-input">
                    <input name="searchText" type="text" defaultValue={this.props.defaultValue} placeholder="Search text..."/>
                </div>
                <div className="search-button">
                    <button type="onSubmit">Search</button>
                </div>
            </form>
        </div>);
    }
}
