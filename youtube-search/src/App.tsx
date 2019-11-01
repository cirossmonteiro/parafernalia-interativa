import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { fetchLoadResults } from './actions';
import { IResult } from './reducers/VideoReducer';

interface IReducerState {
    results: IResult[],
}

interface IReducerDispatch {
    fetchLoadResults: (q?: string) => void
}

interface IProps extends IReducerState, IReducerDispatch {

}

interface IState {
    searchText: string,
    resultSelected: IResult | null
}

const initialState: IState = {
    searchText: "",
    resultSelected: null
}

const App = (props: IProps) => {

    const { results } = props;

    const { fetchLoadResults } = props;

    const [state, setState] = useState(initialState);

    const { searchText, resultSelected } = state;

    useEffect(() => {
        fetchLoadResults();
    }, []);
    
    const resultsHTML = results.map(r => 
        <div className = "result-app" onClick = {() => setState({...state, resultSelected: r.id.videoId ? r : null})}>
            <div className = "result-column">
                <img src = {r.snippet.thumbnails.default.url} />
            </div>
            <div className = "result-column">
                <span className = "result-title">
                    {r.snippet.title}
                </span>
                <span className = "result-description">
                    {r.snippet.description}
                </span>
            </div>
        </div>
    );

    return (
        <div className = "app">
            <div className = "app-header">
                <div className = "hamburguer-app">
                    <div className = "hamburguer-line"></div>
                    <div className = "hamburguer-line"></div>
                    <div className = "hamburguer-line"></div>
                </div>
                <div className = "youtube-icon">
                    <div className = "arrow-right"></div>
                </div>
                <input value = {searchText}
                    onChange = {(e: any) => setState({...state, searchText: e.target.value})} />
                <div className = "button-app" onClick = {() => fetchLoadResults(searchText)}>
                    <div className = "magnifier-app">
                        <div className = "circle"></div>
                        <div className = "handhold"></div>
                    </div>
                </div>
            </div>
            <div className = "app-body">
                <div className = "video-holder">
                    {resultSelected && resultSelected.id.videoId &&
                    <iframe width="100%" height="315" 
                        src={`https://www.youtube.com/embed/${resultSelected.id.videoId}`} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>}
                </div>
                <div className = "results">
                    {resultsHTML}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        results: state.videoState.results
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchLoadResults: (q: string = "react") => dispatch(fetchLoadResults(q))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
