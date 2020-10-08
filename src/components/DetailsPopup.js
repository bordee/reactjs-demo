import React, { Component } from "react";

export default class DetailsPopup extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick && this.props.onClick(e);
    }

    propsToDetails(props) {
        let data = props.data || {},
            tmdbData = data.tmdbData || {},
            wikiData = data.wikiData || ["", [], [], []],
            wikiMovieNames = wikiData[1],
            wikiMovieLinks = wikiData[3];

        return {
            id: tmdbData.id || undefined,
            title: tmdbData.title || "",
            description: tmdbData.overview || "",
            wikiMovieNames,
            wikiMovieLinks
        };
    }

    render() {
        let {
            id,
            title,
            description,
            wikiMovieNames,
            wikiMovieLinks
        } = this.propsToDetails(this.props);

        return (id
            ? (<div className="details-popup">
                <div className="clickable" onClick={this.handleClick.bind(this)}>
                    Close
                    <hr/>
                </div>
                <div className="details-scrolled">
                    <div>
                        <div className="details-name">Title: </div>
                        <div className="details-data">{title}</div>
                    </div>
                    <div>
                        <div className="details-name">Description (from TMDB): </div>
                        <div className="details-data details-movie-description">{description}</div>
                    </div>
                    <div>
                        <div className="details-name">View on TMDB: </div>
                        <div className="details-data">
                            <a href={`https://www.themoviedb.org/movie/${id}`} target="_blank">
                                {title}
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="details-name">More on Wikipedia: </div>
                        <div className="details-data details-wiki-links">
                            {wikiMovieLinks.map((e, i) =>
                                <div key={i}>
                                    <a href={e} target="_blank">
                                        {wikiMovieNames[i]}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>)
            : "");
    }
}