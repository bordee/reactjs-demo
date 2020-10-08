import React, { Component } from "react";

export default class MovieList extends Component {

    constructor(props) {
        super(props);
    }

    handleMovieSelect(e) {
        e.preventDefault();
        if (
            "TD" !== e.target.tagName
            || "movie_title" !== e.target.getAttribute("name")
            || !e.target.getAttribute("movie_id")
        ) {
            return;
        }
        this.props.selectCallback(this.props.movies[e.target.getAttribute("movie_id")]);
    }

    render() {
        let movies = this.props.movies;
        return (<div className="movie-list">
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Release Date</td>
                        <td>Vote average</td>
                    </tr>
                </thead>
                <tbody onClick={this.handleMovieSelect.bind(this)}>
                {movies && Object.keys(movies).length
                    ? Object.keys(movies).map((id, i) => {
                        let e = movies[id];
                        return (<tr key={i}>
                            <td className="clickable" name="movie_title" movie_id={id}>{e.title || e.original_title}</td>
                            <td>{e.release_date}</td>
                            <td>{e.vote_average}</td>
                        </tr>);
                    })
                    : (<tr><td></td></tr>)}
                </tbody>
            </table>
        </div>);
    }
}
