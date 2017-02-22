import React, { Component } from 'react';
import AlbumFinder from '../components/AlbumFinder';

const lastfm = require('../api/Lastfm');

export default class AlbumFinderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerms: '',
      searchResults: [],
      resultsLoading: false
    };
  }

  handleAlbumSearch(event, value) {

    var searchTerms = event.target.value;
    this.setState({searchTerms: searchTerms, resultsLoading: true, searchResults: []}, () => {

      lastfm.albumSearch(searchTerms, (response) => {

        console.log(response);
        this.setState({resultsLoading: false, searchResults: response.data.results.albummatches.album});
      });

      // mb.musicbrainzSearch(this.state.searchTerms,
      //   () => {
      //     this.setState({resultsLoading: true});
      //   },
      //   (searchTerms, results) => {
      //     this.setState({resultsLoading: false, searchResults: results});
      //   },
      //   (el) => {
      //     lastfm.getAlbumInfo(el.artistCredits[0].artist.name, el.title, (response) => {
      //       console.log(response);
      //     });
      //     this.setState(this.state);
      //   }
      // );
    });

  }

  render() {
    return (
      <AlbumFinder
        handleAlbumSearch={this.handleAlbumSearch.bind(this)}
        searchTerms={this.state.searchTerms}
        resultsLoading={this.state.resultsLoading}
        albums={this.state.searchResults}
      />
    );
  }
}
