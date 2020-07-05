import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div id="section-two">
        <div id="stats-container" className="effect1">
          <div id="users" className="items">
            <h4 className="stat-number"> {[...new Set(this.props.repos.map(element => element.repo_user))].length} </h4>
            <h4 className="stat-name"> Users </h4>
          </div>
          <div id="repos" className="items">
            <h4 className="stat-number"> {this.props.repos.length} </h4>
            <h4 className="stat-name"> Repos </h4>
          </div>
          <div id="search" className="items">
            <input id="search-bar"value={this.state.term} onChange={this.onChange.bind(this)} placeholder="Add more repos here..."/>       
          </div>
        </div>
            <button id="search-button"onClick={this.search.bind(this)}> Add Repos </button>
      </div>) 
  }
}

export default Search;